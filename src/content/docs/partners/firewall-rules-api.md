---
title: "Firewall Rules API"
slug: "docs/firewall-rules-api"
excerpt: ""
hidden: true
metadata: 
  image: []
  robots: "index"
createdAt: "Mon May 29 2023 13:53:34 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Oct 17 2023 13:28:57 GMT+0000 (Coordinated Universal Time)"
---
The firewall rules API is used by our partners to pull all the firewall rules that are available to be applied to your own integration of our firewall engine. 

It is important that you never send all firewall rules to all sites. Only the sites which actually need the firewall rules need them applied. Otherwise, this comes at the cost of performance and potential false positives.

It is recommended to first fetch all rules and then poll the /latest API endpoint every few hours for updates.

### Request

The request should be sent along with the PSKey HTTP header. The PSKey header is the same one used for the vulnerability database API.

To fetch all rules, use the API endpoint below.

```bash
curl --location 'api.patchstack.com/firewall/rules' --header 'PSKey: <KEY>'
```
```php PHP
<?php
  
$client = new GuzzleHttp\Client();
$headers = [
  'PSKey' => '<KEY>'
];

$request = new Request('GET', 'api.patchstack.com/firewall/rules', $headers);
$res = $client->sendAsync($request)->wait();

echo $res->getBody();
```

For pagination, you can send a request to a special paginated API endpoint.

```curl
curl --location 'api.patchstack.com/firewall/rules/paginated?page=1' --header 'PSKey: <KEY>'
```
```php
<?php
  
$client = new GuzzleHttp\Client();
$headers = [
  'PSKey' => '<KEY>'
];

$request = new Request('GET', 'api.patchstack.com/firewall/rules/paginated?page=1', $headers);
$res = $client->sendAsync($request)->wait();

echo $res->getBody();
```

If you only want to fetch the rules which were updated in the past 24 hours, you can use the API endpoint below.

```bash
curl --location 'api.patchstack.com/firewall/rules/latest' --header 'PSKey: <KEY>'
```
```php PHP
<?php
  
$client = new GuzzleHttp\Client();
$headers = [
  'PSKey' => '<KEY>'
];

$request = new Request('GET', 'api.patchstack.com/firewall/latest', $headers);
$res = $client->sendAsync($request)->wait();

echo $res->getBody();
```

### Response

An example response of 1 entry of each data array is shown below. The JSON response will hold 2 arrays:

- rules
  - This array holds all published virtual patches that are bound to a vulnerability entry. 
- rules_unpublished
  - This array holds all published virtual patches that are bound to a report and have not been published to a vulnerability entry yet.
  - It is important to note that this array will contain less information in each entry than the rules array. Make sure your integration can handle this accordingly.

The difference between the 2 is that rules_unpublished will hold virtual patches for new or freshly reported vulnerabilities to us which we cannot deploy to a vulnerability entry yet.

