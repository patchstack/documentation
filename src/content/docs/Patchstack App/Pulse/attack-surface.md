---
title: "Attack surface"
excerpt: "A map of a Pulse app's entry points, the inputs they read and where those inputs can reach — and what Patchstack does with it."
hidden: false
createdAt: "Thu Aug 27 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Aug 27 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 4
  label: "Attack surface"
---

The **Attack surface** tab describes the shape of your application: its entry points, the inputs each one reads, the sensitive operations those inputs can reach, and which of those links Patchstack could actually prove.

It is the input to two things you see elsewhere — the reachability verdicts on [Packages](/patchstack-app/pulse/packages/), and the protection rules Patchstack can pin to a specific place in your app rather than applying broadly.

## Uploading a map

This tab is empty until you upload a map. Unlike the dependency scan, it is not part of `setup` and never runs on its own — it sends a structural description of your app, so it is an explicit choice:

```bash
npx @patchstack/connect map --upload
```

Run it at build time, in the environment you want described. Without `--upload` the command prints the map as JSON instead, so you can see exactly what would be sent before sending anything.

The analysis uses your project's own TypeScript and reads source only. No source code leaves the machine — what is uploaded is the structure it found: routes, input names, the kinds of operation reachable from them.

## Revisions

Maps are kept as revisions. Uploading an identical map updates the current revision's timestamp; uploading a changed one is stored alongside the previous. The header shows which revision you are reading, the framework and analyser that produced it, when it was first reported, and when it was last seen unchanged.

## What the map claims, and what it does not

This is best-effort static analysis. It reports the surface it **detected**, and it is explicit about its own gaps rather than presenting a partial picture as a complete one:

- Links between an input and a sensitive operation are marked **proven** or **unproven**. A proven link is one the analyser traced; an unproven one is a suspicion it could not establish.
- **Analysis coverage** and **analyser notes** record what could not be modelled — dynamic property access, computed `require`, reflection, and similar patterns that no amount of parsing resolves.
- A dependency inventory that could not be completed says **"This inventory is incomplete"** rather than quietly reporting fewer dependencies.

That last point is what keeps the [reachability verdicts](/patchstack-app/pulse/packages/#reachability) honest. "Not imported" is only claimed against an inventory known to be complete; otherwise the verdict is "unknown".

## Rule readiness and addressability

**Rule readiness** shows how much of the surface is described precisely enough for Patchstack to generate a protection rule aimed at one endpoint, rather than a broad rule applied to the whole app.

**Addressability** is the underlying question: can this entry point be named in a way a rule can match at runtime? An entry point the analyser found but cannot address is still shown — it just cannot be individually protected yet, and the tab says what would settle it.

## Rule detections

The same tab shows what the [runtime guard](/getting-started/installing-patchstack/installing-on-javascript-node-projects/) has matched: every rule that fired, including matches it allowed through rather than blocked.

Detections that were not blocked are the useful part. A newly generated rule starts in detect-only mode, and these entries are the evidence used to decide whether it should start blocking — so you can see what a rule would have done before it does it.
