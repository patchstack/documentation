---
title: "Standard tier API"
excerpt: "Entry-level WordPress vulnerability lookup — single product + version, 5,000 requests per day."
metadata:
  image: []
  robots: "index"
createdAt: "Mon Jul 25 2022 09:28:24 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed May 10 2023 12:26:10 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 1
  label: "Guide"
---

_The Standard Threat Intelligence API is the entry-level tier of the v2 API. It returns every advisory that applies to a single WordPress plugin, theme or core version. If you need bulk lookups, the latest-24h feed, or advisory-by-id details, see the [Extended tier](/api-solutions/threat-intelligence-api/extended/)._

> **Interactive reference:** Every endpoint, parameter and response shape is documented in the [Threat Intelligence API (Standard) reference](/api-reference/threat-intelligence-standard/).

This page covers the concepts you need to use the API effectively — authentication, rate limiting, errors, and code samples. Use it alongside the interactive reference.

## Use with Postman, Insomnia, Bruno or Hoppscotch

We publish the API as an [OpenAPI 3.1 spec](https://docs.patchstack.com/schemas/threat-intel-standard.yaml) and a pre-built [Postman collection](https://docs.patchstack.com/schemas/threat-intel-standard.postman_collection.json). Every endpoint, parameter and example is preconfigured — set your `PSKey` once and the whole collection authenticates.

[Download the collection](/schemas/threat-intel-standard.postman_collection.json) and drag it into Postman/Insomnia/Bruno/Hoppscotch, or import it by URL from inside the tool.

| Tool | How to import |
|---|---|
| **Postman** | `File → Import → Link` and paste the collection URL. |
| **Insomnia** | `Create → Import From → URL` → paste the OpenAPI URL. |
| **Bruno** | `Collection → Import → OpenAPI V3 Spec` → paste the OpenAPI URL. |
| **Hoppscotch** | `Collections → Import/Export → OpenAPI` → paste the OpenAPI URL. |

**Authentication:** in Postman set the collection `Authorization` to **API Key**, key `PSKey`, value `{{PSKEY}}`, and add `PSKEY` as a collection variable with your real key as the **Current value** (leave Initial blank so it doesn't sync to teammates). Other tools work the same way — set `PSKey` as a collection header once.

## Use with Claude Code or other LLM coding assistants

Point your assistant at the spec. LLMs parse OpenAPI cleanly and will generate clients that match the real field names instead of hallucinating.

- **Ad hoc:** paste the spec URL into your prompt. Example: *"Write a PHP client for `https://docs.patchstack.com/schemas/threat-intel-standard.yaml`. I need a function that takes a slug + version and returns the advisory list."*
- **In your repo:** download the spec to `docs/vendor/patchstack-threat-intel-standard.yaml` and reference it from your `CLAUDE.md` / `AGENTS.md`. Your assistant can then grep the YAML for specific fields without refetching.
- **Plain-text fallback:** for tools that don't parse YAML, our [`llms-full.txt`](/llms-full.txt) contains the full reference as flat markdown.

## SDK generation

Generate a client in any language from the same spec:

```bash
# TypeScript
npx @openapitools/openapi-generator-cli generate \
  -i https://docs.patchstack.com/schemas/threat-intel-standard.yaml \
  -g typescript-fetch -o ./patchstack-client

# Python
npx @openapitools/openapi-generator-cli generate \
  -i https://docs.patchstack.com/schemas/threat-intel-standard.yaml \
  -g python -o ./patchstack-client-py
```

Speakeasy and Fern also consume the same spec and produce more idiomatic SDKs if you need a polished client library.

## Base URL

```
https://patchstack.com/database/api/v2/
```

## Authentication

Every request must include your API key in the **`PSKey`** HTTP request header. You can request an API key from your [Patchstack App billing page](https://app.patchstack.com/billing/subscription).

```
PSKey: <your-api-key>
```

## Response format

All responses are JSON. Responses are cached until the Patchstack database updates, at which point the cache is cleared.

The Standard tier returns a **flat** per-item shape. For the richer shape with `description`, `vuln_type`, `cvss_score`, `cve`, and `patched_in_ranges`, use the [Extended tier](/api-solutions/threat-intelligence-api/extended/). Field definitions live in [API properties](/api-solutions/threat-intelligence-api/api-properties/).

## Rate limiting

Standard is limited to **5,000 requests per 24 hours**. Contact <https://patchstack.com/for-hosts/> if you need a higher quota or the Extended tier.

## Errors

| Status | Meaning |
|---|---|
| `401 Unauthorized` | Missing or invalid `PSKey` header. |
| `403 Forbidden` | API key not authorised for the requested endpoint. |
| `404 Not Found` | Unknown product/version combination. |
| `429 Too Many Requests` | Rate limit exceeded. |
| `500` | Server error — please include the request id in any bug report. |

---

## Testing

### curl — one-liners

```bash
# Full advisory list for a plugin version
curl 'https://patchstack.com/database/api/v2/product/plugin/tutor/1.5.2' \
  -H 'PSKey: <your-api-key>'

# Boolean-only exists check (faster)
curl 'https://patchstack.com/database/api/v2/product/plugin/tutor/1.5.2/exists' \
  -H 'PSKey: <your-api-key>'

# WordPress core
curl 'https://patchstack.com/database/api/v2/product/wordpress/wordpress/5.8.2' \
  -H 'PSKey: <your-api-key>'
```

### Postman / Insomnia / Bruno / Hoppscotch

Import the OpenAPI spec directly from [`threat-intel-standard.yaml`](https://docs.patchstack.com/schemas/threat-intel-standard.yaml) — authentication and parameters are preconfigured. Set the `PSKey` security value to your API key once and every request in the collection will use it.

## More information

You can find more information about the Patchstack Threat Intelligence API on <https://patchstack.com/for-hosts/>. If you have integration questions, email <dave.jong@patchstack.com>.
