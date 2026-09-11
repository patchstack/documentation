---
name: changelog
description: Generate or update the public-facing changelog at src/content/docs/changelog.md from merged PRs in patchstack/saas and patchstack/hub. Use when the user asks to "update the changelog", "create the changelog", "/changelog", or wants public release notes refreshed from recent PRs.
---

# Patchstack Documentation Changelog

Generates and maintains a customer-facing changelog at `src/content/docs/changelog.md` by reading merged PRs from `patchstack/saas` and `patchstack/hub`. Format is a monthly digest: a short narrative + bulleted highlights per month, grouped newest-first.

The skill has **three modes**:

- **Initial backfill** — `changelog.md` does not exist. Pull PRs from the last 6 months and seed the file. Auto-detected from file state.
- **Incremental update** — `changelog.md` exists. Pull PRs merged since the `<!-- last-updated: YYYY-MM-DD -->` marker at the top of the file and merge them in. Auto-detected from file state.
- **Breaking-change fast-path** — invoked explicitly (e.g. by the daily breaking-change workflow). Reads only PRs labeled `changelog:breaking` since the last fast-path run, customer-voice rewrites them, and appends to the current month's `### API & integrator changes` section under the **Breaking** sub-header. Does not touch other entries. See "Breaking-change fast-path" section below.

In interactive (user-driven) mode: always draft → review with the user → write. Never write directly without showing the diff. In automated mode (CI workflows): the skill writes the file directly — the PR review step replaces the per-entry user-review step.

## Mode detection

If the user (or a workflow) explicitly invokes "fast-path" / "breaking-change ingest" / passes a list of PRs, use **Breaking-change fast-path mode** — jump to the dedicated section below. Auto-detection only applies to the other two modes.

Otherwise, read `src/content/docs/changelog.md`:

- File missing → initial backfill mode. Cutoff date = today minus 6 months (use `date -v-6m +%Y-%m-%d` on macOS).
- File exists → incremental mode. Parse the `<!-- last-updated: YYYY-MM-DD -->` marker. Cutoff = that date.
  - If the marker is missing (corrupted file), fall back to scanning the latest month heading and ask the user to confirm the cutoff before proceeding.

## Step 1 — Fetch merged PRs

Run both repos in parallel via `gh`:

```bash
gh pr list --repo patchstack/saas --state merged --base main \
  --search "merged:>=<CUTOFF>" --limit 500 \
  --json number,title,body,labels,mergedAt,author,url

gh pr list --repo patchstack/hub --state merged --base main \
  --search "merged:>=<CUTOFF>" --limit 500 \
  --json number,title,body,labels,mergedAt,author,url
```

Tag each PR with its product (`hub` or `saas`) so the source is preserved through filtering.

## Step 2 — Auto-drop noise

Drop a PR before classification if **any** of these apply:

- Has the `dependencies` label.
- Title matches (case-insensitive): `^chore\(deps`, `^Bump `, `^Revert "Bump`, `^Revert "chore\(deps`, `^Merge `, `^Sync `.
- Title is purely CI / tooling / repo-housekeeping: `ci:`, `chore: ci`, `update workflow`, `bump action`, `pin `, `lint`, `formatter`, `pre-commit`, `editorconfig`.
- Author is a bot (`dependabot`, `renovate`, `github-actions`).
- Pure reverts (`^Revert "...`) — the reverted change presumably never reached customers; do not surface the back-and-forth.

Keep a count of dropped PRs so it can be shown in the review summary ("filtered 47 dependency / CI PRs").

## Step 3 — Classify survivors

For each remaining PR, decide:

1. **Customer-facing?** Skip if it's only internal refactor, test changes, dev tooling, internal logging, or schema-only changes with no customer visibility. When in doubt, read the body — if it doesn't change what a customer sees or can do, drop it.
2. **Category** — exactly one of:
   - **Added** — new feature, new endpoint, new product surface.
   - **Improved** — enhancement to existing behavior, performance, UX polish, expanded API.
   - **Fixed** — bug fix.
   - **Security** — vulnerability fix or hardening (rare; only flag when clearly security-driven).
3. **Surface** — one of `Hub`, `SaaS`, `API`, or `Both` (when a change spans products). API-only changes (OpenAPI spec, endpoints) usually surface as `API` even if they came from saas/hub.

If a PR title references a ticket (`ENG-2839`, `[FEAT]`, etc.), strip that for the rewrite.

## Step 4 — Rewrite to customer voice

Rewrite each PR's title (using its body for context) into a single, present-tense, customer-facing sentence.

