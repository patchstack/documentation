---
title: "WHMCS Local Setup"
description: "Step-by-step guide to standing up a local WHMCS environment (Docker, PHP 8.3, MySQL) for testing the Patchstack WHMCS module."
---

A clean, manual walkthrough for standing up a local WHMCS environment from
nothing, using **WHMCS 9.0.5** on a **PHP 8.3** Docker runtime. This is intended
for developers and partners who want to test the Patchstack WHMCS module locally.

:::note[Stack]
WHMCS app (custom `php:8.3-apache` + ionCube image) · MySQL 8.0 · phpMyAdmin.
The WHMCS application files are **bind-mounted** from `whmcs-install/whmcs`, so the
image only ships the PHP runtime — WHMCS itself is whatever you extract.
:::

| Resource | URL / value |
| --- | --- |
| WHMCS Client Area | `http://localhost:8088/` |
| WHMCS Admin | `http://localhost:8088/admin/` |
| WHMCS Installer | `http://localhost:8088/install/install.php` |
| phpMyAdmin | `http://localhost:8081/` |
| MySQL (from host) | `127.0.0.1:3316` |
| MySQL (from WHMCS container) | host `mysql`, port `3306` |

:::caution[Local-dev credentials only]
The credentials below are placeholder values for a throwaway local environment
(the password is literally `password` everywhere). **Never** reuse these values,
or any of the ports and hostnames above, in a production or public-facing WHMCS
install. Choose strong, unique credentials for any real deployment.
:::

Default local-dev credentials (all `password`): WHMCS admin `admin` · MySQL user `whmcs` · MySQL root `root` · SSH `app`.

## Prerequisites

- Docker Desktop running.
- A WHMCS full-release zip in `~/Downloads/` (this guide uses `whmcs_v905_full.zip`).
  WHMCS is **not** in this repo — download your own from the WHMCS
  [client area](https://www.whmcs.com/members/clientarea.php).
- Your WHMCS **license key** — in the [client area](https://www.whmcs.com/members/clientarea.php),
  click your **license key product** to find it. Keys are domain-locked; for local
  dev a development license bound to `localhost` works. You enter this key in the
  installer (Step 5).

## Step 1 — Start from a clean slate (optional reset)

Skip this on a first-ever setup. Run it when you want to wipe an existing
environment and rebuild from zero:

```bash
# Remove containers + network + the mysql-data volume + the locally built image
docker compose down -v --rmi local --remove-orphans

# Remove any orphaned named volumes from older compose files (ignore errors)
docker volume rm ps-whmcs_patchstack-deployments 2>/dev/null || true

# Wipe the extracted WHMCS app (gitignored; you re-extract it in Step 2)
rm -rf whmcs-install
```

## Step 2 — Extract the WHMCS release

The zip extracts to `whmcs-install/whmcs/` (plus EULA/README at the top level):

```bash
mkdir -p whmcs-install
unzip -q ~/Downloads/whmcs_v905_full.zip -d whmcs-install

# Sanity: installer present, no configuration.php yet (the wizard creates it)
ls whmcs-install/whmcs/install/install.php   # -> exists
ls whmcs-install/whmcs/configuration.php     # -> "No such file" (correct on a fresh install)
```

## Step 3 — Create `.env`

The compose file reads passwords from `.env`. Create it from the template
(defaults are all `password`, which is what the installer values in Step 5 assume):

```bash
cp env.example .env    # only if .env does not already exist
```

## Step 4 — Build the runtime image and start the stack

The image is a `php:8.3-apache` base with ionCube + the PHP extensions WHMCS 9.0
needs ([WHMCS 9.0 requires PHP 8.2+, recommends 8.3](https://docs.whmcs.com/9-0/installation-guide/system-requirements/),
and dropped PHP 8.1 / old ionCube loaders).

```bash
# Build fresh (first time, or after editing docker/whmcs/Dockerfile)
docker compose build --no-cache whmcs

# Start WHMCS + MySQL + phpMyAdmin
docker compose up -d

# Watch it come up — http 200/302 means Apache is serving
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8088/
```

Verify the runtime inside the container:

```bash
docker exec patchstack-whmcs php -v        # PHP 8.3.x, with ionCube PHP Loader
docker exec patchstack-whmcs php -m | grep -iE "ioncube|curl|gd|mysqli|soap|intl|zip"
```

## Step 5 — Run the WHMCS installer (browser, manual)

Open the installer: `http://localhost:8088/install/install.php`

Click through Welcome → EULA, then on **License Key & Database Connection** enter:

| Field | Value |
| --- | --- |
| License Key | *(from the [client area](https://www.whmcs.com/members/clientarea.php) → click your license key product)* |
| Database Host | `mysql` |
| Database Port | `3306` |
| Database Username | `whmcs` |
| Database Password | `password` |
| Database Name | `whmcs` |

On **Administrator Account**:

| Field | Value |
| --- | --- |
| First Name | `Admin` |
| Last Name | `User` |
| Email | `admin@example.com` |
| Username | `admin` |
| Password | `password` |

## Step 6 — Post-install cleanup

WHMCS refuses to load the admin/client area while the installer is still present:

```bash
rm -rf whmcs-install/whmcs/install
```

Then log in at `http://localhost:8088/admin/` with `admin` / `password`.

## Step 7 — Install the Patchstack module dependencies

The Patchstack module (bind-mounted at `whmcs/modules/servers/patchstack`) ships a
`composer.json` but **not** its `vendor/` directory. Its SSH-deployment path needs
phpseclib **3.x** (`phpseclib3\Net\SSH2`) — WHMCS only bundles phpseclib 2.x, so the
module loads its own copy from `vendor/`. Without it, accepting a Patchstack order
fails with `Class "phpseclib3\Net\SSH2" not found`.

Install it once (the dir is bind-mounted, so it goes live in the container immediately):

```bash
docker run --rm \
  -v "$(pwd)/whmcs/modules/servers/patchstack":/app -w /app \
  composer:2 install --no-interaction

# Verify the class loads inside the WHMCS container
docker exec patchstack-whmcs php -r \
  "require '/var/www/whmcs/modules/servers/patchstack/vendor/autoload.php'; var_dump(class_exists('phpseclib3\\Net\\SSH2'));"
# -> bool(true)
```

:::tip[Local PHP + Composer alternative]
Have a local PHP 7.4+ and Composer? `cd whmcs/modules/servers/patchstack && composer install` works too.
:::

## License verification gotcha

WHMCS verifies its license against `a.licensing.whmcs.com`, which is
Cloudflare-fronted and can **intermittently return HTTP 530**, locking the admin
area with `licenseerror.php?status=noconnection`. If you hit this, pinning the
licensing hostnames to a known-good WHMCS origin IP via the `whmcs` service's
`extra_hosts` in `docker-compose.yml` makes verification deterministic.

## Daily use

```bash
docker compose up -d      # start
docker compose stop       # stop (keeps data)
docker compose ps         # status
docker compose logs -f whmcs
```

## Next steps

With WHMCS installed and running, configure Patchstack as a hosting provider
would. The Patchstack WHMCS module provisions and manages sites through the
Patchstack App API — see the
[Patchstack App API](/api-solutions/app-api/patchstack-app-api/) documentation for
how to generate an API token (`UserToken`) and how site provisioning works.
