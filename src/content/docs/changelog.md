---
title: Changelog
description: Recent updates and improvements to the Patchstack platform, Hub, and APIs.
---

<!-- last-updated: 2026-05-18 -->

This page lists notable updates to the Patchstack platform, Patchstack Hub (vulnerability database & VDP), and our APIs. For day-to-day questions, see the [FAQ](/faq-troubleshooting/).

:::note[Integrating with our APIs?]
Each month below has a dedicated **API & integrator changes** section that calls out breaking changes, behaviour changes, new endpoints, and deprecations. Skim these whenever you upgrade. If you want proactive notifications for API-affecting changes, please reach out — we're working on a notification channel for integrators.
:::

## May 2026

This month we laid down the foundations for **Pulse**, our new application-manifest based monitoring product that brings npm package vulnerability coverage alongside WordPress plugins and themes. **Okta SSO** is now available, the Threat Intelligence API picked up a Pulse manifest ingest endpoint, and we cleaned up a long tail of dashboard polish bugs across Sites, Hardening, Team, and Billing.

### API & integrator changes

**Behaviour changes**
- `POST /pulse/manifest` without a UUID auto-provisions an unclaimed site to receive the manifest.
- App API token validation endpoint now accepts MCP OAuth tokens in addition to App API keys.

**Additive**
- `POST /pulse/manifest/{uuid}` ingests Pulse application manifests for a known site UUID.
- Site add endpoint accepts an `app_type` parameter so integrations can register Pulse applications alongside WordPress sites.
- OpenAPI now covers new endpoints: `/billing/invoices/{id}/collect`, `/firewall/module/{id}/attach-state`, `/pulse/manifest/{uuid}`.

**Deprecations**
- Top-level `lastid` and `oauth` fields on add-site responses are deprecated in favour of the per-URL `sites` entries. Update parsers that read these top-level fields.

**Highlights**
- **SaaS** — Okta SSO is now available.
- **SaaS** — Pulse foundation: npm packages now appear on the Software tab with vulnerability status driven by the Threat Intelligence API.
- **SaaS** — New pages for creating and editing alert triggers.
- **Hub** — Vulnerability export now includes validation, vendor contact, patched, and finished dates.
- **Hub** — Reference links on vulnerability pages are deduplicated and use a cleaner layout.

<details>
<summary>Other changes</summary>

**Improved**
- **SaaS** — Dashboard vulnerability search now matches product name, type, and rebranded titles.
- **SaaS** — Billing flow shows a full-screen polling overlay while verifying payment.
- **SaaS** — `Load more` on the dashboard now appends vulnerabilities instead of replacing the list.
- **SaaS** — Claim flow accepts an optional URL to pre-fill the site during registration and login.
- **SaaS** — `Save` button on hardening pages moves below all cards so it stays reachable while editing.
- **SaaS** — Registration form surfaces specific validation errors instead of a generic failure message.
- **SaaS** — Two-factor authentication errors now display clearly during login.
- **Hub** — Vulnerability detail page shows a skeleton loader and a clear not-found state.
- **Hub** — Vendor disclosure date resets to a full 30-day window when contact status changes from no action.
- **Hub** — Researcher leaderboard report counts load faster through bulk queries.
- **SaaS** — Site claim flow lets users claim orphaned Pulse sites via the web interface.
- **SaaS** — Software overview page now supports pagination.

**Fixed**
- **SaaS** — Site title row wraps on narrow viewports so status icons no longer overflow.
- **SaaS** — Hardening configuration recovers correctly when sites return WAF block or HTML responses.
- **SaaS** — Activity list and chart respect the selected date range on protection overview pages.
- **SaaS** — Re-sync button on the protection overview now opens the resync modal.
- **SaaS** — Site type picker, URL scheme toggle, and post-add setup wizard are restored on the new dashboard.
- **SaaS** — Team page action dialogs no longer dismiss themselves when opened from the dropdown menu.
- **SaaS** — reCAPTCHA no longer shows an invalid-domain badge on non-production environments.
- **SaaS** — Last-sync indicator now reflects manual sync failures instead of staying green.
- **SaaS** — Software names with HTML entities are decoded across API responses, alert emails, and PDF reports.
- **SaaS** — Attach module modal shows the correct site count and writes group state consistently.
- **API** — MCP OAuth tokens are now accepted by the App API token validation endpoint.
- **SaaS** — Unbanning logins no longer rejects valid ban identifiers.
- **SaaS** — Sidebar banner no longer overlaps adjacent UI when usernames are long.
- **Hub** — NPM filter search now updates correctly when the query is cleared.
- **Hub** — Vulnerability resource returns gracefully when no researcher report data is linked.
- **Hub** — Vendor disapproval email no longer fires unless the account is actually deactivated.

