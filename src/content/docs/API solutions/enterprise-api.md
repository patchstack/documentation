---
title: "Enterprise API"

excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Jul 25 2022 09:29:10 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jun 15 2023 11:25:44 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 2
---

_The purpose of this document is to provide information about the API functionality of the Patchstack vulnerability database._

## API Usage

### Information

The base URL of the API is <https://patchstack.com/database/api/v2>

All responses are in the JSON format. For performance reasons, responses are cached until we update the database after which the appropriate caches are cleared.

You can request an API key by reaching out to us on this page. <https://patchstack.com/threat-intel-feed/>

### Latest Vulnerabilities

**Description:** Retrieve the latest 20 vulnerabilities which have been added to the database.  
**Endpoint:** /latest  
**Method:** GET

**Example Response (Trimmed)** <https://patchstack.com/database/api/v2/latest>

```json
{
    "vulnerabilities": [
        {
            "id": 7976,
            "product_id": 2175,
            "title": "WordPress File Upload plugin <= 4.16.2 - Contributor+ Path Traversal vulnerability leading to Remote Code Execution (RCE)",
            "description": "Contributor+ Path Traversal vulnerability leading to Remote Code Execution (RCE) discovered by apple502j in WordPress File Upload plugin (versions <= 4.16.2).",
            "disclosure_date": "2022-03-01 00:00:00",
            "disclosed_at": "2022-03-01T00:00:00+00:00",
            "created_at": "2022-03-07T11:17:05+00:00",
            "url": "wordpress-file-upload-plugin-4-16-2-contributor-path-traversal-vulnerability-leading-to-remote-code-execution-rce",
            "product_slug": "wp-file-upload",
            "product_name": "WordPress File Upload",
            "product_name_premium": null,
            "product_type": "Plugin",
            "vuln_type": "Directory Traversal",
            "cvss_score": 8.8,
            "cve": [
                "2021-24962"
            ],
            "is_exploited": false,
            "patch_priority": 3,
            "affected_in": "<= 4.16.2",
            "fixed_in": "4.16.3",
            "patched_in_ranges": [],
            "direct_url": "https://patchstack.com/database/vulnerability/wp-file-upload/wordpress-file-upload-plugin-4-16-2-contributor-path-traversal-vulnerability-leading-to-remote-code-execution-rce"
        },
        {
            "id": 7957,
            "product_id": 3808,
            "title": "WordPress All in One Invite Codes plugin <= 1.0.12 - Sensitive Information Disclosure vulnerability",
            "description": "Sensitive Information Disclosure vulnerability discovered in WordPress All in One Invite Codes plugin (versions <= 1.0.12).",
            "disclosure_date": "2022-02-28 00:00:00",
            "disclosed_at": "2022-02-28T00:00:00+00:00",
            "created_at": "2022-03-03T13:25:05+00:00",
            "url": "wordpress-all-in-one-invite-codes-plugin-1012-sensitive-information-disclosure-vulnerability",
            "product_slug": "all-in-one-invite-codes",
            "product_name": "All in One Invite Codes",
            "product_name_premium": null,
            "product_type": "Plugin",
            "vuln_type": "Information Disclosure",
            "cvss_score": 4.3,
            "cve": [],
            "is_exploited": false,
            "patch_priority": 1,
            "affected_in": "<= 1.0.12",
            "fixed_in": "",
            "patched_in_ranges": [],
            "direct_url": "https://patchstack.com/database/vulnerability/all-in-one-invite-codes/wordpress-all-in-one-invite-codes-plugin-1012-sensitive-information-disclosure-vulnerability"
        }
    ]
}
```

### Find Vulnerability

**Description:** Retrieve vulnerabilities of a specific plugin, theme or WordPress core version.  
**Endpoint:** /product/TYPE/NAME/VERSION/EXISTS?  
**Method:** GET

**TYPE** = theme, plugin, wordpress  
**NAME** = Slug of the theme, slug of the plugin, or “wordpress” in case TYPE is set to wordpress  
**VERSION** = Version to check for vulnerabilities  
**EXISTS** = Optional flag that will not return all vulnerabilities but only a boolean response whether or not there are vulnerabilities. This flag being present results in a faster response.

