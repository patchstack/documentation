---
title: "Pulse sites overview"
excerpt: "How JavaScript and Node.js apps appear in the Patchstack App, and how they differ from WordPress sites."
hidden: false
createdAt: "Thu Aug 27 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Aug 27 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 1
  label: "Pulse overview"
---

**Pulse** is how Patchstack monitors JavaScript and Node.js applications. Where a WordPress site is monitored by the Patchstack plugin running inside WordPress, a Pulse site is monitored by [`@patchstack/connect`](/getting-started/installing-patchstack/installing-on-javascript-node-projects/), an npm package that runs during your build.

That difference in mechanism is why a Pulse site's dashboard does not look like a WordPress site's. This page explains what you get instead.

## Getting a site into the dashboard

Install the connector in your project and run `setup`. The first scan creates the site for you — there is no "add site" step to do first, and no API key to paste.

The site starts out **unclaimed**: it is being monitored, but it is not attached to anyone's account, so nobody can see its reports. `setup` prints a dashboard link. Open it, sign in, and the site attaches to your account. If you lose the link, `npx @patchstack/connect status` prints it again.

Starting from the app can skip that step: tick **Connect this website to my account automatically** under **Sites → Add new → AI-assisted** and the message it gives you carries a token for your account, so a site created with it is attached from its first scan and shows up in the app on its own. See [Connecting straight to your account](/getting-started/installing-patchstack/installing-on-javascript-node-projects/#connecting-straight-to-your-account).

An unclaimed site that nobody ever claims is cleaned up after a reminder period, so claim it while you are thinking about it.

## What the tabs show

A Pulse site gets a smaller set of tabs than a WordPress site, because several of them describe things only WordPress has.

| Tab | What it tells you |
|-----|-------------------|
| **Overview** | Whether protection is active, the vulnerabilities found in this app's dependencies, and how many packages are installed. |
| **[Packages](/patchstack-app/pulse/packages/)** | Every npm package the app has installed, which are vulnerable, and how close each vulnerability is to code the app actually runs. |
| **[Deploy history](/patchstack-app/pulse/deploy-history/)** | What each build changed about the installed packages, and whether it brought in anything already known to be vulnerable. |
| **[Attack surface](/patchstack-app/pulse/attack-surface/)** | The app's entry points, the inputs they read, and where those inputs can reach. Populated only if you run `map --upload`. |
| **Protection** | Rules protecting the app's vulnerable packages at runtime, and what they have matched. |
| **Settings** | Site name, group, and removal. |

Hardening, Activity, and Users are WordPress-only and do not appear. Reports currently cover WordPress sites; a Pulse site's security-report page hides the sections that do not apply.

## Connected, scanned, and synced

The site header shows **Last scan** — when the connector last sent a dependency manifest. This moves when you build or install dependencies, and it is how old the package data on the page is.

Hover it and Patchstack also tells you when it last had any contact with the site, whenever that is much more recent than the scan. The two differ because Patchstack learns about a Pulse site from more than one signal. The connector reports at build time. The disclosure widget in your served pages checks in when a visitor loads the site, which is how Patchstack knows the app is actually live and running the build you last reported. Patchstack also re-fetches the published page on a schedule to confirm the widget is still there.

An app that builds rarely but gets traffic will show an old scan time and recent contact. That is normal, not a fault.

Because the widget check-in runs in a public page, Patchstack treats it as corroboration rather than proof — a site's connection status is derived from what can be verified, not from the check-in alone.

## When the site was last deployed

Beside those timestamps, a Pulse site's header carries a **deploy status**. Building and deploying are separate events, and Patchstack tracks them separately.

The connector's `mark-build` step stamps each build's fingerprint into the HTML it publishes. Patchstack reads that fingerprint back off the live site — from the widget when a visitor loads a page, and from its own scheduled fetch of the published page — and compares it against the builds you have reported. That comparison is what the status says out loud:

| Status | What it means |
|--------|---------------|
| **Deployed \<when\>** | The build serving traffic is the one Patchstack scanned. |
| **Last build \<when\>** | The same, except nobody has seen this app change build since Patchstack started watching. The time shown is when the build ran, not when it went live. |
| **Needs deploying** | A newer build was scanned, but the live site is still serving an older one. Deploy to put it live. |
| **Deployed without Patchstack** | The live site is running a build Patchstack never scanned — the build ran without the connector. Run the build again with `@patchstack/connect` so its packages get checked. |
| **Sandbox only** | Builds have been reported, but only from a sandbox. Nothing has gone to production yet. |
| **Build environment** | This site is a build environment rather than a live one. Deploys are tracked on the production site it belongs to. |
| **Deploy state unknown** | Nothing current names the live build — usually a site with no traffic that Patchstack also cannot fetch. |

**Needs deploying** is the one worth acting on. The vulnerabilities Patchstack lists are the ones in the build it scanned; if that build never shipped, neither did the fixes in it.

The status also appears in the disclosure widget's owner panel, under the sync line — useful, because you are standing on the live site when you read it there.

### How quickly it updates

A deploy shows up as soon as something sees it. A site with traffic reports within the hour, from the first visitor to load a page on the new build. A site without traffic waits for the scheduled fetch of the published page, which runs daily for production sites.

Patchstack only dates a deploy it actually witnessed — one known build handing over to another. The first build it ever sees is left undated, because an app that has been live for months would otherwise read as deployed today.

## Protection

Reporting your dependencies tells you what is vulnerable. The **runtime guard** installed by `setup` is what stops those vulnerabilities being exploited while you upgrade — the JavaScript equivalent of the virtual patching Patchstack applies to WordPress sites.

The guard fetches the rules Patchstack generated for the vulnerable packages this site actually has, and reports every rule that matched, including matches it allowed through. A new rule starts in detect-only mode and begins blocking once the evidence justifies it, so protection does not arrive as a wall of false positives.

Runtime protection on a production Pulse app is a paid feature. See [The runtime guard](/getting-started/installing-patchstack/installing-on-javascript-node-projects/) for what `setup` installs and which frameworks are wired automatically.

## Removing a site

Run `npx @patchstack/connect uninstall` in the project before deleting anything locally — it needs the site's credential, so it has to run while that credential still exists. A claimed site is flagged for you to confirm in the dashboard; an unclaimed one is deleted outright.

If you remove the package without that step, Patchstack finds out the next time it re-checks the published page, and the site is marked disconnected rather than removed. The full checklist is in [Uninstalling](/getting-started/installing-patchstack/installing-on-javascript-node-projects/#uninstalling).