</details>

## April 2026

A heavy month for **onboarding, signup, and billing hardening**: sales-created free trials, reCAPTCHA on login, end-to-end email verification fixes, a known-compromised password check on every credential touchpoint, and a series of Recurly subscription-flow fixes. Hub picked up **npm package vulnerability coverage** via GitHub Advisory ingestion, and the vulnerability API now exposes GHSA identifiers and respects affected-version constraints.

### API & integrator changes

- **Breaking** — Vulnerability API `cve` field now returns a **single CVE string instead of an array**. Update clients that index into the response as an array.
- **New field** — Vulnerability API responses now expose `ghsa_id` for vulnerabilities with a GitHub Security Advisory identifier.
- **Behaviour change** — Vulnerability version matching now respects `affected_in` constraints, so queries may return fewer false-positive matches than before.
- **New** — npm package vulnerabilities can now be queried via the vulnerability API; scoped names with slashes (e.g. `@scope/pkg`) are URL-encoded correctly.
- **Behaviour change** — Orphaned App API routes that previously returned `500` now correctly return `404`. Clients catching `500` for these paths should also handle `404`.
- **Behaviour change** — Vulnerability scans for new plugin and theme releases now run every three hours (was less frequent).

**Highlights**
- **SaaS** — Sales-created free trial accounts let prospects start a 90-day Developer-tier trial without self-signup.
- **SaaS** — Login now requires reCAPTCHA to block credential-stuffing attacks.
- **SaaS** — Password requirements now block known-compromised passwords across signup, recovery, team activation, and settings.
- **SaaS** — Team seat and plan-tier limits are now enforced on billing changes and team invites.
- **Hub** — npm package vulnerabilities can now be queried via the vulnerability API.
- **Hub** — Vulnerability API exposes the GHSA identifier and returns a single CVE string instead of an array.
- **SaaS** — Inactive Personal plan accounts now receive staged email warnings before cleanup, with login automatically cancelling the process.
- **SaaS** — Site detail page now shows a last-sync timestamp and a manual resync button.
- **SaaS** — Email verification flow added to the new dashboard for Personal plan signups.
- **SaaS** — Active sessions across App API, site token, and OAuth logins now keep accounts marked as active.

<details>
<summary>Other changes</summary>

**Added**
- **Hub** — `Report Vulnerability` link added to the vulnerability database footer.
- **Hub** — npm package advisories synced from the GitHub Advisory Database expand npm vulnerability coverage.
- **SaaS** — After adding a site, a success dialog now prompts you to install the Patchstack plugin.

**Improved**
- **Hub** — Vulnerability version matching now respects `affected_in` constraints to reduce false positives.
- **Hub** — Scoped npm package names with slashes are now handled correctly in vulnerability database URLs.
- **Hub** — Admins can now review open vulnerability reports before selecting a leaderboard random winner.
- **Hub** — Vulnerability scans for new plugin and theme releases now run every three hours.
- **Hub** — Disclosure chart palette updated for better readability.
- **SaaS** — Dashboard "Top 5 threats blocked" widget now appends the version qualifier so rules targeting different plugin versions are distinguishable.
- **SaaS** — Admin-only routes now redirect non-admin users away from admin pages.
- **SaaS** — Software names containing HTML entities now render correctly across site software pages.
- **SaaS** — Friendlier error message shown when a phone number is already in use during registration.
- **SaaS** — Registering with an email that already exists now returns a clear error instead of a generic failure.