- Speak to outcomes, not implementation. ✅ "Vulnerability dashboard now appends results when you click Load more." ❌ "Append vulnerabilities on dashboard Load more instead of replacing."
- Drop internal names (controller / job / model names) unless they're customer-facing concepts.
- No "we" / "I" — neutral product voice. ✅ "Dashboard load times improved." ❌ "We made the dashboard faster."
- Keep it one sentence. If a PR genuinely needs two, split — but most don't.
- Don't invent. If you can't tell what a PR does from title + body, skip it and note it in the review summary.

## Step 5 — Group by month, draft the output

Group entries by the month of `mergedAt` (YYYY-MM). For each month, write **in this order**:

1. A heading `## <Month> <Year>` (e.g. `## May 2026`).
2. A 1–2 sentence narrative summary of the month's theme. Conversational, not a copy of the bullets below.
3. **`### API & integrator changes`** (only when applicable — see below).
4. A `**Highlights**` line followed by **4–6 bullets** — the most impactful customer-visible changes — each prefixed with the surface in bold: `- **Hub** — …`. Resist the urge to expand this list; everything that doesn't fit goes into the `<details>Other changes</details>` block. Don't repeat entries that are already covered in the API & integrator changes section above — Highlights should focus on what an end-user (not an integrator) notices.
5. A `<details><summary>Other changes</summary>` block containing the remaining customer-facing entries, grouped by category (**Added** → **Improved** → **Fixed** → **Security**). Close with `</details>`.

Months go newest-first. If a month has no Highlights-worthy items beyond a couple of bullets, skip the `<details>` block.

### The API & integrator changes section (important)

For any month that includes changes affecting API consumers, partner integrations, or external clients, insert a dedicated `### API & integrator changes` subsection **between the narrative and the Highlights**. This is non-optional — integrators have explicitly asked for upfront visibility into API changes.

Within this subsection, group entries under **four sub-headers in this order**. Omit any sub-header that has no entries for the month — never leave an empty header.

**Breaking** — anything that requires integrators to change their code:
- response shape change (e.g. field type changed from array to string)
- removed or renamed field or endpoint
- stricter validation that may reject previously-accepted payloads
- a behaviour change that returns a different status code for the same request

**Behaviour changes** — observable but non-breaking:
- endpoint now returns `404` where it used to return `500`
- response now includes zero-filled days
- rate limiting added
- caching headers changed
- graceful degradation replaces an error

**Additive** — new endpoints and fields integrators can adopt:
- new endpoint paths
- new fields on existing responses
- new query parameters or request body fields

**Deprecations** — still works but on the way out:
- field/endpoint slated for removal in a future release

Bullets inside a sub-section do **not** repeat the label (the sub-header carries that). Be specific in the bullet: name the endpoint path, the field, the status code change. Integrators should be able to scan a sub-section and decide if their integration needs touching.

If a single PR has multiple distinct API impacts (e.g. it adds a field AND renames an existing one), split into multiple bullets under the appropriate sub-sections — don't fit one PR into one bullet.

Pure documentation-only entries (e.g. "OpenAPI schema added for existing endpoint X") go under **Additive** since they let integrators discover endpoints they can now adopt confidently. They do not go in "Other changes / Improved".

The page also carries a top-of-page `:::note[Integrating with our APIs?]` callout pointing readers at these sections.

### File template

```markdown
---
title: Changelog
description: Recent updates and improvements to the Patchstack platform, Hub, and APIs.
---

<!-- last-updated: YYYY-MM-DD -->

This page lists notable updates to the Patchstack platform, Patchstack Hub (vulnerability database & VDP), and our APIs. For day-to-day questions, see the [FAQ](/faq-troubleshooting/).

:::note[Integrating with our APIs?]
Each month below has a dedicated **API & integrator changes** section that calls out breaking changes, behaviour changes, new endpoints, and deprecations. Skim these whenever you upgrade.
:::

## May 2026

<1–2 sentence narrative summary of the month's theme.>

### API & integrator changes

**Breaking**
- Vulnerability API `cve` field returns a single string instead of an array. Clients indexing into the response need updating.

**Behaviour changes**
- App API token validation endpoint now accepts MCP OAuth tokens in addition to App API keys.

**Additive**
- `POST /pulse/manifest/{uuid}` ingests Pulse application manifests for a known site UUID.

**Deprecations**
- Top-level `lastid` and `oauth` fields on add-site responses are deprecated in favour of per-URL `sites` entries.

**Highlights**
- **SaaS** — Okta SSO is now available.
- **SaaS** — Pulse foundation: npm packages now appear on the Software tab with vulnerability status.
- **Hub** — Vulnerability export now includes validation, vendor contact, patched, and finished dates.
- **SaaS** — New pages for creating and editing alert triggers.

<details>
<summary>Other changes</summary>

**Improved**
- **SaaS** — ...

**Fixed**
- **SaaS** — ...

</details>
```

