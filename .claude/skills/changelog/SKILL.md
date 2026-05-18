---
name: changelog
description: Generate or update the public-facing changelog at src/content/docs/changelog.md from merged PRs in patchstack/saas and patchstack/hub. Use when the user asks to "update the changelog", "create the changelog", "/changelog", or wants public release notes refreshed from recent PRs.
---

# Patchstack Documentation Changelog

Generates and maintains a customer-facing changelog at `src/content/docs/changelog.md` by reading merged PRs from `patchstack/saas` and `patchstack/hub`. Format is a monthly digest: a short narrative + bulleted highlights per month, grouped newest-first.

The skill has **two modes** auto-detected from the current state of the changelog file:

- **Initial backfill** — `changelog.md` does not exist. Pull PRs from the last 6 months and seed the file.
- **Incremental update** — `changelog.md` exists. Pull PRs merged since the `<!-- last-updated: YYYY-MM-DD -->` marker at the top of the file and merge them in.

Always draft → review with the user → write. Never write directly without showing the diff.

## Mode detection

Read `src/content/docs/changelog.md`.

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
4. A `**Highlights**` line followed by 6–10 bullets — the most impactful customer-visible changes — each prefixed with the surface in bold: `- **Hub** — …`.
5. A `<details><summary>Other changes</summary>` block containing the remaining customer-facing entries, grouped by category (**Added** → **Improved** → **Fixed** → **Security**). Close with `</details>`.

Months go newest-first. If a month has no Highlights-worthy items beyond a couple of bullets, skip the `<details>` block.

### The API & integrator changes section (important)

For any month that includes changes affecting API consumers, partner integrations, or external clients, insert a dedicated `### API & integrator changes` subsection **between the narrative and the Highlights**. This is non-optional — integrators have explicitly asked for upfront visibility into API changes.

Surface any of:

- **Breaking** — response shape change, removed/renamed field, renamed endpoint, stricter validation that may reject previously-accepted payloads.
- **Behaviour change** — non-breaking but observable change (e.g. response now includes zero-filled days, endpoint now returns 404 where it used to return 500, validation tightened, rate limiting added, caching headers changed, graceful degradation replaces an error).
- **New endpoint** / **New field** — additive but worth flagging so integrators can adopt.
- **Deprecation** — field/endpoint still works but is on the way out.

Format each bullet as `- **<Label>** — <description>`. Be specific: name the endpoint path, the field, the status code change. Integrators should be able to scan this section and decide if their integration needs touching.

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

- **New endpoint** — `POST /pulse/manifest/{uuid}` ingests Pulse application manifests for a known site UUID.
- **Behaviour change** — App API token validation endpoint now accepts MCP OAuth tokens in addition to App API keys.
- **Deprecation** — Top-level `lastid` and `oauth` fields on add-site responses are deprecated in favour of per-URL `sites` entries.

**Highlights**
- **SaaS** — Okta SSO is now available.
- **SaaS** — Pulse foundation: npm packages now appear on the Software tab with vulnerability status.
- **Hub** — Vulnerability export now includes validation, vendor contact, patched, and finished dates.

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

Before writing the file:

1. Print a short summary: "X PRs scanned, Y filtered as noise, Z customer-facing entries across N months."
2. Print the proposed file content (or, for incremental mode, the diff against the existing file).
3. Ask the user to approve, edit specific entries, or skip individual items. Use `AskUserQuestion` only if there's a clear binary choice; otherwise just print the draft and wait for free-form feedback.

For incremental mode specifically:
- New months prepend to the top (under the intro paragraph).
- The current month, if it already has a section, gets that section rebuilt from the union of existing entries and new ones (de-duped by PR number). Preserve any manual edits the user made — if a bullet doesn't match a PR you scanned, leave it alone.

## Step 7 — Write and wire up

After approval:

1. Write `src/content/docs/changelog.md` with the updated content and the `<!-- last-updated: -->` marker.
2. Check `astro.config.mjs` — if there's no sidebar entry for the changelog, propose adding one (typically as a top-level item near the bottom of the sidebar array, e.g. after FAQ). Show the exact diff and let the user approve before editing.
3. Suggest the user run `npm run dev` to spot-check before committing.

Do **not** commit, push, or open a PR unless the user explicitly asks.

## Notes on edge cases

- **Squashed merge commits with multiple changes** — the PR title usually still captures the main change. If the body lists multiple distinct customer-visible changes, split into multiple bullets.
- **Reverts of customer-visible changes** — if a previously-shipped feature is reverted, that *is* worth a changelog entry (under Fixed, framed as "rolled back the X change after reports of Y"). The auto-drop in Step 2 targets revert-of-bump noise; use judgment for reverts of real features.
- **Cross-repo coordinated changes** — if you see paired PRs in saas and hub that ship the same user-visible feature, collapse them into one entry with surface `Both`.
- **No customer-facing changes in the period** — if every PR got filtered, tell the user and don't write an empty month section. Do still bump the `<!-- last-updated: -->` marker so the next run starts from the right point.