**Fixed**
- **SaaS** — Japan flag now renders correctly in the statistics section.
- **SaaS** — Scheduled report deletion now targets the correct report instead of the last row in the table.
- **SaaS** — Subscription UI now reflects the selected annual billing frequency instead of showing Monthly.
- **SaaS** — CMS dropdown filter no longer errors when cleared.
- **SaaS** — Action dropdown on the users admin table no longer triggers an inner scrollbar.
- **SaaS** — Email verification links now succeed when tracking parameters are appended by click trackers.
- **SaaS** — Email verification links no longer fail behind HTTPS-terminating load balancers.
- **SaaS** — Email verification URLs now reliably resolve to HTTPS in production and staging.
- **SaaS** — Duplicate Recurly subscriptions are no longer created when signup is retried.
- **SaaS** — Trailing slashes on site URLs are stripped in generated PDF reports.
- **SaaS** — Activity list on the protection overview page now follows the selected date range filter.
- **SaaS** — Plugin toggle, delete, and update actions on managed sites now work correctly and persist their state.
- **SaaS** — Invited team members can now log in immediately after activating their seat.
- **SaaS** — Billing downgrades no longer fail when accounts have plan-incompatible add-ons.
- **SaaS** — Community plan downgrade is now blocked with a clear message when more than three sites exist.
- **SaaS** — Password is no longer double-hashed during Recurly registration, restoring login for affected signups.
- **SaaS** — Vulnerability detail cards on the dashboard now expand correctly.
- **SaaS** — Site deletion error messages now display correctly and the delete confirmation modal renders reliably.
- **SaaS** — Elasticsearch outages now degrade gracefully across firewall and activity log views.
- **SaaS** — Billing now correctly rounds cents to avoid floating-point drift when charging customers.
- **API** — Removed orphaned App API routes that returned a 500 error instead of 404.
- **Hub** — Researcher profile no longer shows a 0-day award unless earned in the latest leaderboard.
- **Hub** — Vero email notifications no longer crash on invalid researcher email addresses.
- **Hub** — After re-signing in, users are now returned to the page they were trying to reach instead of the login screen.

**Security**
- **SaaS** — Resolved critical dependency vulnerabilities in the PDF report service.

</details>

## March 2026

A platform-wide **resilience** push: firewall and session endpoints now degrade gracefully when Elasticsearch or the vulnerability database are briefly unavailable, instead of returning 500s. The App API gained bulk site existence checks, a public VDP widget submission endpoint, and a Slack/email notification pipeline for new VDP submissions. Hub picked up multiple security hardening headers and reCAPTCHA on database report submissions.

### API & integrator changes

- **New endpoint** — Bulk `POST /site/exists` lets integrators verify multiple URLs in a single request.
- **New endpoint** — Public VDP widget submission endpoint with validation, honeypot spam protection, and file upload support.
- **Behaviour change** — VDP submissions now trigger Slack and email notifications via a new event-driven pipeline; partners ingesting VDP webhooks should expect the new payload shape.
- **Behaviour change** — Adding a site no longer fails when the same URL is already registered elsewhere — a common partner-integration blocker is removed.
- **Behaviour change** — Firewall statistics responses now include **all dates in the requested range**, with zero counts for missing days. Clients that previously skipped empty days should expect denser arrays.
- **Behaviour change** — Bulk site adding handles larger batches per request and returns full site data in the response (previously truncated).
- **Behaviour change** — Site existence checks now behave consistently across URL variations on `/site/add` and `/site/exists` (trailing slash, scheme, etc.).
- **Behaviour change** — Firewall views and the session endpoint now degrade gracefully when Elasticsearch or the vuln database are briefly unavailable, instead of returning `500`. Clients that retried on `500` may now see eventually-consistent partial data.

**Highlights**
- **API** — Bulk `site/exists` endpoint lets multiple URLs be verified in a single request.
- **API** — Public VDP widget submission endpoint with validation, honeypot spam protection, and file uploads.
- **API** — VDP submissions now trigger Slack and email notifications via a new event-driven pipeline.
- **SaaS** — Firewall views degrade gracefully when Elasticsearch is temporarily unavailable.
- **API** — Adding a site no longer fails when the same URL is already registered elsewhere — a common partner integration blocker.
- **API** — Firewall statistics responses now include all dates in the requested range, filling gaps with zero counts.
- **Hub** — Vulnerability pages now display mass-exploit risk guidance with a `Learn more` link.
- **Hub** — CVE search treats `CVE-2021-1234` and `2021-1234` as equivalent.
- **Hub** — Reports can be rejected in bulk with selectable rejection templates.
- **Security** — Hub responses now include HSTS, X-Content-Type-Options, and X-Frame-Options.