The `<!-- last-updated: -->` marker should reflect the most recent `mergedAt` date you actually included. Set it to that date so the next incremental run picks up cleanly.

## Step 6 — Review with the user

Before writing the file (interactive mode only — skip in automated mode):

1. Print a short summary: "X PRs scanned, Y filtered as noise, Z customer-facing entries across N months."
2. Print the proposed file content (or, for incremental mode, the diff against the existing file).
3. Ask the user to approve, edit specific entries, or skip individual items. Use `AskUserQuestion` only if there's a clear binary choice; otherwise just print the draft and wait for free-form feedback.

In automated CI mode (called from a GitHub Action), skip this step entirely — the workflow's PR-for-review replaces per-entry review.

For incremental mode specifically:
- New months prepend to the top (under the intro paragraph).
- The current month, if it already has a section, gets that section rebuilt from the union of existing entries and new ones (de-duped by PR number). Preserve any manual edits the user made — if a bullet doesn't match a PR you scanned, leave it alone.

## Step 7 — Write and wire up

After approval (or directly, in automated mode):

1. Write `src/content/docs/changelog.md` with the updated content and the `<!-- last-updated: -->` marker.
2. Check `astro.config.mjs` — if there's no sidebar entry for the changelog, propose adding one (typically as a top-level item near the bottom of the sidebar array, e.g. after FAQ). Show the exact diff and let the user approve before editing.
3. Suggest the user run `npm run dev` to spot-check before committing (interactive mode only).

Do **not** commit, push, or open a PR unless the user explicitly asks. In automated mode, the workflow handles the commit + PR after the skill writes the file.

## Notes on edge cases

- **Squashed merge commits with multiple changes** — the PR title usually still captures the main change. If the body lists multiple distinct customer-visible changes, split into multiple bullets.
- **Reverts of customer-visible changes** — if a previously-shipped feature is reverted, that *is* worth a changelog entry (under Fixed, framed as "rolled back the X change after reports of Y"). The auto-drop in Step 2 targets revert-of-bump noise; use judgment for reverts of real features.
- **Cross-repo coordinated changes** — if you see paired PRs in saas and hub that ship the same user-visible feature, collapse them into one entry with surface `Both`.
- **No customer-facing changes in the period** — if every PR got filtered, tell the user and don't write an empty month section. Do still bump the `<!-- last-updated: -->` marker so the next run starts from the right point.

## Breaking-change fast-path

Invoked explicitly when the user (or an automated workflow) needs to publish breaking-change entries without waiting for the next batched run. The daily breaking-change GitHub Action is the primary caller; users can also invoke this directly when shipping a hotfix that needs immediate documentation.

**Input**: one or more PR URLs/numbers from PRs labeled `changelog:breaking`. The caller passes the list — the skill does not scan for the label itself, so this mode never produces unexpected output from non-labeled PRs.

**Logic**:

1. For each input PR, fetch title + body via `gh pr view --json title,body,mergedAt,url`.
2. Customer-voice rewrite each PR following the same rules as Step 4 of the main flow. Confirm each entry is genuinely "Breaking" (response shape change, removed/renamed field, removed endpoint, stricter validation that may reject previously-accepted payloads, status code change for the same request).
3. If a labeled PR is actually a behaviour change rather than breaking, surface it to the caller — the label was probably misapplied. Don't silently demote into Behaviour changes; the caller needs to know to fix the label.
4. Read `src/content/docs/changelog.md`. Find the current month's section (newest `## <Month> <Year>` heading by `mergedAt`).
5. Inside that month's `### API & integrator changes` subsection, find or create the `**Breaking**` sub-header. Append the new entries underneath, preserving any existing Breaking bullets and ordering by `mergedAt` ascending (oldest first).
6. If the current month's section doesn't exist yet (e.g. running on the 1st before the weekly batch has happened), create the month's section with just the heading, a placeholder narrative ("More entries to follow."), and the `### API & integrator changes` subsection containing only the **Breaking** sub-header with these entries. The next weekly run will fill in the narrative, Highlights, and Other changes.
7. Bump `<!-- last-updated: YYYY-MM-DD -->` to the most recent `mergedAt` from the input PRs.

**Do NOT** in this mode:
- Regenerate other entries (Highlights, Other changes, narrative summary).
- Re-curate previous months.
- Re-run noise filtering on non-input PRs.
- Touch the `### API & integrator changes` sub-sections other than **Breaking** (e.g. don't move things around in Behaviour changes / Additive / Deprecations).

The fast-path is surgical: it adds the new Breaking bullets and bumps the marker. The next weekly batched run smooths everything else out.