```json JSON /firewall/rules, /firewall/rules/latest
{
    "rules": [
        {
            "vulnerability_id": 8098,
            "title": "WordPress Tatsu plugin < 3.3.13 - Unauthenticated Remote Code Execution (RCE) vulnerability",
            "created_at": "2023-02-02T14:48:42+00:00",
            "updated_at": "2023-02-02T14:48:42+00:00",
            "disclosed_at": "2022-03-28T00:00:00+00:00",
            "url": "https://patchstack.com/database/tatsu/wordpress-tatsu-plugin-3-3-11-unauthenticated-remote-code-execution-rce-vulnerability",
            "product_keys": [
                "tatsu/tatsu.php"
            ],
            "product_slug": "tatsu",
            "product_name": "Tatsu",
            "product_name_premium": null,
            "product_type": "Plugin",
            "vuln_type": "Remote Code Execution (RCE)",
            "cvss_score": 8.1,
            "is_exploited": true,
            "affected_in": "< 3.3.13",
            "fixed_in": "3.3.13",
            "patched_in_ranges": [],
            "vpatch": "[{\"match\": {\"type\": \"current_user_cannot\", \"value\": \"administrator\"}, \"inclusive\": true, \"parameter\": false}, {\"rules\": [{\"match\": {\"type\": \"equals\", \"value\": \"add_custom_font\"}, \"parameter\": \"get.action\"}, {\"match\": {\"type\": \"equals\", \"value\": \"add_custom_font\"}, \"parameter\": \"post.action\"}], \"inclusive\": true, \"parameter\": \"rules\"}]"
        }
    ],
    "rules_unpublished": [
        {
            "report_id": 1337,
            "title": "WordPress Lala Theme Builder theme <= 3.20.1 - Authenticated Privilege Escalation vulnerability",
            "created_at": "2023-08-03T14:35:17+00:00",
            "updated_at": "2023-08-03T14:35:17+00:00",
            "product_keys": [
                "lala-theme"
            ],
            "product_slug": "lala-theme",
            "product_name": "Lala Theme Builder",
            "product_name_premium": null,
            "product_type": "Theme",
            "vuln_type": "Privilege Escalation",
            "cvss_score": "8.8",
            "affected_in": "<= 3.20.1",
            "fixed_in": "",
            "vpatch": "[{\"match\": {\"type\": \"current_user_cannot\", \"value\": \"administrator\"}, \"inclusive\": true, \"parameter\": false}, {\"rules\": [{\"match\": {\"type\": \"equals\", \"value\": \"dismiss_tooltip\"}, \"parameter\": \"get.custom\"}, {\"match\": {\"type\": \"equals\", \"value\": \"dismiss_tooltip\"}, \"parameter\": \"post.custom\"}], \"inclusive\": true, \"parameter\": \"rules\"}]"
        }
    ]
}
```
```json JSON /firewall/rules/paginated
{
    "current_page": 1,
    "data": {
        "rules": [
            {
                "vulnerability_id": 8098,
                "title": "WordPress Tatsu plugin < 3.3.13 - Unauthenticated Remote Code Execution (RCE) vulnerability",
                "created_at": "2023-02-02T14:48:42+00:00",
                "updated_at": "2023-02-02T14:48:42+00:00",
                "disclosed_at": "2022-03-28T00:00:00+00:00",
                "url": "https://patchstack.com/database/tatsu/wordpress-tatsu-plugin-3-3-11-unauthenticated-remote-code-execution-rce-vulnerability",
                "product_keys": [
                    "tatsu/tatsu.php"
                ],
                "product_slug": "tatsu",
                "product_name": "Tatsu",
                "product_name_premium": null,
                "product_type": "Plugin",
                "vuln_type": "Remote Code Execution (RCE)",
                "cvss_score": 8.1,
                "is_exploited": true,
                "affected_in": "< 3.3.13",
                "fixed_in": "3.3.13",
                "patched_in_ranges": [],
                "vpatch": "[{\"match\": {\"type\": \"current_user_cannot\", \"value\": \"administrator\"}, \"inclusive\": true, \"parameter\": false}, {\"rules\": [{\"match\": {\"type\": \"equals\", \"value\": \"add_custom_font\"}, \"parameter\": \"get.action\"}, {\"match\": {\"type\": \"equals\", \"value\": \"add_custom_font\"}, \"parameter\": \"post.action\"}], \"inclusive\": true, \"parameter\": \"rules\"}]"
            }
        ],
        "rules_unpublished": [
            {
                "report_id": 1337,
                "title": "WordPress Lala Theme Builder theme <= 3.20.1 - Authenticated Privilege Escalation vulnerability",
                "created_at": "2023-08-03T14:35:17+00:00",
                "updated_at": "2023-08-03T14:35:17+00:00",
                "product_keys": [
                    "lala-theme"
                ],
                "product_slug": "lala-theme",
                "product_name": "Lala Theme Builder",
                "product_name_premium": null,
                "product_type": "Theme",
                "vuln_type": "Privilege Escalation",
                "cvss_score": "8.8",
                "affected_in": "<= 3.20.1",
                "fixed_in": "",
                "vpatch": "[{\"match\": {\"type\": \"current_user_cannot\", \"value\": \"administrator\"}, \"inclusive\": true, \"parameter\": false}, {\"rules\": [{\"match\": {\"type\": \"equals\", \"value\": \"dismiss_tooltip\"}, \"parameter\": \"get.custom\"}, {\"match\": {\"type\": \"equals\", \"value\": \"dismiss_tooltip\"}, \"parameter\": \"post.custom\"}], \"inclusive\": true, \"parameter\": \"rules\"}]"
            }
        ]
    },
    "first_page_url": "http://api.patchstack.com/firewall/rules/paginated?page=1",
    "from": 1,
    "last_page": 3,
    "last_page_url": "http://api.patchstack.com/firewall/rules/paginated?page=3",
    "links": [
        {
            "url": null,
            "label": "&laquo; Previous",
            "active": false
        },
        {
            "url": "http://api.patchstack.com/firewall/rules/paginated?page=1",
            "label": "1",
            "active": true
        },
        {
            "url": "http://api.patchstack.com/firewall/rules/paginated?page=2",
            "label": "2",
            "active": false
        },
        {
            "url": "http://api.patchstack.com/firewall/rules/paginated?page=3",
            "label": "3",
            "active": false
        },
        {
            "url": "http://api.patchstack.com/firewall/rules/paginated?page=2",
            "label": "Next &raquo;",
            "active": false
        }
    ],
    "next_page_url": "http://api.patchstack.com/firewall/rules/paginated?page=2",
    "path": "http://api.patchstack.com/firewall/rules/paginated",
    "per_page": 250,
    "prev_page_url": null,
    "to": 2,
    "total": 730
}
```

