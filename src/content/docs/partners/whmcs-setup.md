---
title: "WHMCS Module Setup"
description: "Configure the Patchstack WHMCS provisioning module so you can sell WordPress security as an automated, billing-driven product from your existing WHMCS catalog."
---

:::note[tl;dr]
Patchstack for WHMCS is a fully automated provisioning module that lets you sell
WordPress security as a managed service directly from your existing WHMCS billing
platform. Add it to your product catalog and customers get Patchstack protection
activated automatically when they purchase it — no custom development, no manual
provisioning. Suspensions, reactivations, and cancellations all follow the billing
lifecycle automatically.

- Turn WordPress security into a billable product you sell through your existing WHMCS catalog — no custom development, no manual provisioning.
- Every lifecycle event (create, suspend, unsuspend, terminate) is driven by WHMCS billing. Support overhead stays near zero because the module handles provisioning, plugin installation, credential management, and retry-on-failure automatically.
- Scales from 10 to 10,000 customers across any number of cPanel servers. Customers self-serve from their client area (status, SSO to the Patchstack dashboard, manual-install fallback for external hosting).
:::

:::tip[Standing up a local environment first?]
If you want to test the module locally before configuring a production WHMCS,
follow your local WHMCS development setup guide to get a working install, then
return here to configure Patchstack.
:::

- **Prerequisites:** WHMCS 8.0+, PHP 7.3+, `cURL` extension enabled, a Patchstack **Developer or Enterprise** plan (required for App API access), SSH access with WP-CLI installed on each cPanel server you want to auto-deploy to.

## Technical integration

The module is a standard WHMCS provisioning module (`modules/servers/patchstack`)
plus optional hooks. It plugs into the four WHMCS module commands — Create,
Suspend, Unsuspend, Terminate — so every billing event drives a corresponding
action against the [Patchstack App API](/api-solutions/app-api/patchstack-app-api/).
On Create it registers the customer's site, stores OAuth credentials, and (if
enabled) SSH-deploys the Patchstack plugin to the correct WordPress installation.
Suspend/Unsuspend toggle protection state. Terminate removes the site from
Patchstack when the service is cancelled. For how the underlying provisioning API
works, see the [Patchstack integration guide](/api-solutions/app-api/patchstack-integration/).

Multi-server support is built around WHMCS's own server management. You configure
**one** Patchstack API server record (carrying only your App API token) and point
the Patchstack product at it via a Server Group. Your existing cPanel servers are
used as-is: when a customer buys Patchstack, the module looks up the customer's
active hosting service, identifies which cPanel server it lives on, and reads SSH
credentials from that server record. Two servers or two hundred — there's no
per-server product configuration.

The client area covers five explicit states from "just ordered" to "protected",
including the two edge cases the module handles without support intervention:
multiple WordPress installs on one account (customer picks which one), and
external hosting with no SSH access (customer gets a one-click pre-configured
plugin download). Once a site has pinged Patchstack at least once, the client area
exposes a single-sign-on link into the Patchstack dashboard — no second password
to manage.

:::caution[Admin URLs are placeholders]
Replace `https://your-whmcs.example.com/admin/` throughout with your own WHMCS
admin URL. Paths below are relative to `/admin/` on your WHMCS install.
:::

## Configure Patchstack — hosting-provider walkthrough

The manual steps a hosting provider takes inside WHMCS to wire up **Patchstack
Protection**, end to end. Every step is meant to be run against your real WHMCS
admin UI, with the values captured as you go.

:::note
Assumes WHMCS is already installed and running, and requires a Patchstack
**Developer** or **Enterprise** subscription (App API access).
:::

---

## Step 1 — Get your Patchstack App API Token

