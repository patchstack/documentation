---
title: "Extended tier API"
excerpt: "WordPress vulnerability intelligence with bulk lookups, latest-24h feed, and advisory-by-id details."
hidden: false
metadata:
  image: []
  robots: "index"
createdAt: "Mon Jul 25 2022 09:29:10 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jun 15 2023 11:25:44 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 2
  label: "Guide"
---

_The Extended Threat Intelligence API is a superset of the [Standard tier](/api-solutions/threat-intelligence-api/standard/). Extended has **custom pricing and is activated on request** — [contact us](https://patchstack.com/for-hosts/)._

> **Interactive reference:** Every endpoint, parameter, request body and response shape is documented in the [Threat Intelligence API (Extended) reference](/api-reference/threat-intelligence-extended/).
>
> **Tooling (Postman, SDK, LLM):** spec URLs and import instructions for all three tiers live on [Overview → Using the APIs with your tools](/api-solutions/threat-intelligence-api/overview/#using-the-apis-with-your-tools).

This page covers the concepts you need to use the API effectively — authentication, rate limiting, errors, and code samples. Use it alongside the interactive reference.

## What Extended adds over Standard

| | Standard | Extended |
|---|---|---|
| Per-item payload | Flat, minimal | Flat, includes `description`, `vuln_type`, `cvss_score`, `cve`, `is_exploited`, `patch_priority`, `affected_in`, `patched_in_ranges` |
| `GET /product/{type}/{name}/{version}` | ✓ | ✓ |
| `GET /product/{type}/{name}/{version}/exists` | ✓ | ✓ |
| `GET /latest` — 20 most recent | — | ✓ |
| `POST /batch` — up to 50 products per request | — | ✓ |
| `GET /vulnerability/{id}` — advisory detail (CVSS vector, OWASP, references, credit) | — | ✓ |
| Rate limit | 5,000 / 24h | Custom, set per contract |

## Base URL

```
https://patchstack.com/database/api/v2/
```

## Authentication

Every request must include your API key in the **`PSKey`** HTTP request header. Extended access is activated on request — [contact us](https://patchstack.com/for-hosts/) to request a key.

```
PSKey: <your-api-key>
```

## Response format

All responses are JSON. Responses are cached until the Patchstack database updates, at which point the cache is cleared.

Extended returns a **flat** per-item shape with more fields than Standard — see the [API properties](/api-solutions/threat-intelligence-api/api-properties/) glossary for field definitions. `GET /vulnerability/{id}` returns a richer, differently-shaped payload documented in the [reference](/api-reference/threat-intelligence-extended/).

## Batch lookups

`POST /batch` accepts an array of up to 50 `{name, version, type, exists?}` items. The response is keyed by `product_slug`, not by array index — duplicate slugs in the request collapse. Per-item `exists: true` returns a boolean for that slug; `exists: false` (or omitted) returns the full advisory list.

## Rate limiting

Custom, set per contract. Contact <https://patchstack.com/for-hosts/> if you need a quota change.

## Errors

| Status | Meaning |
|---|---|
| `401 Unauthorized` | Missing or invalid `PSKey` header. |
| `403 Forbidden` | API key not authorised for the requested endpoint. |
| `404 Not Found` | Unknown product/version or vulnerability id. |
| `422 Unprocessable Entity` | Invalid request payload (e.g. batch with more than 50 items). |
| `429 Too Many Requests` | Rate limit exceeded. |
| `500` | Server error — please include the request id in any bug report. |

---

## Testing — curl one-liners

```bash
# Latest 20 vulnerabilities
curl 'https://patchstack.com/database/api/v2/latest' \
  -H 'PSKey: <your-api-key>'

# Full advisory list for a plugin version
curl 'https://patchstack.com/database/api/v2/product/plugin/tutor/1.5.2' \
  -H 'PSKey: <your-api-key>'

# Boolean-only exists check
curl 'https://patchstack.com/database/api/v2/product/plugin/tutor/1.5.2/exists' \
  -H 'PSKey: <your-api-key>'

# Batch — boolean-only across two products
curl -X POST 'https://patchstack.com/database/api/v2/batch' \
  -H 'PSKey: <your-api-key>' \
  -H 'Content-Type: application/json' \
  -d '[
    {"name":"easy-digital-downloads1","version":"1.0.0","type":"plugin","exists":true},
    {"name":"wordpress","version":"3.0.0","type":"wordpress","exists":true}
  ]'

# Advisory detail by id
curl 'https://patchstack.com/database/api/v2/vulnerability/4760' \
  -H 'PSKey: <your-api-key>'
```

## Batch walk (PHP)

```php
<?php

$apiKey = getenv('PATCHSTACK_KEY');
$components = [
    ['name' => 'easy-digital-downloads1', 'version' => '1.0.0', 'type' => 'plugin',    'exists' => false],
    ['name' => 'wordpress',               'version' => '3.0.0', 'type' => 'wordpress', 'exists' => true],
];

$ch = curl_init('https://patchstack.com/database/api/v2/batch');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_HTTPHEADER     => ['PSKey: '.$apiKey, 'Content-Type: application/json'],
    CURLOPT_POSTFIELDS     => json_encode($components),
]);
$response = json_decode(curl_exec($ch), true);
curl_close($ch);

foreach ($response['vulnerabilities'] as $slug => $result) {
    if (is_bool($result)) {
        echo "{$slug}: ".($result ? 'vulnerable' : 'clear').PHP_EOL;
    } else {
        echo "{$slug}: ".count($result)." advisor".(count($result) === 1 ? 'y' : 'ies').PHP_EOL;
    }
}
```

## More information

You can find more information about the Patchstack Threat Intelligence API on <https://patchstack.com/for-hosts/>. If you have integration questions, email <dave.jong@patchstack.com>.