- **vulnerability_id → integer**
  - Holds the unique numeric identifier of the vulnerability
  - **Only** present in the _rules_ array output
- **report_id→ integer**
  - Holds the unique numeric identifier of the report.
  - **Only** present in the _rules_unpublished_ array output
- **title → string**
  - The title of the vulnerability, including the product name, version, and vulnerability type
- **disclosed_at → datetime → ISO 8601 format**
  - Date of when the vulnerability was publicly disclosed
  - **Only** present in the _rules_ array output
- **created_at→ datetime → ISO 8601 format**
  - Date of when the report or vulnerability has had the firewall rule attached
- **updated_at → datetime → ISO 8601 format**
  - Date of when the report or vulnerability has had the firewall rule updated
- **url→ string**
  - The direct URL of the vulnerability hosted at the Patchstack database frontend.
  - **Only** present in the _rules_ array output.
- **product_keys → array**
  - An array of product keys of the plugin or theme. In WordPress, plugins have their own folder name along with a primary plugin file. The format is <folder>/\<main_file>. For example, for WooCommerce this would be woocommerce/woocommerce.php. This allows you to do more precise matching in order to determine to which sites to send the rules to. Note that if you send rules based on this, it's possible that sites with a renamed plugin folder may not receive the rule.
  - Plugins hold the format: slug/main_file.php
    - Example: woocommerce/woocommerce.php
  - Themes hold the format: slug
    - Example: twentytwentytwo
  - WordPress core holds the literal format: wordpress
    - Example: wordpress
- **product_slug → string**
  - The slug of the product
  - The slug will be in lowercase, so make sure to convert your own slugs to lowercase before doing any comparison to this property
- **product_name → string**
  - The title / name of the product
- **product_name_premium → string → nullable**
  - The title / name of the product
  - This is used in rare scenarios where a developer of a plugin has 2 versions of their plugin but with the same slug but different product names.
- **product_type → string**
  - The type of the product. Can be Plugin, Theme or WordPress