**Example Response** <https://patchstack.com/database/api/v2/product/plugin/tutor/1.5.2>    

```json
{
    "vulnerabilities": [
        {
            "id": 4253,
            "product_id": 2642,
            "title": "WordPress Tutor LMS plugin <= 1.5.2 - Cross-Site Request Forgery (CSRF) vulnerability",
            "description": "Cross-Site Request Forgery (CSRF) vulnerability found by Jinson Varghese Behanan in WordPress Tutor LMS plugin (versions <= 1.5.2).",
            "disclosure_date": "2020-02-04 00:00:00",
            "disclosed_at": "2020-02-04T00:00:00+00:00",
            "created_at": "2021-01-08T13:50:05+00:00",
            "url": "wordpress-tutor-lms-plugin-1-5-2-cross-site-request-forgery-csrf-vulnerability",
            "product_slug": "tutor",
            "product_name": "Tutor LMS",
            "product_name_premium": null,
            "product_type": "Plugin",
            "vuln_type": "Cross Site Request Forgery (CSRF)",
            "cvss_score": null,
            "cve": [
                "2020-8615"
            ],
            "is_exploited": false,
            "patch_priority": 1,
            "affected_in": "<= 1.5.2",
            "fixed_in": "1.5.3",
            "direct_url": "https://patchstack.com/database/vulnerability/tutor/wordpress-tutor-lms-plugin-1-5-2-cross-site-request-forgery-csrf-vulnerability"
        },
        {
            "id": 4386,
            "product_id": 2642,
            "title": "WordPress Tutor LMS plugin <= 1.7.6 - Multiple Blind/Time-based SQL Injection (SQLi) vulnerabilities",
            "description": "Multiple Blind/Time-based SQL Injection (SQLi) vulnerabilities were discovered by WordFence in the WordPress Tutor LMS plugin (versions <= 1.7.6).",
            "disclosure_date": "2021-03-15 00:00:00",
            "disclosed_at": "2021-03-15T00:00:00+00:00",
            "created_at": "2021-06-07T10:12:03+00:00",
            "url": "wordpress-tutor-lms-plugin-1-7-6-multiple-blind-time-based-sql-injection-sqli-vulnerabilities",
            "product_slug": "tutor",
            "product_name": "Tutor LMS",
            "product_name_premium": null,
            "product_type": "Plugin",
            "vuln_type": "SQL Injection",
            "cvss_score": 5.4,
            "cve": [],
            "is_exploited": false,
            "patch_priority": 2,
            "affected_in": "<= 1.7.6",
            "fixed_in": "1.7.7",
            "direct_url": "https://patchstack.com/database/vulnerability/tutor/wordpress-tutor-lms-plugin-1-7-6-multiple-blind-time-based-sql-injection-sqli-vulnerabilities"
        },
        {
            "id": 4387,
            "product_id": 2642,
            "title": "WordPress Tutor LMS plugin <= 1.8.2 - Multiple Union SQL Injection (SQLi) vulnerabilities",
            "description": "Multiple Union SQL Injection (SQLi) vulnerabilities were discovered by WordFence in the WordPress Tutor LMS plugin (versions <= 1.8.2).",
            "disclosure_date": "2021-03-15 00:00:00",
            "disclosed_at": "2021-03-15T00:00:00+00:00",
            "created_at": "2021-03-16T08:48:03+00:00",
            "url": "wordpress-tutor-lms-plugin-1-8-2-multiple-union-sql-injection-sqli-vulnerabilities",
            "product_slug": "tutor",
            "product_name": "Tutor LMS",
            "product_name_premium": null,
            "product_type": "Plugin",
            "vuln_type": "SQL Injection",
            "cvss_score": null,
            "cve": [],
            "is_exploited": false,
            "patch_priority": 2,
            "affected_in": "<= 1.8.2",
            "fixed_in": "1.8.3",
            "direct_url": "https://patchstack.com/database/vulnerability/tutor/wordpress-tutor-lms-plugin-1-8-2-multiple-union-sql-injection-sqli-vulnerabilities"
        },
        {
            "id": 4388,
            "product_id": 2642,
            "title": "WordPress Tutor LMS plugin <= 1.7.6 - Unprotected AJAX Action to Privilege Escalation vulnerability",
            "description": "Unprotected AJAX Action to Privilege Escalation vulnerability discovered by WordFence in WordPress Tutor LMS plugin (versions <= 1.7.6).",
            "disclosure_date": "2021-03-15 00:00:00",
            "disclosed_at": "2021-03-15T00:00:00+00:00",
            "created_at": "2021-08-31T08:00:05+00:00",
            "url": "wordpress-tutor-lms-plugin-1-7-6-unprotected-ajax-action-to-privilege-escalation-vulnerability",
            "product_slug": "tutor",
            "product_name": "Tutor LMS",
            "product_name_premium": null,
            "product_type": "Plugin",
            "vuln_type": "Privilege Escalation",
            "cvss_score": null,
            "cve": [],
            "is_exploited": false,
            "patch_priority": 3,
            "affected_in": "<= 1.7.6",
            "fixed_in": "1.7.7",
            "direct_url": "https://patchstack.com/database/vulnerability/tutor/wordpress-tutor-lms-plugin-1-7-6-unprotected-ajax-action-to-privilege-escalation-vulnerability"
        },
        {
            "id": 4549,
            "product_id": 2642,
            "title": "WordPress Tutor LMS plugin <= 1.8.7 - Authenticated Local File Inclusion vulnerability",
            "description": "Authenticated Local File Inclusion vulnerability discovered by sasa in WordPress Tutor LMS plugin (versions <= 1.8.7)",
            "disclosure_date": "2021-04-05 00:00:00",
            "disclosed_at": "2021-04-05T00:00:00+00:00",
            "created_at": "2021-04-19T09:28:03+00:00",
            "url": "wordpress-tutor-lms-plugin-1-8-7-authenticated-local-file-inclusion-vulnerability",
            "product_slug": "tutor",
            "product_name": "Tutor LMS",
            "product_name_premium": null,
            "product_type": "Plugin",
            "vuln_type": "Local File Inclusion",
            "cvss_score": 4.9,
            "cve": [
                "2021-24242"
            ],
            "is_exploited": false,
            "patch_priority": 1,
            "affected_in": "<= 1.8.7",
            "fixed_in": "1.8.8",
            "direct_url": "https://patchstack.com/database/vulnerability/tutor/wordpress-tutor-lms-plugin-1-8-7-authenticated-local-file-inclusion-vulnerability"
        },
        {
            "id": 5082,
            "product_id": 2642,
            "title": "WordPress Tutor LMS plugin <= 1.9.5 - Reflected Cross-Site Scripting (XSS) vulnerability",
            "description": "Reflected Cross-Site Scripting (XSS) vulnerability discovered by WPScanTeam in WordPress Tutor LMS plugin (versions <= 1.9.5).",
            "disclosure_date": "2021-08-09 00:00:00",
            "disclosed_at": "2021-08-09T00:00:00+00:00",
            "created_at": "2021-08-20T06:35:01+00:00",
            "url": "wordpress-tutor-lms-plugin-1-9-5-reflected-cross-site-scripting-xss-vulnerability",
            "product_slug": "tutor",
            "product_name": "Tutor LMS",
            "product_name_premium": null,
            "product_type": "Plugin",
            "vuln_type": "Cross Site Scripting (XSS)",
            "cvss_score": 7.1,
            "cve": [],
            "is_exploited": false,
            "patch_priority": 2,
            "affected_in": "<= 1.9.5",
            "fixed_in": "1.9.6",
            "direct_url": "https://patchstack.com/database/vulnerability/tutor/wordpress-tutor-lms-plugin-1-9-5-reflected-cross-site-scripting-xss-vulnerability"
        },
        {
            "id": 5388,
            "product_id": 2642,
            "title": "WordPress Tutor LMS plugin <= 1.9.8 - Multiple Stored Cross-Site Scripting (XSS) vulnerabilities",
            "description": "Multiple Stored Cross-Site Scripting (XSS) vulnerabilities were discovered by Shivam Rai in the WordPress Tutor LMS plugin (versions <= 1.9.8).",
            "disclosure_date": "2021-09-20 00:00:00",
            "disclosed_at": "2021-09-20T00:00:00+00:00",
            "created_at": "2021-10-22T12:54:01+00:00",
            "url": "wordpress-tutor-lms-plugin-1-9-8-multiple-stored-cross-site-scripting-xss-vulnerabilities",
            "product_slug": "tutor",
            "product_name": "Tutor LMS",
            "product_name_premium": null,
            "product_type": "Plugin",
            "vuln_type": "Cross Site Scripting (XSS)",
            "cvss_score": 6.9,
            "cve": [
                "2021-24740"
            ],
            "is_exploited": false,
            "patch_priority": 2,
            "affected_in": "<= 1.9.8",
            "fixed_in": "1.9.9",
            "direct_url": "https://patchstack.com/database/vulnerability/tutor/wordpress-tutor-lms-plugin-1-9-8-multiple-stored-cross-site-scripting-xss-vulnerabilities"
        }
    ]
}
```

