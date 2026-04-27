---
title: "Beta additions"
excerpt: "What the Beta surface adds on top of the Threat Intelligence API — the /all endpoint, npm coverage, cursor pagination, ?include=details, and the nested response shape."
hidden: false
metadata:
  image: []
  robots: "index"
createdAt: "Tue Apr 21 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Apr 22 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 4
  label: "Beta additions"
  badge:
    text: "Beta"
    variant: "tip"
---

_The Beta surface extends the Threat Intelligence API ahead of GA. It runs at a separate base URL, ships its own OpenAPI spec, and is available to **selected partners working directly with Patchstack**. The shared endpoints (`/latest`, `/product/{type}/{name}/{version}`, `/product/{type}/{name}/{version}/exists`, `/batch`) behave the same as the stable API but accept extra parameters and return a nested response shape. This page documents only what's new — for the full spec including npm-flavour examples, see the [auto-generated reference](/api-reference/threat-intelligence-beta/). [Contact us](https://patchstack.com/for-hosts/) if you'd like access._

## Base URL

```
https://vdp-api.patchstack.com/database/api/beta/
```

## What's new

| Addition | Where it applies |
|---|---|
| `GET /all` | New endpoint — cursor-paginated full listing of every advisory, scoped by `?platform=`. |
| `?platform=npm` | List endpoints (`/all`, `/latest`, `/product/...`). Default is `wordpress`; case-insensitive. |
| `?cursor=` | `/all` and `/latest` — cursor pagination alongside the existing `?page=&per_page=`. |
| `?include=details` | List endpoints — adds an `advisory_details` markdown field to each item (npm). |
| Nested response shape | All list endpoints — `product`, `cvss`, `cwe`, `version_info` objects in place of the v2 flat shape. |

> **Spec stability:** the Beta spec may change without a version bump while the API is in beta. Pin a commit of the YAML in production integrations, or wait for the GA release when versioned URLs ship.

## Pagination

`/all` and `/latest` support **two independent strategies**. Use whichever fits your client:

- **Offset (`?page=&per_page=`)** — returns a `pagination` block with totals, `has_next_page`, `has_previous_page`, etc. Easy to jump to a specific page; slower at depth and susceptible to row-shift when new advisories land while you're paging.
- **Cursor (`?cursor=`)** — returns a `cursor` block with `next_cursor`, `has_more`, `per_page`. Stable under concurrent inserts and faster at any depth. No `total` count (deliberately skipped to keep cursor mode fast).

`cursor` and `page` are mutually exclusive; passing both returns `422 Unprocessable Entity`. To bootstrap cursor mode, send `?cursor=` with an empty value.

When a cursor is malformed (invalid base64 or missing the `v1:` prefix), the endpoint returns `200` with an empty page:

```json
{
  "vulnerabilities": [],
  "cursor": { "next_cursor": null, "has_more": false, "per_page": 100 }
}
```

## Scoped npm packages

npm package slugs that include a `/` (e.g. `@scope/pkg`) conflict with the route separator. URL-encode the `/` as `%2F` or contact us for guidance on the encoding helper.

## Errors

In addition to the [stable error codes](/api-solutions/threat-intelligence-api/extended/#errors), Beta returns:

| Status | Meaning |
|---|---|
| `422 Unprocessable Entity` | Invalid parameter combination (e.g. `cursor` + `page`), invalid `platform`, or `per_page > 500`. |

## Migration notes (stable v2 → beta)

- Beta npm responses use **nested objects** (`product`, `cvss`, `cwe`, `capec`, `version_info`) whereas the v2 shape is flat. Update parsers accordingly.
- `ghsa_id` was renamed to `ghsa` at the top level.
- `direct_url` was renamed to `url` (the npm-flavoured shape exposes a single URL only).
- The `description` field was dropped for npm (the title already includes it).
- The response body always contains a `vulnerabilities` array, plus either `pagination` (offset mode) or `cursor` (cursor mode).

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

## More information

You can find more information about the Patchstack Threat Intelligence API on <https://patchstack.com/for-hosts/>. If you have integration questions, email <dave.jong@patchstack.com>.