- **vuln_type → string**
  - The vulnerability type, some examples are SQL Injection and Cross Site Scripting
- **cvss_score → decimal → nullable**
  - The CVSS score of the vulnerability, between 1 and 10. Can be null, the older vulnerabilities in the database have not been classified yet.
- **is_exploited→ boolean**
  - Whether or not the vulnerability is known to be exploited by Patchstack
  - **Only** present in the _rules_ array output
- **affected_in → string**
  - The versions which are affected by this vulnerability.
  - Formats:
    - \<= x.x.x (affecting versions up to and including)
    - \< x.x.x (affecting versions up to)
    - x.x.x-x.x.x (affecting a specific range of versions, inclusive)
    - x.x.x,x.x.x (affecting specific versions)
    - x.x.x (affecting one version)
  - WordPress does not force plugin developers to stick to a certain versioning format. There are versions out there in an unusual format which is out of our control. Some plugins use a version in the form of a date such as 20220202, some use letters such as 2.0.2a, some just keep adding a number to the version e.g. 4.0000002. However, for the most part it's in the usual format of x.x.x or x.x or x.x.xx
- **fixed_in → string → can be empty**
  - The oldest version which has the vulnerability fixed
  - This can be empty, which implies that we have not recorded a fixed version for this vulnerability yet
- **patched_in_ranges → array of strings → can be an empty array**
  - In case the WordPress core, plugin or theme have patched sub-versions, this will hold an array of versions in the format of:
    - from_version → string
      - Starting version, inclusive
    - to_version → string
      - Ending version, inclusive
    - fixed_in → string
      - The version which has the patch applied
  - You see this often in WordPress core vulnerabilities as they still support older versions such as 5.1, 5.2, 5.3, etc. Bigger plugins such as WooCommerce and Ninja Forms also do this.
  - **Only** present in the _rules_ array output
- **vpatch → string → JSON encoded**
  - The firewall rule that needs to be plugged into the firewall engine. This is JSON encoded (as it's a JSON string inside of a JSON string).

### Usage in firewall engine

The firewall engine expects an array of firewall rules to be passed to the second argument of the constructor. This array should be composed of data that is returned from the firewall rules API. An example is shown below.

```json
[
    {
        "id":1,
        "title":"Block test parameter being present in the URL",
        "rules":[{"parameter":"get.test","match":{"type":"isset"}}],
        "cat":"TEST",
        "type":"BLOCK",
        "type_params":null
    }
]
```

 In order to construct this array, the following parameters can be filled from the firewall rules API result set.

- **id → integer**
  - Holds the unique numeric identifier of the firewall rule. Can be set to your own identifier or the vulnerability_id attribute.
- **title → string**
  - Holds the title of the firewall rule. Does not need to be passed and is only used for displaying purposes.
- **rules → JSON**
  - The vpatch attribute from the firewall rules API.
- **cat → string**
  - The category type of the vulnerability. Can be set to vuln_type attribute. Does not need to be passed and is only used for displaying purposes.
- **type → string**
  - The action to perform upon a match. This should always be BLOCK for the result set from the firewall rules API.
- **type_params → string**
  - This is only used when the type attribute is set to REDIRECT. Does not need to be passed.

Using the example result from the firewall rules API above, we can therefore construct it as follows:

```json
[
    {
        "id":8098,
        "title":"WordPress Tatsu plugin < 3.3.13 - Unauthenticated Remote Code Execution (RCE) vulnerability",
        "rules":[{"match": {"type": "current_user_cannot", "value": "administrator"}, "inclusive": true, "parameter": false}, {"rules": [{"match": {"type": "equals", "value": "add_custom_font"}, "parameter": "get.action"}, {"match": {"type": "equals", "value": "add_custom_font"}, "parameter": "post.action"}], "inclusive": true, "parameter": "rules"}],
        "type":"BLOCK"
    }
]
```
