---
title: "Packages"
excerpt: "The npm packages a Pulse app has installed, which are vulnerable, and how close each vulnerability is to code the app runs."
hidden: false
createdAt: "Thu Aug 27 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Aug 27 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 2
  label: "Packages"
---

The **Packages** tab lists every npm package the app has installed, with its version and whether Patchstack knows of a vulnerability in it. It answers "what is installed right now" — for "when did this arrive", see [Deploy history](/patchstack-app/pulse/deploy-history/).

The list comes from the dependency manifest the connector sends during your build, so it includes transitive dependencies, not only the ones named in your `package.json`.

## Reachability

A modern app installs hundreds of packages it never calls. A vulnerability in one of those is not the same problem as a vulnerability in a package your request handlers use directly, and treating them alike buries the second under the first.

If you have uploaded an [attack-surface map](/patchstack-app/pulse/attack-surface/), Patchstack labels each finding with how close it is to code your app actually runs:

| Verdict | What it means |
|---------|---------------|
| **Reachable** | A path through your code reaches this package at a point Patchstack can model, on evidence strong enough to generate a protection rule pinned to that location. |
| **API called** | Your app calls one of this package's functions. Package-level, not advisory-level: it means you use the package, not necessarily the vulnerable function. |
| **Imported** | Your app imports the package. Nothing is claimed about whether the vulnerable code is reached — usually there is no model of it, so Patchstack did not look. |
| **Not imported** | The package is absent from a complete inventory of what your app imports. It arrived as somebody else's dependency. |
| **Unknown** | No map has been uploaded, or the map is too old or too incomplete to answer. |

Read these as a prioritisation order, not a verdict on exploitability.

**"Not imported" is not an all-clear.** It is the only negative verdict here, and it still only says your own code does not import the package — a framework you do use can call it on your behalf. Treat it as "look at this last", not "ignore this".

**"Unknown" is deliberately distinct from "not imported".** Absence is only evidence when the inventory is known to be complete. When Patchstack cannot tell, it says so rather than guessing in your favour.

One limitation worth knowing: the dependency manifest and the attack-surface map are uploaded separately, and nothing currently ties them to the same build. A verdict is computed against the most recent map Patchstack holds, which may describe an older build than the manifest that produced the finding. Each verdict records which map revision answered it.

## Acting on a vulnerable package

Upgrading the package is the fix. Patchstack shows the versions that resolve the advisory so you can pick a target.

Where an upgrade is not immediately possible, the [runtime guard](/getting-started/installing-patchstack/installing-on-javascript-node-projects/) can block attempts to exploit the vulnerability in the meantime. That is a stopgap that buys you time, not a substitute for the upgrade.

## Why a package can appear twice

npm allows the same package to be installed at more than one version at once, when two dependencies need incompatible versions. When that happens the package appears once per installed version, because the vulnerability status of each version is genuinely different.

## Exporting the list (SBOM)

The **SBOM** button at the top of the app's page hands you the same inventory as a file. Press it and Patchstack first explains what the file is; the download sits inside that explanation.

A software bill of materials is a list of every package an application is built from, with the exact version of each one. People ask for it in three situations:

- **Security questionnaires.** Enterprise customers and compliance frameworks increasingly ask suppliers for this file by name.
- **Reacting to news.** When a package is reported vulnerable, searching the file for its name tells you whether it affects you.
- **Keeping a record.** The file names the build it was taken from, so you can tell what a given release shipped with.

The export is a JSON file holding the app's identity, the build it came from, and every package name and version in that build — the complete manifest, not the page of it you happen to be looking at. It contains nothing about your source code or your visitors.

An app that has never reported a build has nothing to export yet. Deploy once with [`@patchstack/connect`](/getting-started/installing-patchstack/installing-on-javascript-node-projects/) installed and the list appears.