<details>
<summary>Other changes</summary>

**Improved**
- **SaaS** — Session endpoint stays available when the vulnerability database is briefly unreachable.
- **API** — Bulk site adding handles larger batches per request, runs fewer queries, and returns full site data in the response.
- **SaaS** — Site existence checks behave consistently across URL variations on the `/site/add` and `/site/exists` endpoints.
- **SaaS** — Email-related copy is hidden when the registration flow is loaded inside an iframe.
- **Hub** — Leaderboard and vulnerability CSV exports stream large datasets and run faster through aggregated queries.
- **Hub** — Researcher report listings now include reports submitted under the researcher's email without an explicit researcher ID.
- **Hub** — Patch upload failures show a friendly error when files exceed the 100 MB size limit.
- **Hub** — Vulnerability and plugin pages handle missing data gracefully, showing a 404 fallback or redirecting instead of erroring.

**Fixed**
- **SaaS** — Changing a yearly subscription no longer fails with a database truncation error during billing updates.
- **SaaS** — Registration sub-routes no longer return CSRF 419 errors when subscribing or completing two-factor setup.
- **SaaS** — Toggling a CMS-specific firewall module now only attaches it to sites matching that CMS instead of all user sites.
- **SaaS** — Creating a "User Logged In" alert no longer returns a 422 validation error.
- **SaaS** — Linking a firewall rule to a vulnerability now persists the rule ID correctly.
- **Hub** — Future-dated reports on the VDP program page no longer show "Invalid Date".
- **Hub** — Hub frontend automatically reloads when a chunk fails to load after a new deploy.

**Security**
- **Hub** — Database report submissions are now protected by reCAPTCHA to prevent automated abuse.
- **Hub** — Upgraded phpseclib to patch CVE-2026-32935, an AES-CBC padding oracle timing vulnerability.
- **Hub** — Session cookies now use the strict SameSite policy.

</details>

## February 2026

The largest infrastructure month in this changelog so far: a top-to-bottom **performance overhaul** of the public vulnerability database — composite indexes, sargable date queries, eager loading, CDN-cacheable responses, and incremental static regeneration for high-traffic pages. New developer-facing additions include **iframe theme customisation** for embeds, **OAuth 2.1 with PKCE** for MCP clients, and a Patchstack MCP toolkit that turns dependency manifests (npm, Composer, WordPress) into a security manifest.

### API & integrator changes

- **Breaking** — MCP SBOM endpoints and tooling renamed to **"manifest"**. Update integrations referencing the old SBOM paths.
- **New** — OAuth 2.1 with PKCE authorization flow for MCP clients, including dynamic client registration and token exchange.
- **New** — Patchstack MCP tool that returns a security manifest from npm, Composer, and WordPress dependency lists.
- **New** — MCP tool that writes a `patchstack.json` config and prompts AI clients to persist it before further checks.
- **New** — Website ID support added to MCP tools, plus a new tool to list a user's Patchstack sites.
- **Behaviour change** — Strengthened request validation across portal API endpoints (alerts, billing, firewall, sites, teams, settings). Malformed payloads that previously slipped through may now be rejected with validation errors. Review error handling in integrations.
- **Behaviour change** — Public API responses now include cache headers tuned per route. Clients behind CDNs may see different freshness behaviour than before.
- **Behaviour change** — Rate limiting added to public vulnerability database routes. High-volume clients that exceed limits will receive standard rate-limit responses — reach out if you need a higher quota.
- **Behaviour change** — Public vulnerability, statistics, and leaderboard pages are now served from CDN-cached responses with incremental static regeneration. Cold reads will be near-instant; very recent updates may take a few minutes to propagate.

