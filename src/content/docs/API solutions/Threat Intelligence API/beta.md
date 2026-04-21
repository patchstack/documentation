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
  order: 4
  label: "Beta tier API"
---

_The Beta endpoints live alongside the v2 API and add npm coverage, an optional full advisory body, a consistent nested response shape, and cursor pagination. They are the recommended endpoints for new integrations; v2 remains available for backwards compatibility._

## API Usage

### Base URL

```
https://patchstack.com/database/api/beta/
```

### Authentication

Every request must include your API key in the **`PSKey`** HTTP request header. You can request an API key by reaching out on <https://patchstack.com/for-hosts/>.

```
PSKey: <your-api-key>
```

### Response format

All responses are JSON. Beta responses are cached until the database updates, at which point the cache is cleared. A single response shape is shared across all three list endpoints (`/all`, `/latest`, `/product/npm/...`) so clients can parse them interchangeably.

### Platforms

Pass `?platform=npm` (or `?platform=wordpress` — the default) on list endpoints. Platform names are case-insensitive.

### Rate limiting

Same policy as the Extended Threat Intelligence API — please contact <https://patchstack.com/for-hosts/> if you need an elevated quota.

---

## Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/database/api/beta/all` | Paginated listing of every published vulnerability for a platform |
| `GET` | `/database/api/beta/latest` | Vulnerabilities added in the last 24 hours |
| `GET` | `/database/api/beta/product/{type}/{name}/{version}` | Match a single product/version (npm & WordPress family) |
| `GET` | `/database/api/beta/product/{type}/{name}/{version}/exists` | Boolean-only variant of the above |
| `POST` | `/database/api/beta/batch` | Check up to 50 products in a single request |

---

## List all vulnerabilities

**Description:** Paginated listing of every published vulnerability for the given platform, ordered by descending `id`.
**Endpoint:** `/database/api/beta/all`
**Method:** `GET`

### Query parameters

| Name | Type | Default | Description |
|---|---|---|---|
| `platform` | string | `wordpress` | `npm` or `wordpress`. Case-insensitive. |
| `page` | integer | `1` | Offset-pagination page (1-indexed). |
| `per_page` | integer | `100` | Page size, max `500`. |
| `cursor` | string | — | Opaque cursor (see below). Presence of the param switches to cursor mode. |
| `include` | string | — | Pass `details` to include the full advisory body in each item. |

### Pagination modes

`/all` supports **two independent pagination strategies**. Use whichever fits your client:

- **Offset (`?page=&per_page=`)** — returns a `pagination` block with totals, `has_next_page`, `has_previous_page`, etc. Easy to jump to a specific page; slower at depth and susceptible to row-shift when new vulnerabilities land while you're paging.
- **Cursor (`?cursor=`)** — returns a `cursor` block with `next_cursor`, `has_more`, `per_page`. Stable under concurrent inserts and faster at any depth. No `total` count (deliberately skipped to keep cursor mode fast).

`cursor` and `page` are mutually exclusive; passing both returns `422 Unprocessable Entity`.

### Example — offset mode

```bash
curl 'https://patchstack.com/database/api/beta/all?platform=npm&page=1&per_page=25' \
  -H 'PSKey: <your-api-key>'
```

Response:

```json
{
  "vulnerabilities": [ /* 25 items */ ],
  "pagination": {
    "current_page": 1,
    "per_page": 25,
    "total": 6115,
    "total_pages": 245,
    "has_next_page": true,
    "has_previous_page": false,
    "next_page": 2,
    "previous_page": null,
    "from": 1,
    "to": 25
  }
}
```

### Example — cursor mode

First page — send `cursor=` with an empty value to bootstrap:

```bash
curl 'https://patchstack.com/database/api/beta/all?platform=npm&per_page=25&cursor=' \
  -H 'PSKey: <your-api-key>'
```

Response:

```json
{
  "vulnerabilities": [ /* 25 items */ ],
  "cursor": {
    "next_cursor": "djE6NDYzMzk",
    "has_more": true,
    "per_page": 25
  }
}
```

