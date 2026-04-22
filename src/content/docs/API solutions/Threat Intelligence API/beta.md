---
title: "Beta tier API"
excerpt: "Beta vulnerability endpoints — npm support, Resource-based shape, offset and cursor pagination, include=details."
hidden: false
metadata:
  image: []
  robots: "index"
createdAt: "Tue Apr 21 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Apr 21 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
sidebar:
  label: "Guide"
---

_The Beta endpoints live alongside the v2 API and add npm coverage, an optional full advisory body, a consistent nested response shape, and cursor pagination. They are the recommended endpoints for new integrations; v2 remains available for backwards compatibility._

> **Interactive reference:** Every endpoint, parameter, request body and response shape is documented in the [Threat Intelligence API (Beta) reference](/api-reference/threat-intelligence-beta/).

This page covers the concepts you need to use the API effectively — authentication, platforms, pagination, rate limiting, and migration from v2. Use it alongside the interactive reference.

## Use with Postman, Insomnia, Bruno or Hoppscotch

We publish the API as an [OpenAPI 3.1 spec](https://docs.patchstack.com/schemas/threat-intel-beta.yaml) and a pre-built [Postman collection](https://docs.patchstack.com/schemas/threat-intel-beta.postman_collection.json). Every endpoint, parameter, request body and example is preconfigured — set your `PSKey` once and the whole collection authenticates.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/import?collection=https%3A%2F%2Fdocs.patchstack.com%2Fschemas%2Fthreat-intel-beta.postman_collection.json)

| Tool | How to import |
|---|---|
| **Postman** | Click the button above, or `File → Import → URL` and paste the collection URL. |
| **Insomnia** | `Create → Import From → URL` → paste the OpenAPI URL. |
| **Bruno** | `Collection → Import → OpenAPI V3 Spec` → paste the OpenAPI URL. |
| **Hoppscotch** | `Collections → Import/Export → OpenAPI` → paste the OpenAPI URL. |

**Authentication:** in Postman set the collection `Authorization` to **API Key**, key `PSKey`, value `{{PSKEY}}`, and add `PSKEY` as a collection variable with your real key as the **Current value** (leave Initial blank so it doesn't sync to teammates). Other tools work the same way — set `PSKey` as a collection header once.

## Use with Claude Code or other LLM coding assistants

Point your assistant at the spec. LLMs parse OpenAPI cleanly and will generate clients that match the real field names instead of hallucinating.

- **Ad hoc:** paste the spec URL into your prompt. Example: *"Write a Python client for `https://docs.patchstack.com/schemas/threat-intel-beta.yaml`. I need cursor-mode iteration over `/all` for npm."*
- **In your repo:** download the spec to `docs/vendor/patchstack-threat-intel-beta.yaml` and reference it from your `CLAUDE.md` / `AGENTS.md`. Your assistant can then grep the YAML for specific fields without refetching.
- **Plain-text fallback:** for tools that don't parse YAML, our [`llms-full.txt`](/llms-full.txt) contains the full reference as flat markdown.

## SDK generation

Generate a client in any language from the same spec:

```bash
# TypeScript
npx @openapitools/openapi-generator-cli generate \
  -i https://docs.patchstack.com/schemas/threat-intel-beta.yaml \
  -g typescript-fetch -o ./patchstack-client

# Python
npx @openapitools/openapi-generator-cli generate \
  -i https://docs.patchstack.com/schemas/threat-intel-beta.yaml \
  -g python -o ./patchstack-client-py
```

Speakeasy and Fern also consume the same spec and produce more idiomatic SDKs if you need a polished client library.

> **Spec stability:** the Beta spec may change without a version bump while the API is in beta. Pin a commit of the YAML in production integrations, or wait for the GA release when we'll publish versioned URLs.

## Base URL

```
https://vdp-api.patchstack.com/database/api/beta/
```

## Authentication

Every request must include your API key in the **`PSKey`** HTTP request header. You can request an API key by reaching out on <https://patchstack.com/for-hosts/>.

```
PSKey: <your-api-key>
```

## Platforms

Pass `?platform=npm` (or `?platform=wordpress` — the default) on list endpoints. Platform names are case-insensitive.

## Response format

All responses are JSON. Beta responses are cached until the database updates, at which point the cache is cleared. A single response shape is shared across all three list endpoints (`/all`, `/latest`, `/product/npm/...`) so clients can parse them interchangeably.

## Pagination

`/all` and `/latest` support **two independent pagination strategies**. Use whichever fits your client:

- **Offset (`?page=&per_page=`)** — returns a `pagination` block with totals, `has_next_page`, `has_previous_page`, etc. Easy to jump to a specific page; slower at depth and susceptible to row-shift when new vulnerabilities land while you're paging.
- **Cursor (`?cursor=`)** — returns a `cursor` block with `next_cursor`, `has_more`, `per_page`. Stable under concurrent inserts and faster at any depth. No `total` count (deliberately skipped to keep cursor mode fast).

`cursor` and `page` are mutually exclusive; passing both returns `422 Unprocessable Entity`. To bootstrap cursor mode, send `?cursor=` with an empty value.

## Including full advisory bodies

Pass `?include=details` on any list endpoint to add an `advisory_details` markdown field to each item. Applies to npm results.

## Scoped npm packages

npm package slugs that include a `/` (e.g. `@scope/pkg`) conflict with the route separator. URL-encode the `/` as `%2F` or contact us for guidance on the encoding helper.

## Rate limiting

Same policy as the Extended Threat Intelligence API — please contact <https://patchstack.com/for-hosts/> if you need an elevated quota.

## Errors

| Status | Meaning |
|---|---|
| `401 Unauthorized` | Missing or invalid `PSKey` header. |
| `403 Forbidden` | API key not authorised for the requested endpoint. |
| `422 Unprocessable Entity` | Invalid parameter combination (e.g. `cursor` + `page`), invalid `platform`, or `per_page > 500`. |
| `429 Too Many Requests` | Rate limit exceeded. |
| `500` | Server error — please include the request id in any bug report. |

When a cursor is malformed (invalid base64 or missing the `v1:` prefix), the endpoint returns `200` with an empty page:

```json
{
  "vulnerabilities": [],
  "cursor": { "next_cursor": null, "has_more": false, "per_page": 100 }
}
```

---

## Testing

### curl — one-liners

```bash
# Latest 24h, npm
curl 'https://patchstack.com/database/api/beta/latest?platform=npm&per_page=10' \
  -H 'PSKey: <your-api-key>'

# Cursor pagination walk (bootstrap + follow)
curl 'https://patchstack.com/database/api/beta/all?platform=npm&per_page=50&cursor=' \
  -H 'PSKey: <your-api-key>'

# Check a specific npm package/version with full advisory text
curl 'https://patchstack.com/database/api/beta/product/npm/axios/0.21.4?include=details' \
  -H 'PSKey: <your-api-key>'

# Boolean-only exists check
curl 'https://patchstack.com/database/api/beta/product/npm/axios/0.21.4/exists' \
  -H 'PSKey: <your-api-key>'
```

### Postman / Insomnia / Bruno / Hoppscotch

Import the OpenAPI spec directly from [`threat-intel-beta.yaml`](https://docs.patchstack.com/schemas/threat-intel-beta.yaml) — authentication, parameters and example payloads are preconfigured. Set the `PSKey` security value to your API key once and every request in the collection will use it.

### Cursor iteration (JavaScript / Node)

```javascript
async function* allVulnerabilities(apiKey, platform = 'npm', perPage = 100) {
  const base = 'https://patchstack.com/database/api/beta/all';
  let cursor = '';            // empty = bootstrap cursor mode

  while (true) {
    const url = `${base}?platform=${platform}&per_page=${perPage}&cursor=${encodeURIComponent(cursor)}`;
    const res = await fetch(url, { headers: { PSKey: apiKey } }).then(r => r.json());

    for (const vuln of res.vulnerabilities) {
      yield vuln;
    }

    if (!res.cursor.has_more) return;
    cursor = res.cursor.next_cursor;
  }
}

// usage
for await (const vuln of allVulnerabilities(process.env.PATCHSTACK_KEY)) {
  console.log(vuln.id, vuln.title);
}
```

### Cursor iteration (PHP)

```php
<?php

$apiKey = getenv('PATCHSTACK_KEY');
$cursor = '';

do {
    $url = 'https://patchstack.com/database/api/beta/all'
        .'?platform=npm&per_page=100&cursor='.urlencode($cursor);

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => ['PSKey: '.$apiKey, 'Accept: application/json'],
    ]);
    $response = json_decode(curl_exec($ch), true);
    curl_close($ch);

    foreach ($response['vulnerabilities'] as $vuln) {
        // handle $vuln
    }

    $cursor = $response['cursor']['next_cursor'] ?? null;
} while ($response['cursor']['has_more'] ?? false);
```

---

## Migration notes (v2 → beta)

- Beta npm responses use **nested objects** (`product`, `cvss`, `cwe`, `capec`, `version_info`) whereas the v2 shape is flat. Update parsers accordingly.
- `ghsa_id` was renamed to `ghsa` at the top level.
- `direct_url` was renamed to `url` (the npm-flavoured shape exposes a single URL only).
- The `description` field was dropped for npm (the title already includes it).
- The response body always contains a `vulnerabilities` array, plus either `pagination` (offset mode) or `cursor` (cursor mode).

## More information

You can find more information about the Patchstack Threat Intelligence API on <https://patchstack.com/for-hosts/>. If you have integration questions, email <dave.jong@patchstack.com>.
