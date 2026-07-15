---
title: "Installing on JavaScript / Node.js projects"
excerpt: "Connect any JS/Node project to Patchstack vulnerability monitoring with the official @patchstack/connect npm package."
hidden: false
createdAt: "Tue Jul 14 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Jul 15 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
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

It sends dependency names and versions only: no source code, no environment variable values, no file paths, no git history.

## Install

No signup, dashboard step, or UUID is needed up front. Install the package as a development dependency, then run `setup`:

```bash
npm install --save-dev @patchstack/connect   # or: pnpm add -D / yarn add -D / bun add -d
npx --no-install patchstack-connect setup
```

`setup` applies a bounded, idempotent set of changes and nothing else:

1. **Scans the lockfile and sends the dependency manifest** (package names and versions) to Patchstack.
2. **Provisions a Patchstack site** on the first run and writes its UUID to `.patchstackrc.json` (commit this file); later runs reuse the existing site instead of creating a duplicate.
3. **Manages the disclosure-widget tag** in the project's root HTML shell (the first of `index.html`, `public/index.html`, or `src/app.html` that exists) — see the widget section below.
4. **Adds production build integration to `package.json`:** `scan` runs before the build and `mark-build` after it, via `prebuild`/`postbuild` lifecycle hooks (or a direct build chain on bun, which skips npm-style hooks). Existing build commands are preserved, dev scripts are untouched, and `setup` never runs the build itself.
5. **Prints a status checklist** of anything that still needs a manual step, such as framework-specific widget placement.

`setup` ends by printing a **dashboard link**. The CLI never opens the link and never asks for Patchstack credentials — open it in your browser and sign in to see the vulnerability reports. The site is monitored either way; connecting it to an account is what makes the reports visible to you.

`setup` never runs the `protect` command (see below).

### Manual alternative

The same pieces can be applied individually: `npx @patchstack/connect scan` performs steps 1–3, and the build hooks can be added by hand:

```jsonc
{
  "scripts": {
    "prebuild": "patchstack-connect scan",
    "postbuild": "patchstack-connect mark-build"
  }
}
```

Run `npx @patchstack/connect guide` at any time for a project-aware checklist of what is present and what is missing, with commands tailored to the project. `npx @patchstack/connect status` re-prints the site UUID and dashboard link.

## The disclosure widget

The connector installs Patchstack's **vulnerability disclosure widget** — a floating "Report a vulnerability" button — so anyone who spots an issue can report it straight to you. The widget is a single script tag loading `https://cdn.patchstack.com/patchstack-widget.js`, configured with the site UUID (which is public by design — it ships in client-side HTML and is not a secret). A pre-existing manually placed widget tag is left untouched, and `mark-build` ensures the tag in build output (`dist/`, `build/`, `out/`, `.output/public`) without ever editing source.

Frameworks without a static HTML shell need a one-line placement in the root layout; `guide` prints the exact snippet for the detected framework, and the [widget reference](https://cdn.patchstack.com/llm.html) covers additional patterns.

To run without the widget, set `"widget": false` in `.patchstackrc.json` — this disables all widget management; otherwise the next scan re-adds the tag.

## The `protect` command

The package also ships an **opt-in** `protect` command: a runtime exploit guard, currently for TanStack Start + Supabase applications, which patches the app's Supabase client to route traffic through a same-origin guard. It modifies application code and runs **only** when explicitly invoked — `setup`, `scan`, `guide`, `status`, and `mark-build` never invoke it. If you don't run `protect`, no application code is changed beyond the widget tag and `package.json` scripts described above.

## Security and data handling

- **Data sent to Patchstack:** dependency package names and versions from the lockfile, plus a build fingerprint from `mark-build`. No source code, environment variable values, file paths, or git history is transmitted.
- **Files written locally:** `.patchstackrc.json` (site UUID and settings), the widget script tag in the root HTML shell, and the `scan`/`mark-build` entries in `package.json` scripts. `mark-build` additionally stamps build output, never source.
- **External resources:** the widget script is loaded in the browser from `https://cdn.patchstack.com/patchstack-widget.js`. The CLI itself downloads and executes nothing from a URL.
- **Dashboard link:** printed to the terminal only; the CLI never opens it and never asks for credentials.

## Uninstalling

1. Note the site UUID from `.patchstackrc.json` before deleting anything — it identifies the site in the dashboard.
2. Remove the widget tag (and any `PatchstackWidget.init(...)` call) from the layout or HTML shell.
3. Remove the `patchstack-connect scan` / `patchstack-connect mark-build` parts from `package.json` scripts, keeping any chained commands.
4. Uninstall with the manager matching the lockfile: `npm uninstall` / `pnpm remove` / `yarn remove` / `bun remove` `@patchstack/connect`.
5. Delete `.patchstackrc.json` and any `PATCHSTACK_SITE_UUID` environment variables.

Reporting stops immediately. Local removal does not delete the site record on Patchstack's side: an unclaimed site is an anonymous record that stops receiving reports; a claimed site can be removed in the dashboard at https://app.patchstack.com.

## How this relates to host-level npm protection

Hosting partners can enable npm vulnerability intelligence for the sites they host through the partner-level [Threat Intelligence API npm features](/api-solutions/threat-intelligence-api/npm-features/). That integration is applied by the host at the infrastructure level. `@patchstack/connect` is the complementary self-service path: developers install it directly into their own projects, whether or not their host is a Patchstack partner. Both feed the same vulnerability database.