Follow `next_cursor` on the next request:

```bash
curl 'https://patchstack.com/database/api/beta/all?platform=npm&per_page=25&cursor=djE6NDYzMzk' \
  -H 'PSKey: <your-api-key>'
```

Stop when `has_more: false` and `next_cursor: null`.

### Example — with full advisory body

```bash
curl 'https://patchstack.com/database/api/beta/all?platform=npm&per_page=25&include=details' \
  -H 'PSKey: <your-api-key>'
```

Adds an `advisory_details` field (markdown) to every item.

---

## Latest (last 24 hours)

**Description:** Returns vulnerabilities whose row was inserted into the Patchstack database in the last 24 hours. The filter is on `created_at` (insertion time), **not** `disclosure_date`.
**Endpoint:** `/database/api/beta/latest`
**Method:** `GET`

Accepts the **same query parameters** as `/all` — `platform`, `page`, `per_page`, `cursor`, `include`.

```bash
curl 'https://patchstack.com/database/api/beta/latest?platform=npm&per_page=50' \
  -H 'PSKey: <your-api-key>'
```

Cursor pagination works identically:

```bash
curl 'https://patchstack.com/database/api/beta/latest?platform=npm&per_page=50&cursor=' \
  -H 'PSKey: <your-api-key>'
```

---

## Find vulnerability for a product

**Description:** Match a specific product + version against the vulnerability database and return every applicable advisory.
**Endpoint:** `/database/api/beta/product/{type}/{name}/{version}/{exists?}`
**Method:** `GET`

| Path param | Description |
|---|---|
| `type` | `npm`, `plugin`, `theme`, or `wordpress`. |
| `name` | npm package slug or WordPress plugin/theme slug. Use `wordpress` when `type=wordpress`. |
| `version` | Concrete version (e.g. `0.21.4`) or `*` to return every advisory for the product. |
| `exists` | Optional. Pass the literal string `exists` to get a boolean response only. |

### Query parameters

| Name | Type | Description |
|---|---|---|
| `include` | string | Pass `details` to include the full advisory body (`advisory_details`) per item. Applies only to npm. |

### Example — npm, concrete version

```bash
curl 'https://patchstack.com/database/api/beta/product/npm/axios/0.21.4?include=details' \
  -H 'PSKey: <your-api-key>'
```

### Example — npm, wildcard version (all advisories for the package)

```bash
curl 'https://patchstack.com/database/api/beta/product/npm/axios/*' \
  -H 'PSKey: <your-api-key>'
```

### Example — boolean exists check

```bash
curl 'https://patchstack.com/database/api/beta/product/npm/axios/0.21.4/exists' \
  -H 'PSKey: <your-api-key>'
```

Response:

```json
{ "vulnerable": true }
```

### Note on scoped npm packages

npm package slugs that include a `/` (e.g. `@scope/pkg`) conflict with the route separator. URL-encode the `/` as `%2F` or contact us for guidance on the encoding helper.

---

## Bulk product check

**Description:** Check up to 50 products in a single request. Mirrors the format documented for the Extended tier's `/batch` endpoint.
**Endpoint:** `/database/api/beta/batch`
**Method:** `POST`
**Payload:** Raw JSON array, ≤ 50 objects.

```bash
curl -X POST 'https://patchstack.com/database/api/beta/batch' \
  -H 'PSKey: <your-api-key>' \
  -H 'Content-Type: application/json' \
  -d '[
    { "type": "npm",     "name": "axios",   "version": "0.21.4", "exists": false },
    { "type": "plugin",  "name": "tutor",   "version": "1.5.2",  "exists": true  },
    { "type": "wordpress","name":"wordpress","version": "6.0.0", "exists": true  }
  ]'
```

---

## Response shape (npm)

The three list endpoints (`/all`, `/latest`, `/product/npm/...`) share the same per-item shape when `platform=npm`. `advisory_details` is only present when `?include=details` was passed.

