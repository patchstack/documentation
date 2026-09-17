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

## Whether you are protected

A list of vulnerabilities reads as a list of things to do, which is wrong when Patchstack is already blocking attacks on them. A summary above the table says which of three states the app is in:

| State | What it means |
|-------|---------------|
| **No known vulnerabilities** | Nothing installed matches a vulnerability Patchstack knows about. |
| **Mitigated** | Every vulnerable package is covered by a virtual patch the runtime guard is serving. Attacks are blocked; there is nothing you need to do right now. |
| **Not mitigated** | At least one vulnerable package has no virtual patch behind it, or protection is switched off for the app. |

Individual rows say the same thing: a package covered by a virtual patch shows **Mitigated** in place of its patch priority, and its version is no longer shown in red. The priority and severity move into the tooltip, along with a reminder of what mitigation does and does not do.

"Mitigated" is a claim about what the guard is actually serving, not about what rules exist. A rule for an advisory only counts once a blocking bundle containing it has been delivered to your app — so an app running in detect-only mode, or one that has not yet fetched its rules, is not reported as mitigated.

When Patchstack cannot reach its vulnerability database it says nothing rather than reassuring you. An empty result from a check that failed looks the same as an empty result from a check that passed, so the summary withholds "no known vulnerabilities" and "mitigated" until the check has actually answered for every package.

## Acting on a vulnerable package

**Mitigated is not fixed.** A virtual patch blocks attempts to exploit the vulnerability. The vulnerable version is still installed, and the advisory still applies to it.

Upgrading the package is the fix. Patchstack shows the versions that resolve the advisory so you can pick a target.

Where an upgrade is not immediately possible, the [runtime guard](/getting-started/installing-patchstack/installing-on-javascript-node-projects/) can block attempts to exploit the vulnerability in the meantime. That is a stopgap that buys you time, not a substitute for the upgrade.

## Why a package can appear twice

npm allows the same package to be installed at more than one version at once, when two dependencies need incompatible versions. When that happens the package appears once per installed version, because the vulnerability status of each version is genuinely different.
