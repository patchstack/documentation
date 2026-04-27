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

The Patchstack Threat Intelligence API exposes our vulnerability database for WordPress plugins, themes and core. It supports single-product lookups, bulk lookups (`POST /batch`, up to 50 products per request), the `/latest` rolling feed, advisory-by-id detail, and a per-item payload that includes `cvss_score`, `cve`, `is_exploited`, `patch_priority`, and `patched_in_ranges`.

Custom pricing, activated on request — [contact us](https://patchstack.com/for-hosts/).

- [Guide](/api-solutions/threat-intelligence-api/extended/) · [Reference (WordPress)](/api-reference/threat-intelligence-extended/) · [OpenAPI](/schemas/threat-intel-extended.yaml) · [Postman](/schemas/threat-intel-extended.postman_collection.json) · [API properties](/api-solutions/threat-intelligence-api/api-properties/)

## NPM (Beta)

For partners covering JavaScript components, the API has an **NPM (Beta)** flavour available to **selected partners working directly with Patchstack**. It lives at a separate base URL, ships its own OpenAPI spec, and is documented in the sidebar under **Reference → NPM (Beta)**.

The npm flavour is the direction the API is heading — the stable WordPress surface will eventually adopt the same response shape. Beyond npm coverage itself, it adds:

- **A nested response shape** (`product`, `cvss`, `cwe`, `version_info`…) instead of the v2 flat shape
- **`/all`** — cursor-paginated full listing
- **`?include=details`** — opt-in full advisory body on list endpoints
- **Cursor pagination** alongside offset on `/all` and `/latest`

If you're already working with us on an integration and would like access, [contact us](https://patchstack.com/for-hosts/). Integration notes live in the [NPM (Beta) integration guide](/api-solutions/threat-intelligence-api/beta/) — base URL, platforms, pagination, errors, and v2 → beta migration.

- [Reference (NPM)](/api-reference/threat-intelligence-beta/) · [OpenAPI](/schemas/threat-intel-beta.yaml) · [Postman](/schemas/threat-intel-beta.postman_collection.json)

---

The legacy [Standard tier](/api-solutions/threat-intelligence-api/standard/) is no longer offered to new customers but remains documented for existing integrations — its endpoints are a strict subset of the current API.

---

## Using the API with your tools

The API ships with an OpenAPI spec and a generated Postman collection. Beta has its own spec — pick whichever you're integrating against:

| | OpenAPI spec | Postman collection |
|---|---|---|
| Threat Intelligence API | [`threat-intel-extended.yaml`](/schemas/threat-intel-extended.yaml) | [`threat-intel-extended.postman_collection.json`](/schemas/threat-intel-extended.postman_collection.json) |
| NPM (Beta) | [`threat-intel-beta.yaml`](/schemas/threat-intel-beta.yaml) | [`threat-intel-beta.postman_collection.json`](/schemas/threat-intel-beta.postman_collection.json) |
| Standard *(legacy)* | [`threat-intel-standard.yaml`](/schemas/threat-intel-standard.yaml) | [`threat-intel-standard.postman_collection.json`](/schemas/threat-intel-standard.postman_collection.json) |

### Postman, Insomnia, Bruno or Hoppscotch

Every endpoint, parameter, request body and example is preconfigured. Download the Postman collection and drag it into your tool, or import by URL from inside the tool:

| Tool | How to import |
|---|---|
| **Postman** | `File → Import → Link` and paste the collection URL. |
| **Insomnia** | `Create → Import From → URL` → paste the OpenAPI URL. |
| **Bruno** | `Collection → Import → OpenAPI V3 Spec` → paste the OpenAPI URL. |
| **Hoppscotch** | `Collections → Import/Export → OpenAPI` → paste the OpenAPI URL. |

**Authentication:** in Postman set the collection `Authorization` to **API Key**, key `PSKey`, value `{{PSKEY}}`, and add `PSKEY` as a collection variable with your real key as the **Current value** (leave Initial blank so it doesn't sync to teammates). Other tools work the same way — set `PSKey` as a collection header once.

### Claude Code and other LLM coding assistants

Point your assistant at the spec. LLMs parse OpenAPI cleanly and will generate clients that match the real field names instead of hallucinating.

- **Ad hoc:** paste the spec URL into your prompt. Example: *"Write a Python client for `https://docs.patchstack.com/schemas/threat-intel-extended.yaml`. I need a batch walker over a `package.json`-style list."*
- **In your repo:** download the spec to `docs/vendor/patchstack-threat-intel.yaml` and reference it from your `CLAUDE.md` / `AGENTS.md`. Your assistant can then grep the YAML for specific fields without refetching.
- **Plain-text fallback:** for tools that don't parse YAML, our [`llms-full.txt`](/llms-full.txt) contains the full reference as flat markdown.

### SDK generation

Generate a client in any language from the spec:

```bash
# TypeScript
npx @openapitools/openapi-generator-cli generate \
  -i https://docs.patchstack.com/schemas/threat-intel-extended.yaml \
  -g typescript-fetch -o ./patchstack-client

# Python
npx @openapitools/openapi-generator-cli generate \
  -i https://docs.patchstack.com/schemas/threat-intel-extended.yaml \
  -g python -o ./patchstack-client-py
```

Speakeasy and Fern also consume the same spec and produce more idiomatic SDKs if you need a polished client library.

> **Spec stability:** the Beta spec may change without a version bump while the API is in beta. Pin a commit of the YAML in production integrations, or wait for the GA release when we'll publish versioned URLs. The stable spec tracks the v2 surface.