```json
{
  "id": 46500,
  "title": "NPM: OpenClaw: ...",
  "disclosed_at": "2026-04-03T03:15:56+00:00",
  "created_at": "2026-04-21T08:38:34+00:00",
  "url": "https://patchstack.com/database/npm/npm/openclaw/vulnerability/...",
  "vuln_type": "Other Vulnerability Type",
  "cve": "2026-41331",
  "is_exploited": false,
  "patch_priority": 2,
  "advisory_details": "## Summary\n...",
  "product": {
    "id": 23595,
    "name": "openclaw",
    "slug": "openclaw"
  },
  "cvss": {
    "score": 6.9,
    "vector": "CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:N/VI:N/VA:L/SC:N/SI:N/SA:N"
  },
  "cwe": {
    "id": 770,
    "name": "Allocation of Resources Without Limits or Throttling"
  },
  "capec": {
    "id": null,
    "name": null
  },
  "references": [
    "https://github.com/openclaw/openclaw/security/advisories/GHSA-m6fx-m8hc-572m",
    "https://github.com/openclaw/openclaw/releases/tag/v2026.3.31"
  ],
  "ghsa": "GHSA-m6fx-m8hc-572m",
  "version_info": {
    "affected": "<= 2026.3.28",
    "fixed": "2026.3.31",
    "patched_ranges": []
  }
}
```

### Field reference

| Field | Type | Description |
|---|---|---|
| `id` | integer | Stable Patchstack vulnerability id. |
| `title` | string | Human-readable title (prefixed with `NPM:` for npm advisories). |
| `disclosed_at` | ISO-8601 | When the vulnerability was publicly disclosed. |
| `created_at` | ISO-8601 | When the row was inserted into the Patchstack DB. Drives `/latest` windowing. |
| `url` | string | Public Patchstack vulnerability page (token-tagged). |
| `vuln_type` | string | High-level vulnerability category. |
| `cve` | string | First CVE identifier, or `""` when none is assigned. |
| `is_exploited` | boolean | Whether exploitation has been observed in the wild. |
| `patch_priority` | integer | 1 (low) to 3 (high). |
| `advisory_details` | string \| absent | Full advisory body. Only present with `?include=details`. |
| `product.{id,name,slug}` | object | The affected package/product. |
| `cvss.{score,vector}` | object | CVSS score and vector (may be `null`). |
| `cwe.{id,name}` | object | CWE classification (may be `null`). |
| `capec.{id,name}` | object | CAPEC classification (may be `null`). |
| `references` | string[] | External reference URLs (advisories, commits, tags). |
| `ghsa` | string | GHSA identifier when the advisory came from the GitHub Advisory Database. |
| `version_info.affected` | string | Affected version range (e.g. `<= 2026.3.28`). |
| `version_info.fixed` | string | First fixed version. |
| `version_info.patched_ranges` | array | Structured list of `{from_version, to_version, fixed_in}` entries for advisories with multiple patch ranges. |

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

### Postman

1. Create a new request, set the method, paste the URL.
2. Under **Headers**, add:
   - Key: `PSKey`
   - Value: your API key
3. Under **Headers**, add (recommended):
   - Key: `Accept`
   - Value: `application/json`
4. For `POST /batch`, set the body to **raw → JSON** and paste the array payload.

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

## Migration notes (v2 → beta)

- Beta npm responses use **nested objects** (`product`, `cvss`, `cwe`, `capec`, `version_info`) whereas the v2 shape is flat. Update parsers accordingly.
- `ghsa_id` was renamed to `ghsa` at the top level.
- `direct_url` was renamed to `url` (the npm-flavoured shape exposes a single URL only).
- The `description` field was dropped for npm (the title already includes it).
- The response body always contains a `vulnerabilities` array, plus either `pagination` (offset mode) or `cursor` (cursor mode).

## More information

You can find more information about the Patchstack Threat Intelligence API on <https://patchstack.com/for-hosts/>. If you have integration questions, email <dave.jong@patchstack.com>.
