---
title: "Deploy history"
excerpt: "A per-build changelog of what each deploy added, removed or moved in a Pulse app's dependencies."
hidden: false
createdAt: "Thu Aug 27 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Aug 27 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 3
  label: "Deploy history"
---

**Deploy history** turns the manifests your builds report into a changelog: for each build, what it added, what it removed, what changed version, and whether anything it brought in was already known to be vulnerable.

The [Packages](/patchstack-app/pulse/packages/) tab answers "what is installed now". It cannot answer "when did this arrive" — which is the question that matters when an app's dependencies were chosen by an AI coding tool rather than picked deliberately.

## Reading a build

Each entry shows the packages that build changed, grouped three ways:

- **Added** — packages that were not installed before this build.
- **Changed** — packages whose version moved. Marked *upgraded*, *downgraded*, or *mixed*. Mixed means the set of installed versions moved without going one direction: a version was added alongside an existing one, or two versions swapped for two others.
- **Removed** — packages that were installed before this build and are not now.

Two entries look different on purpose:

- **The first recorded build** is shown as a baseline, not as several hundred additions. An initial scan would otherwise bury every real change beneath it.
- **A build that changed nothing** says so. Patchstack records a build whenever the reported package set differs from the one before it, so a build with no dependency change is a meaningful, quiet entry rather than a missing one.

## Vulnerability notes

Only the versions a build *introduced* are checked against vulnerability data — the additions, plus the landing versions of any change.

Packages that were already installed are the Packages tab's job. Re-flagging them here would turn a changelog into a second, noisier copy of that list.

So a build annotated with a vulnerability is telling you something specific: this deploy is what brought the problem in.

## Environments

Builds are grouped by environment, and a build is only ever compared against the build before it **in the same environment**.

This matters if you scan from more than one place. Production and sandbox builds interleave freely in time, so diffing across them would report your sandbox package set as production churn and vice versa. Keeping the lineages separate is what makes the diff mean anything.

With no environment selected, the view follows the site's most recent build, so an app that only ever scans from a sandbox still gets a real timeline.

You can set the environment a scan reports as with `PATCHSTACK_ENVIRONMENT`, or `environment` in `.patchstackrc.json`. It defaults to `production`.

## When it is empty

"No builds recorded yet" means the app has not reported a package manifest. Run a build, or run `npx @patchstack/connect scan` directly, and the first entry appears as a baseline.
