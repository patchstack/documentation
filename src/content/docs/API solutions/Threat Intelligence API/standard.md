---
title: "Standard tier API"
excerpt: ""
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Jul 25 2022 09:28:24 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed May 10 2023 12:26:10 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 1
---

_If you’re looking for an API that has a complete data coverage and could be used commercially, please look at the Extended Threat Intelligence API <a href="https://patchstack.com/for-hosts" target="_blank">here</a>._

## API Usage

The Standard Threat Intelligence API is limited to 5000 requests per 24 hours.

The base URL of the API is <https://patchstack.com/database/api/v2/>

All responses are in JSON format. For performance reasons, responses are cached until we update the database after which the appropriate caches are cleared.

An API key is required. This API key should be present in the _PSKey_ HTTP request header. You can request an API key by logging into your Patchstack App account and then by going to the Upgrades page <https://app.patchstack.com/billing/subscription>.

Explanation of the API response properties can be found here [here](/api-solutions/threat-intelligence-api/api-properties/).

## Find Vulnerability

**Description:** Retrieve vulnerabilities of a specific plugin, theme or WordPress core version.  
**Endpoint:** /product/TYPE/NAME/VERSION/EXISTS?  
**Method:** GET

**TYPE** = theme, plugin, wordpress  
**NAME** = Slug of the theme, slug of the plugin, or “wordpress” in case TYPE is set to wordpress  
**VERSION** = Version to check for vulnerabilities  
**EXISTS** = Optional flag that will not return all vulnerabilities but only a boolean response whether or not there are vulnerabilities. This flag being present results in a faster response.

Example response (<https://patchstack.com/database/api/v2/product/plugin/tutor/1.5.2>):

```json
{
    "vulnerabilities": [
				{
            "id": 4253,
            "title": "WordPress Tutor LMS plugin <= 1.5.2 - Cross-Site Request Forgery (CSRF) vulnerability",
            "disclosed_at": "2020-02-04T00:00:00+00:00",
            "created_at": "2022-05-27T10:23:01+00:00",
            "product_slug": "tutor",
            "product_name": "Tutor LMS",
            "product_name_premium": null,
            "product_type": "Plugin",
            "fixed_in": "1.5.3",
            "direct_url": "https://patchstack.com/database/vulnerability/tutor/wordpress-tutor-lms-plugin-1-5-2-cross-site-request-forgery-csrf-vulnerability"
        },
        {
            "id": 4386,
            "title": "WordPress Tutor LMS plugin <= 1.7.6 - Multiple Blind/Time-based SQL Injection (SQLi) vulnerabilities",
            "disclosed_at": "2021-03-15T00:00:00+00:00",
            "created_at": "2022-05-27T10:23:01+00:00",
            "product_slug": "tutor",
            "product_name": "Tutor LMS",
            "product_name_premium": null,
            "product_type": "Plugin",
            "fixed_in": "1.7.7",
            "direct_url": "https://patchstack.com/database/vulnerability/tutor/wordpress-tutor-lms-plugin-1-7-6-multiple-blind-time-based-sql-injection-sqli-vulnerabilities"
        }
    ]
}
```

Example response (<https://patchstack.com/database/api/v2/product/plugin/tutor/1.5.2/exists>):

```json
{
	"vulnerable": true
}
```
