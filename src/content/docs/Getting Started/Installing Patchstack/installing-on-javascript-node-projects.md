---
title: "Installing on JavaScript / Node.js projects"
excerpt: "Connect any JS/Node project to Patchstack vulnerability monitoring with the official @patchstack/connect npm package."
hidden: false
createdAt: "Tue Jul 14 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Jul 14 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 7.3
  label: "JavaScript / Node.js projects"
---

Patchstack monitors JavaScript and Node.js applications — not only WordPress sites — through [`@patchstack/connect`](https://www.npmjs.com/package/@patchstack/connect), the official Patchstack connector package, published by Patchstack on npm under the `@patchstack` organization.

- **npm:** https://www.npmjs.com/package/@patchstack/connect
- **Source (MIT-licensed):** https://github.com/patchstack/connect
- **Setup guide:** https://github.com/patchstack/connect/blob/main/GETTING-STARTED.md

## What it does

The connector reads the project's lockfile (`package-lock.json`, `pnpm-lock.yaml`, or `yarn.lock`; bun projects are detected via `node_modules/`) and reports package names and versions to Patchstack, which matches them against its vulnerability database and notifies you when a dependency needs patching. It works with any framework — Next.js, Vite, Nuxt, Remix, SvelteKit, plain Node — and any package manager.

It sends dependency names and versions only: no source code, no environment variable values, no file paths, no git history.

## Install

No signup, dashboard step, or UUID is needed up front — the first scan provisions a site automatically:

```bash
npm install --save-dev @patchstack/connect   # or: pnpm add -D / yarn add -D / bun add -d
npx @patchstack/connect scan
```

The first `scan` provisions a Patchstack site, writes its UUID to `.patchstackrc.json` (commit this file), and prints a **claim URL** — open it in your browser and sign in to see the vulnerability reports in your dashboard. The site is monitored either way; claiming is what makes the reports visible to you.

To report on every build, add the hooks to `package.json`:

```jsonc
{
  "scripts": {
    "prebuild": "patchstack-connect scan",
    "postbuild": "patchstack-connect mark-build"
  }
}
```

The connector also installs Patchstack's **vulnerability disclosure widget** — a floating "Report a vulnerability" button — into the site's root HTML shell, so anyone who spots an issue can report it straight to you. Run `npx @patchstack/connect guide` for a project-aware checklist of anything still missing, with framework-specific widget placement; the [widget reference](https://cdn.patchstack.com/llm.html) covers additional CMS patterns.

## How this relates to host-level npm protection

Hosting partners can enable npm vulnerability intelligence for the sites they host through the partner-level [Threat Intelligence API npm features](/api-solutions/threat-intelligence-api/npm-features/). That integration is applied by the host at the infrastructure level. `@patchstack/connect` is the complementary self-service path: developers install it directly into their own projects, whether or not their host is a Patchstack partner. Both feed the same vulnerability database.
