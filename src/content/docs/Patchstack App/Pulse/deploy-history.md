---
title: "Deploy history"
excerpt: "A per-build changelog of what each deploy added, removed or moved in a Pulse app's dependencies."
hidden: false
createdAt: "Thu Aug 27 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Oct 05 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 3
  label: "Deploy history"
---

**Deploy history** turns the manifests your builds report into a changelog: for each build, what it added, what it removed, what changed version, and whether anything it brought in was already known to be vulnerable.

You find it on the app's **Activity** tab.

The [Packages](/patchstack-app/pulse/packages/) tab answers "what is installed now". It cannot answer "when did this arrive" — which is the question that matters when an app's dependencies were chosen by an AI coding tool rather than picked deliberately.

## Reading a build

Deploy history is a table. Each build starts with a header row: when it ran, its checksum, and a summary such as *2 changes · 481 packages*. Under it, one row per package the build changed:

| Event | Meaning |
|-------|---------|
| **Installed** | The package was not installed before this build. |
| **Updated** | The package moved to a higher version. |
| **Downgraded** | The package moved to a lower version. |
| **Changed** | The set of installed versions moved without going one direction: a version was added alongside an existing one, or two versions swapped for two others. |
| **Removed** | The package was installed before this build and is not now. |
| **Detected** | A version this build brought in was already known to be vulnerable. The row sits under the package it belongs to. |

Two builds look different on purpose:

- **The first recorded build** is shown as a **Baseline** row, not as several hundred installs. An initial scan would otherwise bury every real change beneath it.
- **A build that changed nothing** says *No package changes*. Patchstack records a build whenever the reported package set differs from the one before it, so a build with no dependency change is a meaningful, quiet entry rather than a missing one.

## Vulnerability notes

Only the versions a build *introduced* are checked against vulnerability data — the additions, plus the landing versions of any change.

Packages that were already installed are the Packages tab's job. Re-flagging them here would turn a changelog into a second, noisier copy of that list.

So a build annotated with a vulnerability is telling you something specific: this deploy is what brought the problem in.

## Which build is live

In production, the build serving traffic right now carries a **Live** badge. The newest build in the table is not automatically the live one, and the site header shows the same deploy status.

Where a newer build was scanned but never shipped, the tab says so directly — the table alone cannot, because a build that never went out looks exactly like one that did. See [when the site was last deployed](/patchstack-app/pulse/pulse-overview/#when-the-site-was-last-deployed).

## Exporting

**Export CSV** downloads the builds on screen for the selected environment, one line per table row. The file is named after your site and the export date, for example `my-app.lovable.app-2026-10-08.csv`. Each line carries the build's time (in UTC) and environment, then the event, object, package and details. A baseline or unchanged build gets a line of its own, so every build is in the file.

## Environments

Builds are grouped by environment, and a build is only ever compared against the build before it **in the same environment**.

This matters if you scan from more than one place. Production and sandbox builds interleave freely in time, so diffing across them would report your sandbox package set as production churn and vice versa. Keeping the lineages separate is what makes the diff mean anything.

With no environment selected, the view follows the site's most recent build, so an app that only ever scans from a sandbox still gets a real timeline.

You can set the environment a scan reports as with `PATCHSTACK_ENVIRONMENT`, or `environment` in `.patchstackrc.json`. When nothing sets it, the scan reports where it ran. A build your hosting platform makes for its production deployment reports `production`, and so does a CI build of your production branch (`main`, `master`, `production`, `prod`, `release` or `live` on GitHub Actions, GitLab CI, Cloudflare Pages, AWS Amplify and similar). A preview, a pull-request build or a build of any other branch reports `sandbox`. A scan on a developer's machine, or in a CI runner Patchstack cannot place, reports `local`. Local builds are kept as their own lineage too, so the packages you tried on a laptop never show up as production churn.

## When it is empty

"No builds recorded yet" means the app has not reported a package manifest. Run a build, or run `npx @patchstack/connect scan` directly, and the first entry appears as a baseline.
