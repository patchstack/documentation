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

Patchstack publishes the Threat Intelligence API in two flavours — a stable v2 surface (**Extended**) and a forward-looking **Beta**. Each has a narrative **Guide** and an interactive **Reference** generated from its OpenAPI spec. Both specs use the same tooling for import, SDK generation, and LLM-assisted client writing — covered once in [Using the APIs with your tools](#using-the-apis-with-your-tools) below.

## Extended Threat Intelligence API

WordPress plugin, theme and core vulnerability intelligence: single-product lookups, bulk lookups (`POST /batch`, up to 50 products per request), the `/latest` rolling feed, advisory-by-id detail, and a per-item payload that includes `cvss_score`, `cve`, `is_exploited`, `patch_priority`, `patched_in_ranges`. Custom pricing, activated on request — [contact us](https://patchstack.com/for-hosts/).

- [Guide](/api-solutions/threat-intelligence-api/extended/) · [Reference](/api-reference/threat-intelligence-extended/) · [OpenAPI](/schemas/threat-intel-extended.yaml) · [Postman](/schemas/threat-intel-extended.postman_collection.json)

## Npm Dataset API (Beta)

A new generation of the API, currently available to **selected partners working directly with Patchstack**. Adds npm ecosystem coverage, an opt-in full advisory body (`?include=details`), a consistent nested response shape (`product`, `cvss`, `cwe`, `version_info`…), and cursor-based pagination alongside offset. If you're already working with us on an integration and would like access, [contact us](https://patchstack.com/for-hosts/).

- [Guide](/api-solutions/threat-intelligence-api/beta/) · [Reference](/api-reference/threat-intelligence-beta/) · [OpenAPI](/schemas/threat-intel-beta.yaml) · [Postman](/schemas/threat-intel-beta.postman_collection.json)

---

**New integration?** If you have Beta access, use Beta — it's the direction we're heading, and Extended will eventually adopt the same nested shape. Otherwise use Extended.

**Existing integration?** Extended remains the supported v2 tier; no migration is required. See [API properties](/api-solutions/threat-intelligence-api/api-properties/) for v2 field definitions. The legacy [Standard tier](/api-solutions/threat-intelligence-api/standard/) is no longer offered to new customers but remains documented for existing integrations — its endpoints are a strict subset of Extended.

---

## Using the APIs with your tools

Each tier ships the same set of artefacts — pick whichever URL matches the tier you're integrating:

| Tier | OpenAPI spec | Postman collection |
|---|---|---|
| Extended | [`threat-intel-extended.yaml`](/schemas/threat-intel-extended.yaml) | [`threat-intel-extended.postman_collection.json`](/schemas/threat-intel-extended.postman_collection.json) |
| Beta | [`threat-intel-beta.yaml`](/schemas/threat-intel-beta.yaml) | [`threat-intel-beta.postman_collection.json`](/schemas/threat-intel-beta.postman_collection.json) |
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
- **In your repo:** download the spec to `docs/vendor/patchstack-threat-intel-<tier>.yaml` and reference it from your `CLAUDE.md` / `AGENTS.md`. Your assistant can then grep the YAML for specific fields without refetching.
- **Plain-text fallback:** for tools that don't parse YAML, our [`llms-full.txt`](/llms-full.txt) contains the full reference as flat markdown.

### SDK generation

Generate a client in any language from the same spec — swap the spec URL for the tier you want:

```bash
# TypeScript (Extended tier shown)
npx @openapitools/openapi-generator-cli generate \
  -i https://docs.patchstack.com/schemas/threat-intel-extended.yaml \
  -g typescript-fetch -o ./patchstack-client

# Python
npx @openapitools/openapi-generator-cli generate \
  -i https://docs.patchstack.com/schemas/threat-intel-extended.yaml \
  -g python -o ./patchstack-client-py
```

Speakeasy and Fern also consume the same spec and produce more idiomatic SDKs if you need a polished client library.

> **Spec stability:** the Beta spec may change without a version bump while the API is in beta. Pin a commit of the YAML in production integrations, or wait for the GA release when we'll publish versioned URLs. Standard and Extended specs track the stable v2 surface.
