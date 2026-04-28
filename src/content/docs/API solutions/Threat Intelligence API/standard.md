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

_The Standard Threat Intelligence API is **no longer offered to new customers**. New integrations should use the [Threat Intelligence API](/api-solutions/threat-intelligence-api/extended/), which is a strict superset — every endpoint and field documented here is available there. This page is preserved for existing Standard integrations._

> **Interactive reference:** Every endpoint, parameter and response shape is documented in the [Threat Intelligence API (Standard) reference](/api-reference/threat-intelligence-standard/).
>
> **Tooling (Postman, SDK, LLM):** spec URLs and import instructions for all three tiers live on [Overview → Using the APIs with your tools](/api-solutions/threat-intelligence-api/overview/#using-the-apis-with-your-tools).

This page covers the concepts you need to use the API effectively — authentication, rate limiting, errors, and code samples. Use it alongside the interactive reference.

## Base URL

```
https://patchstack.com/database/api/v2/
```

## Authentication

Every request must include your API key in the **`PSKey`** HTTP request header. Standard keys remain valid for existing customers. New keys are not issued — [contact us](https://patchstack.com/for-hosts/) about Extended.

```
PSKey: <your-api-key>
```

## Response format

All responses are JSON. Responses are cached until the Patchstack database updates, at which point the cache is cleared.

The Standard tier returns a **flat** per-item shape. For the richer shape with `description`, `vuln_type`, `cvss_score`, `cve`, and `patched_in_ranges`, use the [Extended tier](/api-solutions/threat-intelligence-api/extended/). Field definitions live in [API properties](/api-solutions/threat-intelligence-api/api-properties/).

## Rate limiting

Standard is limited to **5,000 requests per 24 hours**. Contact <https://patchstack.com/for-hosts/> to move to Extended for a higher quota and additional endpoints.

## Errors

| Status | Meaning |
|---|---|
| `401 Unauthorized` | Missing or invalid `PSKey` header. |
| `403 Forbidden` | API key not authorised for the requested endpoint. |
| `404 Not Found` | Unknown product/version combination. |
| `429 Too Many Requests` | Rate limit exceeded. |
| `500` | Server error — please include the request id in any bug report. |

---

## Testing — curl one-liners

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

## More information

You can find more information about the Patchstack Threat Intelligence API on <https://patchstack.com/for-hosts/>. If you have integration questions, email <dave.jong@patchstack.com>.
