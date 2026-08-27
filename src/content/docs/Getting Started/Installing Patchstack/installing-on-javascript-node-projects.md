---
title: "Installing on JavaScript / Node.js projects"
excerpt: "Connect any JS/Node project to Patchstack vulnerability monitoring with the official @patchstack/connect npm package."
hidden: false
createdAt: "Tue Jul 14 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Aug 27 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 7.3
  label: "JavaScript / Node.js projects"
---

Patchstack monitors JavaScript and Node.js applications — not only WordPress sites — through [`@patchstack/connect`](https://www.npmjs.com/package/@patchstack/connect), the official Patchstack connector package, maintained and published by Patchstack on npm under the `@patchstack` organization.

- **npm:** https://www.npmjs.com/package/@patchstack/connect
- **Source (MIT-licensed):** https://github.com/patchstack/connect
- **Setup guide:** https://github.com/patchstack/connect/blob/main/GETTING-STARTED.md

## What it does

The connector reads the project's dependency lockfile (`package-lock.json`, `pnpm-lock.yaml`, or `yarn.lock`; bun projects are detected via `node_modules/`) and reports package names and versions to Patchstack, which matches them against its vulnerability database and notifies you when a dependency needs patching. It works with any framework — Next.js, Vite, Nuxt, Remix, SvelteKit, TanStack Start, plain Node — and with npm, pnpm, yarn, and bun.

It sends dependency names and versions, plus your site's own public address so the dashboard can show where the site lives and check that the published page still carries what was scanned. No source code, no file paths, no git history.

`setup` also installs a **runtime guard** that blocks attempts to exploit those vulnerabilities while you upgrade. That part edits application source — see [The runtime guard](#the-runtime-guard) before you run it.

## Install

No signup, dashboard step, or UUID is needed up front. Install the package as a development dependency, then run `setup`:

```bash
npm install --save-dev @patchstack/connect   # or: pnpm add -D / yarn add -D / bun add -d
npx --no-install patchstack-connect setup
```

`setup` applies a bounded, idempotent set of changes and nothing else:

1. **Scans the lockfile and sends the dependency manifest** (package names and versions, plus the site's public address when the build environment publishes one) to Patchstack.
2. **Provisions a Patchstack site** on the first run and writes its UUID to `.patchstackrc.json` (commit this file) and its credential to `.patchstackrc.local.json` (never commit this one — see [Credentials](#credentials)); later runs reuse the existing site instead of creating a duplicate.
3. **Manages the disclosure-widget tag** in the project's root HTML shell (the first of `index.html`, `public/index.html`, or `src/app.html` that exists) — see the widget section below.
4. **Installs the runtime guard** and reports whether the wiring succeeded or still needs a manual merge — see [The runtime guard](#the-runtime-guard).
5. **Adds scan integration to `package.json`:** `scan` runs after dependency installs (`postinstall`) and before the build, and `mark-build` runs after it, via `prebuild`/`postbuild` lifecycle hooks (or a direct build chain on bun, which skips npm-style hooks). Existing build commands are preserved, dev scripts are untouched, and `setup` never runs the build itself.
6. **Prints a status checklist** of anything that still needs a manual step, such as framework-specific widget placement.

`setup` ends by printing a **dashboard link**. The CLI never opens the link and never asks you to type Patchstack credentials — open it in your browser and sign in to see the vulnerability reports. The site is monitored either way; connecting it to an account is what makes the reports visible to you.

### Manual alternative

The same pieces can be applied individually: `npx @patchstack/connect scan` performs steps 1–3, and the hooks can be added by hand:

```jsonc
{
  "scripts": {
    "postinstall": "patchstack-connect scan",
    "prebuild": "patchstack-connect scan",
    "postbuild": "patchstack-connect mark-build"
  }
}
```

Run `npx @patchstack/connect guide` at any time for a project-aware checklist of what is present and what is missing, with commands tailored to the project. `npx @patchstack/connect status` re-prints the site UUID and dashboard link.

## Credentials

Reporting to Patchstack is authenticated. Every endpoint the connector calls after the first one requires the site's own credential, so a lockfile or an attack-surface map can only ever be written for the site that holds it. Two requests are deliberately unauthenticated: the very first scan, which is what issues the credential, and the browser widget's heartbeat, which runs in a public page where any embedded secret would be readable by everyone.

`setup` writes two files, and the difference between them matters:

| File | Contents | Commit it? |
|------|----------|------------|
| `.patchstackrc.json` | Site UUID, endpoint, environment, `url`, `widget` | **Yes.** The UUID is public by design — it ships in the widget tag in your served HTML. |
| `.patchstackrc.local.json` | The site's API key | **No.** `setup` adds it to `.gitignore`. |

Teammates and CI do not need the secret file. Supply the credential as an environment variable instead — `PATCHSTACK_API_KEY`, or `PATCHSTACK_PULSE_AUTH` if you want the ingest credential to be separate from the block-log one. Set it in your host's secret store, not in the repository.

### Recovering a lost credential

If `.patchstackrc.local.json` is deleted, or a project is cloned without it and no environment variable is set, the site can no longer report. `login` recovers it, using the site UUID from the committed `.patchstackrc.json`:

```bash
npx @patchstack/connect login
```

The command prints a short code and a link. Open the link and approve it **as the owner of the site** — approval is what proves the request is yours; starting the flow proves nothing, since anyone who can read your page source knows the UUID. In a terminal the command then waits. When its output is piped or captured (an AI assistant running it, for example) it prints the link and exits; run it again after you approve and it resumes the same request.

Approving **rotates** the credential: the previous one stops working immediately. Update it anywhere else it was set — CI secrets, hosting environment variables, preview environments, other checkouts.

`login` is interactive and refuses to run in CI. Build agents should read `PATCHSTACK_PULSE_AUTH` from the platform's secret store.

## The disclosure widget

The connector installs Patchstack's **vulnerability disclosure widget** — a floating "Report a vulnerability" button — so anyone who spots an issue can report it straight to you. The widget is a single script tag loading `https://cdn.patchstack.com/patchstack-widget.js`, configured with the site UUID (which is public by design — it ships in client-side HTML and is not a secret). A pre-existing manually placed widget tag is left untouched, and `mark-build` ensures the tag in build output (`dist/`, `build/`, `out/`, `.output/public`) without ever editing source.

Frameworks without a static HTML shell need a one-line placement in the root layout; `guide` prints the exact snippet for the detected framework, and the [widget reference](https://cdn.patchstack.com/llm.html) covers additional patterns.

To run without the widget, set `"widget": false` in `.patchstackrc.json` — this disables all widget management; otherwise the next scan re-adds the tag.

## The runtime guard

Reporting your dependencies tells you what is vulnerable. The **runtime guard** is what stops those vulnerabilities being exploited while you upgrade — the JavaScript equivalent of the virtual patching Patchstack applies to WordPress sites.

`setup` installs it. It edits application source to add the guard to your server's request path, so it is not a passive addition like the widget tag: review the change as you would any other commit. `scan`, `guide`, `status`, and `mark-build` never touch application code.

Supported stacks are wired automatically — Astro, Express, Fastify, NestJS, Next.js, Nuxt, SvelteKit, and TanStack Start with Supabase. For anything else, `setup` scaffolds a generic guard and prints the wiring plan for you to finish by hand; the checklist at the end of `setup` says which of the two happened.

You can run the same installation on its own, or check an existing one:

```bash
npx @patchstack/connect protect           # install / re-wire the guard
npx @patchstack/connect protect --check   # verify it is wired; exits 1 if not
```

Once running, the guard fetches the rules Patchstack generated for the vulnerable packages this site actually has, and reports back every rule that matched — including matches it allowed through. A new rule starts in detect-only mode and begins blocking once the evidence justifies it, so protection does not arrive as a wall of false positives. Matches appear on the site's **Protection** tab in the dashboard.

## Security and data handling

- **Data sent to Patchstack:** dependency package names and versions from the lockfile, the site's own public address (see below), plus a build fingerprint from `mark-build`. If you run the runtime guard, it also reports the rules that matched a request. No source code, file paths, or git history is transmitted. The one command that sends a structural description of your app is `map --upload`, which you have to run explicitly.
- **Your site's address, and the only environment variables read for their value:** a site provisioned by a scan from a developer machine has no address, so the dashboard shows a placeholder and Patchstack cannot check that the published page still carries what was scanned. The connector therefore reports the site's address when it can know it — `url` in `.patchstackrc.json` (or the `PATCHSTACK_SITE_URL` variable) if you set one, otherwise the single variable a host publishes to name its own **production** URL: `VERCEL_PROJECT_PRODUCTION_URL` on a Vercel production deployment, Netlify's `URL` in the production context, `RENDER_EXTERNAL_URL`, or `RAILWAY_PUBLIC_DOMAIN` in a production environment. Preview and branch deployments are excluded, and an address that could not be a published site (`localhost`, a private network) is dropped. When nothing qualifies, no address is sent. Patchstack applies it only to a site that still has no address — it never re-points a site whose address is already set.
- **Files written locally:** `.patchstackrc.json` (site UUID and settings), `.patchstackrc.local.json` (the credential — gitignored by `setup`), the widget script tag in the root HTML shell, the `scan`/`mark-build` entries in `package.json` scripts, and the runtime guard's source edits. `mark-build` additionally stamps build output, never source.
- **Authentication:** every report after the first is authenticated with the site's own credential. See [Credentials](#credentials) for where it lives and how to rotate it.
- **External resources:** the widget script is loaded in the browser from `https://cdn.patchstack.com/patchstack-widget.js`. The CLI itself downloads and executes nothing from a URL.
- **Dashboard link:** printed to the terminal only; the CLI never opens it and never asks you to type your Patchstack password.

## Uninstalling

1. Note the site UUID from `.patchstackrc.json` before deleting anything — it identifies the site in the dashboard.
2. Tell Patchstack the package is going away, while the credential still exists to authenticate the request:

   ```bash
   npx @patchstack/connect uninstall
   ```

   This touches no local files. It deletes the site record outright if the site was never claimed, and flags a claimed site so its owner can confirm the removal in the dashboard.
3. Remove the widget tag (and any `PatchstackWidget.init(...)` call) from the layout or HTML shell.
4. Remove the runtime guard's wiring from your server entry point, and the files it scaffolded.
5. Remove the `patchstack-connect scan` / `patchstack-connect mark-build` parts from `package.json` scripts, keeping any chained commands.
6. Uninstall with the manager matching the lockfile: `npm uninstall` / `pnpm remove` / `yarn remove` / `bun remove` `@patchstack/connect`.
7. Delete `.patchstackrc.json` and `.patchstackrc.local.json`, and any `PATCHSTACK_SITE_UUID`, `PATCHSTACK_SITE_URL`, `PATCHSTACK_API_KEY` or `PATCHSTACK_PULSE_AUTH` environment variables — including the copies in CI and your host.

Reporting stops immediately. Local removal alone does not delete the site record on Patchstack's side, which is what step 2 is for. Skipping it does not hide the removal for long: Patchstack re-checks live sites on a schedule, notices the widget is gone, and marks the site disconnected — so you get a "site not connected" notice instead of a clean removal. A claimed site can also be removed at any time in the dashboard at https://app.patchstack.com.

## How this relates to host-level npm protection

Hosting partners can enable npm vulnerability intelligence for the sites they host through the partner-level [Threat Intelligence API npm features](/api-solutions/threat-intelligence-api/npm-features/). That integration is applied by the host at the infrastructure level. `@patchstack/connect` is the complementary self-service path: developers install it directly into their own projects, whether or not their host is a Patchstack partner. Both feed the same vulnerability database.