**Highlights**
- **API** — OAuth 2.1 with PKCE authorization flow for MCP clients, including dynamic client registration and token exchange.
- **API** — Patchstack MCP tool returns a security manifest from npm, Composer, and WordPress dependency lists.
- **SaaS** — Custom theme support for iframe embeds, including CSS variables, custom CSS strings, and hybrid mode.
- **SaaS** — Retry button for failed or pending invoice payments in account billing.
- **Hub** — Automatic and manual locking for vulnerability reports to prevent accidental publishing.
- **Hub** — Public vulnerability, statistics, and leaderboard pages now served from CDN-friendly cached responses.
- **Hub** — Vulnerability detail, statistics, and leaderboard pages now use incremental static regeneration for faster delivery.
- **Hub** — Public API responses now include cache headers tuned per route for faster repeat access.
- **Hub** — Rate limiting added to public vulnerability database routes to protect against abuse.
- **Hub** — Advanced vulnerability export with CSV/JSON output and platform filtering.

<details>
<summary>Other changes</summary>

**Added**
- **API** — Website ID support added to MCP tools, plus a new tool to list a user's Patchstack sites.
- **API** — MCP tool that writes a `patchstack.json` config and prompts AI clients to persist it before further checks.

**Improved**
- **SaaS** — Charts now follow the active theme colors instead of hardcoded values.
- **API** — Strengthened request validation across portal API endpoints for alerts, billing, firewall, sites, teams, and settings.
- **SaaS** — White-label PDF reports now handle any logo size without breaking the layout.
- **SaaS** — Report filter dropdown improved with a taller list and a new `All` option for resetting filters.
- **SaaS** — Improved performance of the site existence check API endpoints.
- **SaaS** — Restored the AWS logo URL on PDF reports.
- **SaaS** — Virtual patch state icon and tooltip now visible inside iframe embeds.
- **Hub** — Products whose name matches their platform are now shown as "Core" to avoid redundant labels.
- **Hub** — Per-country flag Vue components replaced with native Unicode emoji flags to cut network requests.
- **Hub** — MVDP discussion boards now show the program comment as the first chat message.
- **Hub** — Faster vulnerability database queries via new indexes on the vulnerabilities table.
- **Hub** — Improved performance of vulnerability database list and detail pages with caching and query optimization.
- **API** — MCP site check tool now delegates to dedicated parsing tools rather than relying on server-side file access.
- **Hub** — Footer metrics fetched once and shared across components via a reusable composable.
- **Hub** — Standardized vulnerability remediation terminology from "fix" to "patch" across the database interface.
- **Hub** — Login pages for VDP and researchers now render with full server-side rendering and stable backgrounds.
- **Hub** — Anonymous researcher avatar replaced with a new lightweight local image.
- **API** — Renamed MCP SBOM endpoints and tooling to "manifest" for consistent terminology.
- **Hub** — Discussion board chat supports per-file and total upload size limits and improved keyboard handling.
- **Hub** — Removed automatic 60-second notification polling to reduce background network usage.
- **Hub** — Faster public vulnerability search through a new composite index on the vulnerabilities table.
- **Hub** — Faster vulnerability database search queries through sargable date conditions that use indexes.
- **Hub** — Faster public vulnerability home page loads by skipping unnecessary joins when not searching.
- **Hub** — Inline code now flows on the same line as surrounding text in vulnerability report rendering.
- **Hub** — Faster leaderboard pages with eager loading and a new composite index.
- **Hub** — Capped public home pagination at 25 pages to prevent slow scraper-driven queries.
- **Hub** — Faster public vulnerability detail pages through consolidated eager loading and fewer duplicate queries.
- **Hub** — Faster public vulnerability page lookups via a new index on the slug column.
- **Hub** — Faster VDP list page loads through cached total counts.
- **Hub** — Faster leaderboard bounty totals via eager loading of related data.
- **Hub** — Faster vendor dashboard report summary with consolidated subqueries.
- **Hub** — Faster leaderboard data loading by removing redundant database queries.
- **Hub** — Faster vulnerability database and leaderboard queries via additional database indexes.

