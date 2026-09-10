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

## Application status

The **Status** tab shows where the app is in its life, from set up to protected, and what that verdict rests on. The chip beside the site name is its short form and links to it, so the Overview stays a dashboard.

The headline is one of:

- **Configured locally** — Patchstack is set up in the app's working tree and its packages were scanned on a developer's machine. Nothing has been deployed with it yet. This is what a fresh `setup` produces, and it is not a connected site: nothing is live.
- **Sandbox only** — builds have been reported from a hosted builder's sandbox, and nothing has gone to production.
- **Not deployed yet** — the app was added but no build has reported at all.
- **Needs deploying** — a newer build has been scanned than the one the live site is serving.
- **Deployed** — the live site is running a build Patchstack scanned. The date is when the build was seen to change on the live site; where nothing has changed under observation, it is the build time, labelled as such.
- **Deployed without Patchstack** — the live site is running a build that was never scanned. Run the build again with `@patchstack/connect` installed.
- **Deploy state unknown** — production builds exist, but nothing current says which one is live.

Next to the headline, **Reporting from** names the environment Patchstack last heard from — *local machine*, *sandbox*, or *production* — and the four stages below it (**Configured**, **Deployed**, **Monitoring**, **Protection**) are each graded from what was actually observed, with its timestamp. A stage is not ticked because a later one is: an app can be live without a production scan, and the card says so.

Every status that is not the finished one names the next step. For a locally configured app that is: add `PATCHSTACK_API_KEY` to the hosting platform's environment, commit the generated changes, and deploy. Expand **What this is based on** to see every signal behind the verdict — a scan on a developer machine, a production build, the widget checking in from the live site, Patchstack's own fetch of the page — with where each came from and when.

A deploy that was scanned before it went out, but not by the build that shipped it, still reads as **Deployed**: the build's fingerprint in the served page proves it. The next step then asks you to add `PATCHSTACK_API_KEY` to the hosting environment, so every future deploy reports its own build rather than relying on a scan made elsewhere.

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

### When protection is not offered

The guard screens requests, so it needs a request path to sit on. Some apps have none, and the Status tab and the Protection card say so instead of offering protection:

- **Not available for this app** — the app builds a static site (Eleventy, Gatsby, Docusaurus, VitePress, a SvelteKit site with the static adapter, and similar) and nothing in it receives a request. Dependency monitoring and the disclosure widget still apply; runtime protection does not. `setup` installs nothing for it on such a project, and `protect --check` reports the capability as not applicable rather than as failing. Protection becomes available if the app later gains a server or edge request path.
- **Deploy first** — the app has not been deployed with Patchstack yet. Protection is verified against a live site, so deploy, then enable it.

The card names what the verdict is based on: the attack-surface map's analysis of the source where the app has reported one, otherwise the packages in its newest build.

## Removing a site

Run `npx @patchstack/connect uninstall` in the project before deleting anything locally — it needs the site's credential, so it has to run while that credential still exists. A claimed site is flagged for you to confirm in the dashboard; an unclaimed one is deleted outright.

If you remove the package without that step, Patchstack finds out the next time it re-checks the published page, and the site is marked disconnected rather than removed. The full checklist is in [Uninstalling](/getting-started/installing-patchstack/installing-on-javascript-node-projects/#uninstalling).
