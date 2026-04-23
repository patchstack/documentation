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

Patchstack publishes three tiers of the Threat Intelligence API. Each tier has a narrative **Guide** and an interactive **Reference** generated from its OpenAPI spec — import the spec into Postman, Insomnia, Bruno, or a code-generation tool to get a working client in minutes.

## Standard Threat Intelligence API

WordPress plugin, theme and core lookups for a single product + version. Flat per-item shape, 5,000 requests / 24 hours. Purchase access from the [Patchstack App](https://app.patchstack.com/billing/subscription).

- [Guide](/api-solutions/threat-intelligence-api/standard/) · [Reference](/api-reference/threat-intelligence-standard/) · [OpenAPI](/schemas/threat-intel-standard.yaml) · [Postman](/schemas/threat-intel-standard.postman_collection.json)

## Extended Threat Intelligence API

Everything in Standard, plus bulk lookups (`POST /batch`, up to 50 products per request), the `/latest` rolling feed, advisory-by-id detail, and a richer per-item payload (`cvss_score`, `cve`, `is_exploited`, `patch_priority`, `patched_in_ranges`…). Custom pricing, activated on request — [contact us](https://patchstack.com/for-hosts/).

- [Guide](/api-solutions/threat-intelligence-api/extended/) · [Reference](/api-reference/threat-intelligence-extended/) · [OpenAPI](/schemas/threat-intel-extended.yaml) · [Postman](/schemas/threat-intel-extended.postman_collection.json)

## Npm Dataset API (Beta)

A new generation of the API, currently available to **selected partners working directly with Patchstack**. Adds npm ecosystem coverage, an opt-in full advisory body (`?include=details`), a consistent nested response shape (`product`, `cvss`, `cwe`, `version_info`…), and cursor-based pagination alongside offset. If you're already working with us on an integration and would like access, [contact us](https://patchstack.com/for-hosts/).

- [Guide](/api-solutions/threat-intelligence-api/beta/) · [Reference](/api-reference/threat-intelligence-beta/) · [OpenAPI](/schemas/threat-intel-beta.yaml) · [Postman](/schemas/threat-intel-beta.postman_collection.json)

---

**New integration?** If you have Beta access, use Beta — it's the direction we're heading, and Standard/Extended will eventually adopt the same nested shape. Otherwise start with Standard or Extended depending on your data needs.

**Existing integration?** Standard and Extended remain supported; no migration is required. See [API properties](/api-solutions/threat-intelligence-api/api-properties/) for v2 field definitions.