**Example Response** <https://patchstack.com/database/api/v2/product/plugin/tutor/1.5.2/exists>    

```json
{
	"vulnerable": true
}
```

### Bulk Find Vulnerability

**Description:** Retrieve vulnerabilities in bulk of a number of plugins, themes or WordPress versions.  
**Endpoint:** /batch  
**Method:** POST  
**Payload:** Raw JSON payload, same format as the individual vulnerability endpoint. This payload should contain no more than 50 objects.

**Payload Example 1**

This payload example will determine if WooCommerce version 3.0.0 has vulnerabilities and if WordPress version 3.0.0 has vulnerabilities. It will also only return a boolean response.

```json
[
	{"name":"easy-digital-downloads1","version":"1.0.0","type":"plugin","exists":true},
	{"name":"wordpress","version":"3.0.0","type":"wordpress","exists":true}
]
```

**Example Response 1** <https://patchstack.com/database/api/v2/batch>

```json
{
    "vulnerabilities": {
        "easy-digital-downloads1": true,
        "wordpress": true
    }
}
```

**Payload Example 2**

This payload example will determine if WooCommerce version 3.0.0 has vulnerabilities and if WordPress version 3.0.0 has vulnerabilities. For WooCommerce it will return all vulnerabilities and for WordPress if it will return a boolean response.