**Fixed**
- **Hub** — Fixed malformed Slack notification links for newly submitted patch links.
- **Hub** — MVDP preview no longer shows "Report was published" before the report has actually been published.
- **Hub** — Public VDP list now handles vulnerabilities with missing product, kind, or platform without errors.
- **Hub** — Magic link logins now work for users who are already signed in.
- **Hub** — Removed an unnecessary reload alert when marking a report as duplicate.
- **Hub** — Early warning notice no longer incorrectly shows on imported vulnerabilities sourced from outside Patchstack.
- **Hub** — Suppressed dynamic chunk load errors that briefly appeared after deployments on the vulnerability database.
- **Hub** — Reports can now have their XP value manually set to zero.
- **Hub** — Fixed an error in vulnerability database search caused by a missing join in the pagination count query.

**Security**
- **Hub** — Logging out now invalidates the server-side session to prevent session replay.
- **Hub** — Hardened intended-URL handling across login and 2FA flows.

</details>

## January 2026

Hub matured significantly: **researcher profiles with levels**, **vendor disclosure alerts**, **redesigned report submission**, and richer **leaderboards** with yearly views. Zeroday bounty prize tiers moved up to $33,000. On the App side, PDF and firewall reports got more presentable, with `.htaccess` rule labels and vPatches metadata. A new researchers API endpoint helps prevent duplicate submissions.

### API & integrator changes

- **New endpoint** — Researchers API endpoint to fetch reports and vulnerabilities for a product by ID or slug — helps prevent duplicate submissions.
- **Behaviour change** — Firewall statistics date range limit standardized to **370 days** across the API and validation. Clients requesting larger ranges will receive validation errors.

**Highlights**
- **Hub** — Zeroday bounty prize tiers updated, with payouts now reaching up to $33,000.
- **Hub** — Researcher profile expanded with new levels, richer progress data, and backend-driven level calculations.
- **Hub** — Researcher report submission form redesigned with new inputs, autocomplete fields, and clearer copy.
- **Hub** — Vendors with an active VDP now receive an email alert when a vulnerability affecting their software is publicly disclosed.
- **Hub** — Leaderboards add yearly aggregated view, formatted thousands, top-3 crown icons, and refined visibility rules.
- **API** — New researchers API endpoint to fetch reports and vulnerabilities for a product by ID or slug.
- **SaaS** — Custom "managed by" text is now configurable by Enterprise users, surfacing in license verification and the WordPress plugin.
- **SaaS** — PDF report generation refined with better layout, spacing, threat origin presentation, and firewall rule labels.
- **SaaS** — Firewall reports and PDFs now show richer rule data, including `.htaccess` hardening rule names and vPatches metadata.
- **Hub** — Public vulnerability pages no longer enforce a 48-hour disclosure delay; visibility now depends on publication status only.

<details>
<summary>Other changes</summary>

**Added**
- **Hub** — CVSS Pre-requisite field is now required when creating or updating a vulnerability entry.
- **Hub** — Vulnerability notes are now displayed again on the v2 vulnerability page when available.
- **Hub** — Permanent redirect from `vdp.patchstack.com/database/*` to `patchstack.com/database/*` for public pages.
- **Hub** — Patch status now drives vulnerability card display, including Pending Release and Incomplete Patch states.
- **Hub** — Vulnerability cards now expose `patch_status` and product version for clearer release messaging.
- **Hub** — Partners link added to the footer Resources column.
- **Hub** — Status Management is now read-only once a report status is set to `finished`.
- **Hub** — Database home page now offers a Component Type filter (Core / Plugin / Theme) when WordPress is selected.
- **Hub** — Researchers can now download, delete, and view upload dates of files attached via Database Manager Files on reports.

**Improved**
- **Hub** — Footer cleanup: EU logo removed and layout heights aligned.
- **Hub** — Public researcher profiles gain Zeroday bounty and severity tooltips, an exploited column, and clearer pending vulnerability UX.
- **Hub** — Leaderboard pages now default to the current month-year when no type is specified in the URL.
- **Hub** — Vendor report preview aligned with the latest Database preview design and status handling.
- **Hub** — Vulnerability submission form now defaults the affected version prefix to `<=`.
- **Hub** — Researcher profile UI refined to hide fix-submission controls and unused discussion section.
- **Hub** — Database row links can now open in a new tab via a new option on the table component.
- **Hub** — Product activation message rewritten to be clearer and less alarming when automatic disclaimer verification fails.

