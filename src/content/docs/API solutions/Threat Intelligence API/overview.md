---
title: "Overview"
excerpt: ""
metadata: 
  image: []
  robots: "index"
createdAt: "Thu Jun 01 2023 12:04:17 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jul 31 2023 12:13:26 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 1
  label: "Overview"
  hidden: false
---

Patchstack publishes three ways to consume its vulnerability database. Standard and Extended are the stable tiers of the v2 API; the Beta API is a new generation available to selected partners only.

## Which API should I use?

| | **Standard** | **Extended** | **Beta** |
|---|---|---|---|
| **Status** | Stable (v2) | Stable (v2) | Beta — selected partners only |
| **Access** | Purchase via [Patchstack App](https://app.patchstack.com/billing/subscription) | Custom pricing, activated on request — [contact us](https://patchstack.com/for-hosts/) | By invitation. If you're working with Patchstack on an integration, [get in touch](https://patchstack.com/for-hosts/) |
| **Rate limit** | 5,000 calls / 24 hours | Custom | Custom |
| **Ecosystems** | WordPress plugins, themes, core | WordPress plugins, themes, core | WordPress + **npm** |
| **Lookups** | Single plugin/theme/version | Single + bulk | Single + bulk |
| **Pagination** | Offset | Offset | Offset **and** cursor |
| **Response shape** | Flat | Flat | Nested (`product`, `cvss`, `cwe`, `version_info`…) |
| **Full advisory body** | No | Yes | Opt-in via `?include=details` |
| **OpenAPI spec / Postman collection** | — | — | [Yes](/api-solutions/threat-intelligence-api/beta/#use-with-postman-insomnia-bruno-or-hoppscotch) |

**New integration?** If you have Beta access, use Beta — it's the direction we're heading, and Standard/Extended will eventually adopt the same shape. If not, start with Standard or Extended depending on your data needs.

**Existing integration?** Standard and Extended remain supported; no migration is required.

---

### Standard Threat Intelligence API
Fetch the latest vulnerability information for a single version of a particular plugin, theme or WordPress core. API is limited for 5000 calls / 24 hours. Access to this API can be purchased through the [Patchstack App](https://app.patchstack.com/billing/subscription).

[Standard Threat Intelligence API Documentation](/api-solutions/threat-intelligence-api/standard/)

### Extended Threat Intelligence API
Access everything included in the Standard tier, bulk-request data for multiple plugins with one API call, and have additional endpoints with more information about vulnerabilities. Extended tier has custom pricing and is activated on request only. For access to these API endpoints, please [contact us here](https://patchstack.com/for-hosts/).

[Extended Threat Intelligence API Documentation](/api-solutions/threat-intelligence-api/extended/)

### Beta Threat Intelligence API
A new generation of the Threat Intelligence API, currently available to **selected partners working directly with Patchstack**. Adds npm ecosystem coverage, an opt-in full advisory body (`?include=details`), a consistent nested response shape, and cursor-based pagination alongside the existing offset pagination. If you're already working with us on an integration and would like access, [contact us](https://patchstack.com/for-hosts/).

[Beta Threat Intelligence API Documentation](/api-solutions/threat-intelligence-api/beta/)