```json
[
	{"name":"easy-digital-downloads1","version":"1.0.0","type":"plugin","exists":false},
	{"name":"wordpress","version":"3.0.0","type":"wordpress","exists":true}
]
```

**Example Response 2** <https://patchstack.com/database/api/v2/batch>

```json
{
    "vulnerabilities": {
        "easy-digital-downloads1": [
            {
                "id": 4532,
                "product_id": 1572,
                "title": "WordPress Easy Digital Downloads plugin <= 2.10.2 - Cross-Site Request Forgery (CSRF) vulnerability",
                "description": "Cross-Site Request Forgery (CSRF) vulnerability discovered by WPScan team in WordPress Easy Digital Downloads plugin (versions <= 2.10.2).",
                "disclosure_date": "2021-04-16 00:00:00",
                "disclosed_at": "2021-04-16T00:00:00+00:00",
                "created_at": "2021-04-19T04:43:04+00:00",
                "url": "wordpress-easy-digital-downloads-plugin-2-10-2-cross-site-request-forgery-csrf-vulnerability",
                "product_slug": "easy-digital-downloads1",
                "product_name": "Easy Digital Downloads",
                "product_name_premium": null,
                "product_type": "Plugin",
                "vuln_type": "Cross Site Request Forgery (CSRF)",
                "cvss_score": 6.5,
                "cve": [],
                "is_exploited": false,
                "affected_in": "<= 2.10.2",
                "fixed_in": "2.10.3",
                "direct_url": "https://patchstack.com/database/vulnerability/easy-digital-downloads1/wordpress-easy-digital-downloads-plugin-2-10-2-cross-site-request-forgery-csrf-vulnerability"
            },
            {
                "id": 5410,
                "product_id": 1572,
                "title": "WordPress Easy Digital Downloads plugin <= 2.11.2 - Authenticated Reflected Cross-Site Scripting (XSS) vulnerability",
                "description": "Authenticated Reflected Cross-Site Scripting (XSS) vulnerability discovered by Thinkland Security Team in WordPress Easy Digital Downloads plugin (versions <= 2.11.2).",
                "disclosure_date": "2021-10-21 00:00:00",
                "disclosed_at": "2021-10-21T00:00:00+00:00",
                "created_at": "2021-10-22T12:54:01+00:00",
                "url": "wordpress-easy-digital-downloads-plugin-2-11-2-authenticated-reflected-cross-site-scripting-xss-vulnerability",
                "product_slug": "easy-digital-downloads1",
                "product_name": "Easy Digital Downloads",
                "product_name_premium": null,
                "product_type": "Plugin",
                "vuln_type": "Cross Site Scripting (XSS)",
                "cvss_score": 4.8,
                "cve": [
                    "2021-39354"
                ],
                "is_exploited": false,
                "affected_in": "<= 2.11.2",
                "fixed_in": "2.11.2.1",
                "direct_url": "https://patchstack.com/database/vulnerability/easy-digital-downloads1/wordpress-easy-digital-downloads-plugin-2-11-2-authenticated-reflected-cross-site-scripting-xss-vulnerability"
            }
        ],
        "wordpress": true
    }
}
```