**Fixed**
- **SaaS** — PayPal billing update now works correctly outside iframe contexts and surfaces PayPal errors to users.
- **SaaS** — Firewall statistics date range limit standardized to 370 days across the API and validation.
- **Hub** — VDP notification emails are no longer sent to vendors whose mVDP has not been activated.
- **Hub** — Custom `patch_priority` set on a report is now preserved when publishing it to a vulnerability.
- **Hub** — A product can no longer be assigned to multiple vendors; conflicting assignments now surface a clear error.
- **Hub** — Reference links for CVE IDs now use the correct public frontend URL.
- **Hub** — "Active VDP" indicator is no longer shown for components whose mVDP is inactive.
- **Hub** — Patch priority breakdown on statistics now shows the correct count for medium and low categories.
- **Hub** — Mobile navigation no longer shows a gap at the top of the database header on real devices.
- **Hub** — Patch status on database entries list now returns a correct boolean value.
- **Hub** — mVDP profile now returns the full set of expected data after login.
- **Hub** — Reports that had been fixed via a vulnerability update no longer appear as not fixed.
- **Hub** — Additional Comment section on report previews now renders only when actual content is present.
- **Hub** — Researcher accounts can now be created when an email matches an existing or previously deleted record.
- **Hub** — Version field validation is now skipped for rejected or incomplete reports.
- **Hub** — Rejected vPatches no longer appear in the "Pending post-published" list.
- **Hub** — `fixed_in` status now stays in sync between report temp data and the related vulnerability versions.
- **Hub** — Search filter on reports now correctly respects the selected tab filter.

</details>

## December 2025

A big public-surface refresh for the Hub: home page filters with priority and exploited indicators, KEV badges, refreshed plugin and vulnerability detail pages, and a new statistics page. The App side picked up **App API key management** with expiration, IP restrictions, and read-only permissions. On the VDP side, vendors got a new timeline view and unified patch submission flow, plus a new abandoned-software warning when a product hasn't been updated in over a year.

### API & integrator changes

- **Breaking** — Deprecated `email` and `should_monitor` fields **removed** from the site update endpoint payload. Update integrations that send these fields.
- **New** — App API key management: keys can now be issued with expiration dates, IP restrictions, and read-only permissions. Existing keys are unaffected; new keys can be more tightly scoped.
- **New field** — Public plugin details API response now includes a `last_update` field.

**Highlights**
- **SaaS** — App API key management with expiration dates, IP restrictions, and read-only permissions.
- **SaaS** — User-level default site policy management to control protection settings across all sites from one place.
- **Hub** — Vendor dashboard timeline view shows report progress and a unified patch submission flow.
- **Hub** — Refreshed home page with a priority filter, exploited column, KEV indicators, and clearer action tooltips.
- **Hub** — Refreshed public VDP listing with load-more pagination, search, a Featured software table, and a bounty column.
- **Hub** — Abandoned software warning when a product has not been updated for over a year.
- **Hub** — Warning on vulnerability pages when CVSS indicates user interaction is required for exploitation.
- **Hub** — Dedicated validation notification emails for researchers and vendors when a report is validated.
- **Hub** — Service status link added to the footer.
- **API** — Public plugin details API response now includes a `last_update` field.

<details>
<summary>Other changes</summary>

**Improved**
- **API** — Removed deprecated `email` and `should_monitor` fields from the site update endpoint payload.
- **SaaS** — Direct termination access via URL and an interactive volume selector with live monthly cost in the Developer downgrade flow.
- **SaaS** — `Add API key` button for Personal plan users replaced with an upgrade prompt linking to the subscription page.
- **SaaS** — Gates API key and Slack integrations behind plan upgrade prompts and refines termination error messages.
- **Hub** — Redirects users to `/database` when a requested vulnerability cannot be found.
- **Hub** — MVDP additional comment relocated to its own section with a last-updated timestamp and improved formatting.
- **Hub** — Unified mitigation messaging to "Mitigate with Patchstack" and refined remove/replace recommendations on the public vulnerability entry page.
- **Hub** — Plugin page refined with side-by-side qualifying and non-qualifying vulnerabilities and cleaner URL structure.
- **Hub** — Home page database table empty-state copy updated and column widths stabilised.
- **Hub** — Public vulnerability entry page copy refined, details reordered, and `Patch priority` renamed to `Patchstack priority`.
- **Hub** — Statistics page refreshed with consistent table formatting, thousands separators, and a larger legend font.
- **Hub** — Debounced the CVSS severity slider on the database search form for smoother filtering.
- **Hub** — Streamlined vendor email notifications by removing redundant vendor messages on new messages and status changes.
- **Hub** — Improved the post-registration message on the vendor sign-up flow with clearer copy and dynamic program name.