1. Log in to the [Patchstack Dashboard](https://app.patchstack.com/).
2. Navigate to [**Settings → Integrations**](https://app.patchstack.com/settings/integrations).
3. Click **Generate Token** (or copy your existing App API token).
4. **Copy the token somewhere safe now** — you enter it as the server **Access Hash**
   in Step 3. Once you navigate away, you may not be able to view the same token again.

For details on the token (`UserToken`) and what it authorizes, see the
[Patchstack App API](/api-solutions/app-api/patchstack-app-api/) documentation.

---

## Step 2 — Activate Payments (Bank Transfer)

1. Open **Settings → Apps & Integrations** (`https://your-whmcs.example.com/admin/index.php?rp=/admin/apps`).
2. Click **Browse**.
3. Go to the **Payments** section.
4. Find and click **Bank Transfer**.
5. Click to activate it.
6. Save changes.

---

## Step 3 — Configure the Patchstack API Server

This server record stores only your Patchstack App API token — it does **not**
represent a cPanel server.

1. Navigate to **Setup → Products/Services → Servers** (`https://your-whmcs.example.com/admin/configservers.php`).
2. Click **Add New Server**, then **Go to Advanced Mode**.
3. Configure:

| Field | Value |
| --- | --- |
| Name | `Patchstack API` |
| Hostname | `api.patchstack.com` |
| Module | `Patchstack Protection` |
| Access Hash | your App API token (from Step 1) |

4. Click **Test Connection** to verify, then **Save**.

:::note
Leave the **IP Address** field blank. If the test fails, confirm the hostname is
`api.patchstack.com` and the token is valid.
:::

---

## Step 4 — Create a Server Group

1. Navigate to **Setup → Products/Services → Servers** (`https://your-whmcs.example.com/admin/configservers.php`).
2. Click **Create New Group**.
3. Name it `Patchstack Protection Group`.
4. Add your Patchstack API server into the group, then **Save**.

---

## Step 5 — Configure cPanel Servers for SSH

The module reads SSH credentials directly from each cPanel **server record** (not
from the product). For each cPanel server in your infrastructure:

1. Navigate to **Setup → Products/Services → Servers** (`https://your-whmcs.example.com/admin/configservers.php`).
2. Open an existing cPanel server (or add one) and set:

| Field | Value / notes |
| --- | --- |
| Module | `cPanel` |
| Hostname / IP Address | the server's IP (enter the IP, not a hostname) |
| Username | `root` |
| Password | SSH password — for password auth; leave blank if using a key |
| API Token | SSH **private key (PEM)** — for key auth; leave blank if using a password |

:::note
WHMCS labels the last field "API Token" for cPanel servers; the module stores the
SSH private key there and auto-detects key auth when the value starts with `-----BEGIN`.
:::

:::caution[Handle SSH credentials securely]
Enter root passwords and private keys straight into the WHMCS server record. Never
commit them to a repository, paste them into plaintext files, or share them outside
your secrets manager.
:::

3. **Save**, and repeat for each cPanel server.

---

## Step 6 — Create a Product Group

1. Navigate to **Setup → Products/Services → Products/Services** (`https://your-whmcs.example.com/admin/configproducts.php`).
2. Click **Create a New Group** and configure:

| Field | Value |
| --- | --- |
| Product Group Name | `Patchstack Protection Product Group` |
| Order Form Template | `Standard Cart` |
| Available Payment Gateways | `Bank Transfer` |

3. **Save**.

---

## Step 7 — Create the Patchstack Product

1. Navigate to **Setup → Products/Services → Products/Services** (`https://your-whmcs.example.com/admin/configproducts.php`).
2. Click **Create a New Product**:

| Field | Value |
| --- | --- |
| Product Type | `Other` |
| Product Group | `Patchstack Protection Product Group` |
| Product Name | `Patchstack Protection` |
| Module | `Patchstack Protection` |
| Create as Hidden | `Unchecked` |

3. Click **Continue**, then configure the tabs:
    - **Details** — Require Domain: **Checked**
    - **Pricing** — Payment Type: `Free` *(for testing; set real pricing in production)*
    - **Module Settings** — Server Group: `Patchstack Protection Group` · Auto Deploy Plugin: **Checked** · "Automatically setup the product as soon as the first payment is received": **Selected**
4. Click **Save Changes**.

---

## Step 8 — Custom Fields (automatic)

1. Open the **Custom Fields** tab.
2. Click **Save Changes** — the module creates the required custom fields on save;
   they appear in the tab afterward.

---

## Testing a full order end to end

Place a test order end to end to confirm the module provisions correctly. This
assumes you've completed Steps 1–8 above and have access to a cPanel/WHM test
server. Throughout this section, replace `<your-cpanel-server-ip>` with your test
server's IP and `<your-test-domain>` with a domain that resolves to it (for
example, an `nip.io` wildcard domain).

### Test Step 1 — Create a cPanel Server Group and Hosting Product

In production the hosting provider already has cPanel hosting products and server
groups in WHMCS. In a test environment you create them to simulate this.

**Create the server group**

1. Navigate to **Setup → Products/Services → Servers** (`https://your-whmcs.example.com/admin/configservers.php`).
2. Click **Create New Group**.
3. Name it `Hosting Servers`.
4. Add the cPanel test server into the group, then **Save**.

**Create the product group and product**

1. Navigate to **Setup → Products/Services → Products/Services** (`https://your-whmcs.example.com/admin/configproducts.php`).
2. Click **Create a New Group**, name it `Hosting`, and **Save**.
3. Click **Create a New Product** and configure:

| Field | Value |
| --- | --- |
| Product Type | `Shared Hosting` |
| Product Group | `Hosting` |
| Product Name | `cPanel Hosting` |
| Module | `cPanel` |
| Create as Hidden | `Checked` |

4. Click **Continue**, then **Save Changes**.
5. The product reloads — open the **Module Settings** tab and configure:

| Field | Value |
| --- | --- |
| Server Group | `Hosting Servers` |
| Module Settings | Automatically setup the product when you manually accept a pending order |

6. Click **Save Changes**.

:::note
The **Server Group** field is only selectable after the product has been saved
once. If it's greyed out on first creation, save, then re-open Module Settings.
:::

### Test Step 2 — Order cPanel Hosting (WHMCS auto-provisions)

WHMCS creates the cPanel account automatically when the order is accepted, just as
in production. The cPanel username is stored on the service record automatically —
no manual entry needed.

1. Navigate to **Clients** (`https://your-whmcs.example.com/admin/clients.php`) and click the test client.
2. Click **Add New Order**.
3. Select the **cPanel Hosting** product.
4. Set the domain to `wpsite.<your-test-domain>`.
5. Leave **Order Status** as `Pending`.
6. Click **Submit Order**.
7. Navigate to **Orders** (`https://your-whmcs.example.com/admin/orders.php`), check the order, and click **Accept Order**.

WHMCS calls WHM to create the cPanel account and records the username on the hosting
service automatically.

:::note
If the order fails with "reserved username", the subdomain maps to a username
reserved on that cPanel server. Cancel and retry with a different subdomain
(e.g. `wpsite2.<your-test-domain>`). Use the same domain for all subsequent steps.
:::

:::caution
If creation fails with **"The domain … already exists in the userdata" (XID …)**,
a cPanel account using that domain is left over from an earlier attempt — WHMCS
provisioning creates a *new* account and won't reuse an existing one. Either
terminate the leftover account in WHM (**Account Information → List Accounts** →
find the domain → **Terminate an Account**) and re-run **Module Commands → Create**,
or change the service **Domain** to a fresh subdomain (e.g. `wpsite2.<your-test-domain>`)
and create again — then use that domain for all later steps.
:::

Next, install WordPress on the provisioned cPanel account (via WHM/cPanel), then
return here for the next step.

### Test Step 3 — Order Patchstack Protection

1. Navigate to the Patchstack Protection store page (`https://your-whmcs.example.com/index.php?rp=/store/patchstack-protection-group`).
2. Click **Order Now** for the Patchstack Protection product.
3. Click **I will use my existing domain and update my nameservers**.
4. Enter a placeholder domain such as `example.com` (WHMCS may not allow your
   `nip.io` test domain at checkout — we correct it in the next step).
5. Click **Checkout** and complete the order.

### Test Step 4 — Correct the Domain

1. Navigate to **Clients** (`https://your-whmcs.example.com/admin/clients.php`) and open the test client.
2. Go to the **Products/Services** tab and select the Patchstack order.
3. Update the **Domain** field to `wpsite.<your-test-domain>`.
4. Click **Save Changes**.

### Test Step 5 — Accept Order

1. Navigate to **Orders** (`https://your-whmcs.example.com/admin/orders.php`).
2. Check the order.
3. Click **Accept Order**.

If **Auto Deploy Plugin** is enabled, the module attempts SSH deployment
automatically. Check **Utilities → Logs → Module Log** filtered by `patchstack` to
see the deployment result.

:::caution
If accept fails with **"This UserToken has expired"**, the App API token in the
Patchstack API server's **Access Hash** (Step 3) is no longer valid — it hit its
expiry, or a newer token superseded it (regenerating a token invalidates older
ones). Generate a fresh token at
[Settings → Integrations](https://app.patchstack.com/settings/integrations), update
the **Access Hash** on the `Patchstack API` server, click **Test Connection** to
confirm it's valid, then re-accept the order.
:::

:::caution
If accept dies on a WHMCS **"Oops"** page (Display Errors off) and the container log
shows **`Class "phpseclib3\Net\SSH2" not found`**, the module's `vendor/` directory
isn't installed. Install the module's Composer dependencies once, then use **Retry
Deployment** on the service.
:::

## Further information

- [Patchstack App dashboard](https://app.patchstack.com/) — log in to manage the App API token and review provisioned sites.
- [Patchstack App → Settings → Integrations](https://app.patchstack.com/settings/integrations) — generate or rotate the App API token.
- [Patchstack App API](/api-solutions/app-api/patchstack-app-api/) — the provisioning API the module calls under the hood.
- [Patchstack integration guide](/api-solutions/app-api/patchstack-integration/) — how site provisioning and the plugin lifecycle work end to end.
- [WHMCS Server Management documentation](https://docs.whmcs.com/Servers) — official WHMCS guide for the underlying server-record infrastructure this module relies on.
- **Module support.** For technical questions about the module itself, contact `support@patchstack.com`.