### Find Specific Vulnerability By Id

**Description:** Find a specific vulnerability by vulnerability id.  
**Endpoint:** /vulnerability/ID  
**Method:** GET

**ID** = Numeric identifier or PSID of the vulnerability.

**Example Response 1** <https://patchstack.com/database/api/v2/vulnerability/4760>

```json
{
    "vulnerability": {
        "title": "WordPress Spam protection, AntiSpam, FireWall by CleanTalk plugin <= 5.153.3 - Unauthenticated Time-Based Blind SQL Injection (SQLi) vulnerability",
        "description": "Unauthenticated Time-Based Blind SQL Injection (SQLi) vulnerability discovered by WordFence in WordPress Spam protection, AntiSpam, FireWall by CleanTalk plugin (versions <= 5.153.3).",
        "disclosure_date": "2021-05-03 00:00:00",
        "disclosed_at": "2021-05-03T00:00:00+00:00",
        "created_at": "2021-09-28T14:17:02+00:00",
        "is_exploited": true,
        "url": "wordpress-spam-protection-antispam-firewall-by-cleantalk-plugin-5-153-3-unauthenticated-time-based-blind-sql-injection-sqli-vulnerability",
        "direct_url": "https://patchstack.com/database/vulnerability/cleantalk-spam-protect/wordpress-spam-protection-antispam-firewall-by-cleantalk-plugin-5-153-3-unauthenticated-time-based-blind-sql-injection-sqli-vulnerability"
    },
    "product": {
        "name": "Spam protection, AntiSpam, FireWall by CleanTalk",
        "slug": "cleantalk-spam-protect",
        "type": "Plugin"
    },
    "type": "SQL Injection",
    "cvss": {
        "score": 7.5,
        "vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N",
        "description": ""
    },
    "owasp": "A1: Injection",
    "references_url": [
        {
            "url": "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-24295",
            "title": "CVE"
        },
        {
            "url": "https://www.wordfence.com/blog/2021/05/sql-injection-vulnerability-patched-in-cleantalk-antispam-plugin/",
            "title": "Vulnerability details"
        },
        {
            "url": "https://wordpress.org/plugins/cleantalk-spam-protect/#developers",
            "title": "Plugin changelog"
        }
    ],
    "cve": [
        "2021-24295"
    ],
    "versions": {
        "affected_in": "<= 5.153.3",
        "fixed_in": "5.153.4"
    },
    "versions_list": null,
    "credit": {
        "name": "WordFence",
        "url": "https://twitter.com/wordfence"
    },
    "submitter": null
}
```

**Example Response 2** <https://patchstack.com/database/api/v2/vulnerability/4614>    