**Fixed**
- **SaaS** — Restored delete site modal warning visibility by correcting background colors.
- **SaaS** — Fixed dropdown menu button focus states so labels remain visible.
- **SaaS** — Improved coupon code error handling on the billing page when the API call fails.
- **SaaS** — Fixed the success toast message displayed when settings are saved.
- **SaaS** — Fixed the report download link by switching to the correct hash format.
- **SaaS** — Preserves the full original URL including query parameters when redirecting after login.
- **Hub** — Fixed a visual glitch in box sizing on the public vulnerability page so metric boxes have consistent heights.
- **Hub** — Notification timing fixed so alerts are no longer sent before vulnerability entries are publicly accessible.
- **Hub** — Fixed 500 errors when using advanced search filters such as CVE, author, `affected_in`, and `fixed_in`.
- **Hub** — Fixed AXP scoring so WordPress Core vulnerabilities receive the correct multiplier.
- **Hub** — Fixed a type error in theme author processing that broke rendering of WordPress theme data.
- **Hub** — Fixed a type error in the time-ago formatter when given null or unexpected input.
- **Hub** — `Reported by` date in the vulnerability timeline now uses the actual report date instead of the database creation date.
- **Hub** — Fixed a vulnerability page error in older browsers by replacing `Array.at(0)` with index access.
- **Hub** — Fixed inconsistent VDP header behaviour across browsers when scrolling.
- **Hub** — Fixed the report preview banner subtitle to correctly indicate past versus future publication dates.
- **Hub** — Reports marked as duplicate no longer inflate vendor product report counts.
- **Hub** — Fixed a Vue table rendering error caused by missing default props and improved icon loading.
- **Hub** — Fixed misleading installation counts on the VDP listing by sourcing data from the WordPress plugin API.
- **Hub** — Fixed the search filter for vulnerabilities with virtual patches.
- **Hub** — Fixed duplicate reports appearing in the VDP portal by excluding them from listing and counts.

**Security**
- **SaaS** — Strengthened email validation across login, recovery, registration, and settings to block unicode and punycode spoofing.
- **Hub** — Restricted the vulnerabilities search filter to safe characters to reject malicious input.

</details>

## November 2025

A focused tightening month on the Hub: vulnerability report publishing now happens automatically when the disclosure date is reached, OWASP Top 10 categories auto-select based on vulnerability type, and the database home page picked up Load-more pagination. The plugin-vulnerability API endpoints now return a proper 404 for unknown slugs.

### API & integrator changes

- **Behaviour change** — Plugin vulnerability, security policy, and contributors endpoints now return `404` when the requested plugin slug doesn't exist (previously returned a non-404 status). Update clients that didn't handle `404` for these paths.

**Highlights**
- **Hub** — Vulnerability reports now publish automatically once their disclosure date is reached.
- **Hub** — Database home page now uses a `Load more` button that appends results instead of replacing them.
- **Hub** — Report and vulnerability pages auto-select the matching OWASP Top 10 category when a vulnerability type is chosen.
- **Hub** — Database pages now include canonical link tags for better SEO and discoverability.
- **API** — Plugin vulnerability, security policy, and contributors endpoints now return 404 when the requested plugin slug doesn't exist.
- **Hub** — Database table no longer shows an infinite loading spinner when there are no results.
- **Hub** — Session invalidation now works correctly when sessions are stored in a dedicated database.
- **Hub** — Patch upload and fix link now appear while a patch is in pending validation, and are hidden once the vulnerability is patched.
- **Hub** — vPatches deployed from external vulnerability sources are no longer mislabelled as Patchstack Alliance.
- **Hub** — Vulnerability slug links redirect to the correct vulnerability details page.