```json
{
    "vulnerability": {
        "title": "WordPress Simple File List plugin <= 4.2.2 - Unauthenticated Arbitrary File Upload vulnerability leading to Remote Code Execution (RCE)",
        "description": "Unauthenticated Arbitrary File Upload vulnerability leading to Remote Code Execution (RCE) discovered by h00die and coiffeur in WordPress Simple File List plugin (versions <= 4.2.2).",
        "disclosure_date": "2020-04-27 00:00:00",
        "disclosed_at": "2020-04-27T00:00:00+00:00",
        "created_at": "2021-04-23T15:55:02+00:00",
        "is_exploited": false,
        "url": "wordpress-simple-file-list-plugin-4-2-2-unauthenticated-arbitrary-file-upload-vulnerability-leading-to-remote-code-execution-rce",
        "direct_url": "https://patchstack.com/database/vulnerability/simple-file-list/wordpress-simple-file-list-plugin-4-2-2-unauthenticated-arbitrary-file-upload-vulnerability-leading-to-remote-code-execution-rce"
    },
    "product": {
        "name": "Simple File List",
        "slug": "simple-file-list",
        "type": "Plugin"
    },
    "type": "SQL Injection",
    "cvss": {
        "score": 9.8,
        "vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
        "description": ""
    },
    "owasp": "A1: Injection",
    "references_url": [
        {
            "url": "https://packetstormsecurity.com/files/160221/",
            "title": "Vulnerability details"
        },
        {
            "url": "https://wordpress.org/plugins/simple-file-list/#developers",
            "title": "Plugin changelog"
        }
    ],
    "cve": [],
    "versions": {
        "affected_in": "<= 4.2.2",
        "fixed_in": "4.2.3"
    },
    "versions_list": null,
    "credit": {
        "name": "coiffeur",
        "url": "https://packetstormsecurity.com/files/author/14922/"
    },
    "submitter": {
        "name": "h00die",
        "url": "https://packetstormsecurity.com/files/author/7166/"
    }
}
```

**Example Response 3** <https://patchstack.com/database/api/v2/vulnerability/4112>

```json
{
    "vulnerability": {
        "title": "WordPress Redux Framework <= 4.1.23 - Cross-Site Request Forgery (CSRF) Nonce Validation Bypass vulnerability",
        "description": "Cross-Site Request Forgery (CSRF) Nonce Validation Bypass vulnerability found by ErwanLR in WordPress Redux Framework (versions 4.1.22 - 4.1.23).",
        "disclosure_date": "2020-12-15 00:00:00",
        "disclosed_at": "2020-12-15T00:00:00+00:00",
        "created_at": "2020-12-15T18:36:01+00:00",
        "is_exploited": false,
        "url": "wordpress-redux-framework-4-1-23-cross-site-request-forgery-csrf-nonce-validation-bypass-vulnerability",
        "direct_url": "https://patchstack.com/database/vulnerability/redux-framework/wordpress-redux-framework-4-1-23-cross-site-request-forgery-csrf-nonce-validation-bypass-vulnerability"
    },
    "product": {
        "name": "Redux Framework",
        "slug": "redux-framework",
        "type": "Plugin"
    },
    "type": "SQL Injection",
    "cvss": null,
    "owasp": "A1: Injection",
    "references_url": [
        {
            "url": "https://plugins.trac.wordpress.org/changeset/2437953/redux-framework/trunk/redux-core/inc/classes/class-redux-ajax-save.php?old=2405408",
            "title": "Vulnerability details"
        },
        {
            "url": "https://github.com/reduxframework/redux-framework-4/blob/master/CHANGELOG.md",
            "title": "Plugin changelog"
        }
    ],
    "cve": [],
    "versions": {
        "affected_in": "<= 4.1.23",
        "fixed_in": "4.1.24"
    },
    "versions_list": "4.1.23, 4.1.22",
    "credit": {
        "name": "ErwanLR",
        "url": "https://profiles.wordpress.org/erwanlr/"
    },
    "submitter": null
}
```

## More information about Enterprise API

You can find more information about Enterprise API here:  
<a href="https://patchstack.com/for-hosts" target="_blank">https://patchstack.com/for-hosts/</a>
