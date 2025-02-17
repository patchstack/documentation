---
title: "Enterprise API implementation"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Aug 02 2022 14:07:04 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Aug 31 2023 07:18:30 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 3
---
# Introduction

This document will provide information on the properties of the different endpoints as part of the API of the vulnerability database and will also provide an example on a potential integration to match the result set against WordPress software.

These examples will be shown using PHP, but can easily be implemented using any programming language. If you have any questions, feel free to send an email to [dave.jong@patchstack.com](mailto:dave.jong@patchstack.com).

# Data Structure

Some of the JSON properties as part of the result set can be null so it is important to handle these properties accordingly. Note that we may speak of “product” in the result set, which is essentially the same as a “component”.

This is JSON example for 1 plugin, 1 theme and 1 WordPress core vulnerability.

```json
{
    "vulnerabilities": [
		{
            "id": 8728,
            "product_id": 497,
            "title": "WordPress Ninja Forms plugin <= 3.6.10 - Unauthenticated PHP Object Injection vulnerability",
            "description": "Unauthenticated PHP Object Injection vulnerability discovered in WordPress Ninja Forms plugin (versions <= 3.6.10).",
            "disclosure_date": "2022-06-15 14:46:03",
            "disclosed_at": "2022-06-15T14:46:03+00:00",
            "created_at": "2022-06-17T09:00:05+00:00",
            "url": "wordpress-ninja-forms-plugin-3-6-10-unauthenticated-php-object-injection-vulnerability",
            "product_slug": "ninja-forms",
            "product_name": "Ninja Forms",
            "product_name_premium": null,
            "product_type": "Plugin",
            "vuln_type": "PHP Object Injection",
            "cvss_score": 9.8,
            "cve": [],
      			"is_exploited": false,
      			"patch_priority": 3,
            "affected_in": "<= 3.6.10",
            "fixed_in": "3.6.11",
            "patched_in_ranges": [
                {
                    "from_version": "3.0",
                    "to_version": "3.0.34.1",
                    "fixed_in": "3.0.34.2"
                },
                {
                    "from_version": "3.1",
                    "to_version": "3.1.9",
                    "fixed_in": "3.1.10"
                },
                {
                    "from_version": "3.2",
                    "to_version": "3.2.27",
                    "fixed_in": "3.2.28"
                },
                {
                    "from_version": "3.3",
                    "to_version": "3.3.21.3",
                    "fixed_in": "3.3.21.4"
                },
                {
                    "from_version": "3.4",
                    "to_version": "3.4.34.1",
                    "fixed_in": "3.4.34.2"
                },
                {
                    "from_version": "3.5",
                    "to_version": "3.5.8.3",
                    "fixed_in": "3.5.8.4"
                }
            ],
            "direct_url": "https://patchstack.com/database/vulnerability/ninja-forms/wordpress-ninja-forms-plugin-3-6-10-unauthenticated-php-object-injection-vulnerability"
        },
        {
            "id": 5793,
            "product_id": 3547,
            "title": "WordPress WooRockets Nitro premium theme <= 1.7.9 - Unauthenticated Arbitrary Plugin Installation vulnerability",
            "description": "Unauthenticated Arbitrary Plugin Installation vulnerability discovered by Brad Patton in WordPress WooRockets Nitro premium theme (versions <= 1.7.9).",
            "disclosure_date": "2021-11-03 00:00:00",
            "disclosed_at": "2021-11-03T00:00:00+00:00",
            "created_at": "2022-01-06T15:31:02+00:00",
            "url": "wordpress-woorockets-nitro-premium-theme-1-7-9-unauthenticated-arbitrary-plugin-installation-vulnerability",
            "product_slug": "wr-nitro",
            "product_name": "WooRockets Nitro",
            "product_name_premium": null,
            "product_type": "Theme",
            "vuln_type": "Other Vulnerability Type",
            "cvss_score": 8.2,
            "cve": [],
            "patch_priority": 3,
            "affected_in": "<= 1.7.9",
            "fixed_in": "",
            "patched_in_ranges": [],
            "direct_url": "https://patchstack.com/database/vulnerability/wr-nitro/wordpress-woorockets-nitro-premium-theme-1-7-9-unauthenticated-arbitrary-plugin-installation-vulnerability"
        },
        {
            "id": 5814,
            "product_id": 8,
            "title": "WordPress <= 5.8.2 - Authenticated Object Injection in Multisites",
            "description": "Authenticated Object Injection in Multisites discovered by Simon Scannell (SonarSource) in WordPress (versions <= 5.8.2).",
            "disclosure_date": "2022-01-06 00:00:00",
            "disclosed_at": "2022-01-06T00:00:00+00:00",
            "created_at": "2022-01-07T15:05:04+00:00",
            "url": "wordpress-5-8-2-authenticated-object-injection-in-multisites",
            "product_slug": "wordpress",
            "product_name": "WordPress",
            "product_name_premium": null,
            "product_type": "WordPress",
            "vuln_type": "Other Vulnerability Type",
            "cvss_score": 6.6,
            "cve": [
                "2022-21663"
            ],
            "is_exploited": false,
            "patch_priority": 2,
            "affected_in": "<= 5.8.2",
            "fixed_in": "5.8.3",
            "patched_in_ranges": [
                {
                    "from_version": "5.8",
                    "to_version": "5.8.2",
                    "fixed_in": "5.8.3"
                },
                {
                    "from_version": "5.7",
                    "to_version": "5.7.4",
                    "fixed_in": "5.7.5"
                },
                {
                    "from_version": "5.6",
                    "to_version": "5.6.6",
                    "fixed_in": "5.6.7"
                },
                {
                    "from_version": "5.5",
                    "to_version": "5.5.7",
                    "fixed_in": "5.5.8"
                },
                {
                    "from_version": "5.4",
                    "to_version": "5.4.8",
                    "fixed_in": "5.4.9"
                },
                {
                    "from_version": "5.3",
                    "to_version": "5.3.10",
                    "fixed_in": "5.3.11"
                },
                {
                    "from_version": "5.2",
                    "to_version": "5.2.13",
                    "fixed_in": "5.2.14"
                },
                {
                    "from_version": "5.1",
                    "to_version": "5.1.11",
                    "fixed_in": "5.1.12"
                },
                {
                    "from_version": "5.0",
                    "to_version": "5.0.14",
                    "fixed_in": "5.0.15"
                },
                {
                    "from_version": "4.9",
                    "to_version": "4.9.18",
                    "fixed_in": "4.9.19"
                },
                {
                    "from_version": "4.8",
                    "to_version": "4.8.17",
                    "fixed_in": "4.8.18"
                },
                {
                    "from_version": "4.7",
                    "to_version": "4.7.21",
                    "fixed_in": "4.7.22"
                },
                {
                    "from_version": "4.6",
                    "to_version": "4.6.21",
                    "fixed_in": "4.6.22"
                },
                {
                    "from_version": "4.5",
                    "to_version": "4.5.24",
                    "fixed_in": "4.5.25"
                },
                {
                    "from_version": "4.4",
                    "to_version": "4.4.25",
                    "fixed_in": "4.4.26"
                },
                {
                    "from_version": "4.3",
                    "to_version": "4.3.26",
                    "fixed_in": "4.3.27"
                },
                {
                    "from_version": "4.2",
                    "to_version": "4.2.30",
                    "fixed_in": "4.2.31"
                },
                {
                    "from_version": "4.1",
                    "to_version": "4.1.33",
                    "fixed_in": "4.1.34"
                },
                {
                    "from_version": "4.0",
                    "to_version": "4.0.33",
                    "fixed_in": "4.0.34"
                },
                {
                    "from_version": "3.9",
                    "to_version": "3.9.34",
                    "fixed_in": "3.9.35"
                },
                {
                    "from_version": "3.8",
                    "to_version": "3.8.36",
                    "fixed_in": "3.8.37"
                },
                {
                    "from_version": "3.7",
                    "to_version": "3.7.36",
                    "fixed_in": "3.7.37"
                }
            ],
            "direct_url": "https://patchstack.com/database/vulnerability/wordpress/wordpress-5-8-2-authenticated-object-injection-in-multisites"
        }
    ]
}
```

- **id → integer**
  - Holds the unique numeric identifier of the vulnerability
- **product_id → integer**
  - Holds the unique numeric identifier of the product
- **title → string**
  - The title of the vulnerability, including the product name, version, and vulnerability type
- **description → string**
  - A short description about the vulnerability
- **disclosure_date → datetime → YYYY-MM-DD HH:MM:SS**
  - Date of when the vulnerability was publicly disclosed
- **disclosed_at → datetime → ISO 8601 format**
  - Date of when the vulnerability was publicly disclosed
- **created_at → datetime → ISO 8601 format**
  - Date of when the vulnerability was created and added to the database
- **url → string**
  - The slug of the vulnerability which is used for the URL
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
- **cve → array of strings → can be an empty array**
  - Contains an array of CVE ID’s bound to the vulnerability. One vulnerability could have multiple CVE ID’s. There are also vulnerabilities without CVE ID’s.
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
- **direct_url → string**
  - The direct URL of the vulnerability hosted at the Patchstack database frontend.
- **is_exploited → boolean**
  - Whether or not the vulnerability is known to be exploited by Patchstack 
- **patch_priority → integer → nullable**
  - The patch priority value of the vulnerability which implies how soon the developer needs to patch the vulnerability and how soon the customers need to be protected.
    - NULL = unknown
    - 1 = Low → patch within 30 days
    - 2 = Medium → patch within 7 days
    - 3 or higher = High → patch immediately

# Implementation

Since some of these properties must be kept in mind while determining if a component is vulnerable or not, we have an example PHP script below which will explain the flow. In particular, the following properties must be used: product_slug, product_name_premium, affected_in, patched_in_ranges.

Note that it is an example implementation and should not be copied 1:1 for internal use, you'll likely want to call the /all API endpoint using a different HTTP library and store the JSON response somewhere else (such as a memory based cache). The example will utilize Laravel’s collect function and Guzzle. The composer.json file which was used for this example is also included below.

```json
{
    "require": {
        "illuminate/collections": "^8.83",
        "guzzlehttp/guzzle": "7.0"
    }
}
```

```php
<?php

require './vendor/autoload.php';
use GuzzleHttp\Client;

/**
 * Determine if the component is vulnerable given the information of the component and present vulnerabilities.
 *
 * @param string $name
 * @param string $slug
 * @param string $currentVersion
 * @param string $type
 * @param \Illuminate\Support\Collection $vulnerabilities
 * @return bool
 */
function isVulnerable(string $name, string $slug, string $currentVersion, string $type, \Illuminate\Support\Collection $vulnerabilities): bool
{
    // Must have a valid current version.
    if (empty($currentVersion)) {
        return false;
    }

    // Determine if there is a vulnerability with this slug and type.
    $vulns = $vulnerabilities->where('product_slug', $slug)->where('product_type', getProductType($type));
    if ($vulns->count() === 0) {
        return false;
    }

    // Now we will loop through the vulnerabilities and return upon the first match.
    foreach ($vulns as $vuln) {
        // Get the current version, remove "v" as some components put this in place.
        $currentVersion = str_replace('v', '', strtolower($currentVersion));

        // The patched in ranges hold priority.
        if (count($vuln['patched_in_ranges']) > 0) {
            // Loop through all the present ranges.
            foreach ($vuln['patched_in_ranges'] as $range) {
                if (version_compare($currentVersion, $range['from_version'], '>=') && version_compare($currentVersion, $range['to_version'], '<=') && isMatchingName($name, $vuln['product_name_premium'])) {
                    return true;
                }
            }

            // If the patched in ranges exist and no match was made, we assume it's a fixed in the given version at this point.
            continue;
        }

        // Ignore empty affected in version, should never happen but best to catch it.
        $affectedIn = trim($vuln['affected_in']);
        if (empty($affectedIn)) {
            continue;
        }

        // Match against <= or <.
        if (strpos($affectedIn, '<= ') !== false || strpos($affectedIn, '< ') !== false) {
            $t = explode(' ', $affectedIn);
            $comparison = $t[0];
            $version = $t[1];

            if (version_compare($currentVersion, $version, $comparison) && isMatchingName($name, $vuln['product_name_premium'])) {
                return true;
            }

            continue;
        }

        // Match against versions separated by commas.
        if (strpos($affectedIn, ',') !== false) {
            $versions = explode(',', $affectedIn);
            foreach ($versions as $version) {
                $version = trim($version);
                if ($version == $currentVersion && isMatchingName($name, $vuln['product_name_premium'])) {
                    return true;
                }
            }

            continue;
        }

        // Match against a range of versions.
        if (strpos($affectedIn, '-') !== false) {
            $t = explode('-', $affectedIn);
            $start = $t[0];
            $end = $t[1];

            if (version_compare($currentVersion, $start, '>=') && version_compare($currentVersion, $end, '<=') && isMatchingName($name, $vuln['product_name_premium'])) {
                return true;
            }

            continue;
        }

        // Otherwise we are likely matching against one single version.
        if ($currentVersion == $affectedIn && isMatchingName($name, $vuln['product_name_premium'])) {
            return true;
        }
    }

    return false;
}

/**
 * If the premium field is filled in, match if it equals.
 * If it's empty, we will always return true.
 *
 * @param string $name
 * @param mixed $premiumName
 * @return bool
 */
function isMatchingName(string $name, mixed $premiumName): bool
{
    if (empty($premiumName)) {
        return true;
    }

    return $name === $premiumName;
}

/**
 * Convert the product type to how it's stored in the API.
 *
 * @param string $type
 * @return string
 */
function getProductType(string $type): string
{
    switch (strtolower($type)) {
        case 'plugin':
            return 'Plugin';
        case 'theme':
            return 'Theme';
        case 'wordpress':
            return 'WordPress';
        default:
            return 'Plugin';
    }
}

// Send the HTTP request, you'll likely want to cache this for an hour at a minimum.
if (!file_exists('db.cache')) {
    try {
        $client = new Client([
            'base_uri' => 'https://patchstack.com/database/api/v2/'
        ]);

        $response = $client->request('GET', 'all', [
            'headers' => [
                'PSKey' => '<your_pskey>'
            ]
        ]);

        file_put_contents('db.cache', (string) $response->getBody());
    } catch (\Throwable $e) {
        echo $e->getMessage();
        exit;
    }
}

// Get the vulnerabilities from the cache.
$vulnerabilities = json_decode(file_get_contents('db.cache'), true)['vulnerabilities'];

// Turn it into a collection.
$vulnerabilities = collect($vulnerabilities);

// The component we want to check, this is taken from your own dataset.
$component = [
    'name' => 'Ninja Forms',    // The name of the component
    'slug' => 'ninja-forms',    // The slug of the component
    'version' => '3.6.9',       // The current version of the component
    'type' => 'plugin'          // The component type
];

// Should return true.
var_dump(isVulnerable($component['name'], $component['slug'], $component['version'], $component['type'], $vulnerabilities));

// Should return false.
$component['version'] = '3.6.10';
var_dump(isVulnerable($component['name'], $component['slug'], $component['version'], $component['type'], $vulnerabilities));

// The component we want to check, this is taken from your own dataset.
$component = [
    'name' => 'WooRockets Nitro',   // The name of the component
    'slug' => 'wr-nitro',           // The slug of the component
    'version' => '1.7.5',           // The current version of the component
    'type' => 'theme'               // The component type
];

// Should return true.
var_dump(isVulnerable($component['name'], $component['slug'], $component['version'], $component['type'], $vulnerabilities));

// Should return false.
$component['version'] = '1.7.10';
var_dump(isVulnerable($component['name'], $component['slug'], $component['version'], $component['type'], $vulnerabilities));

// The component we want to check, this is taken from your own dataset.
$component = [
    'name' => 'WordPress',  // The name of the component
    'slug' => 'wordpress',  // The slug of the component
    'version' => '5.8.2',   // The current version of the component
    'type' => 'wordpress'   // The component type
];

// Should return true.
var_dump(isVulnerable($component['name'], $component['slug'], $component['version'], $component['type'], $vulnerabilities));

// Should return false.
$component['version'] = '5.8.3';
var_dump(isVulnerable($component['name'], $component['slug'], $component['version'], $component['type'], $vulnerabilities));

// Should return true.
$component['version'] = '5.9';
var_dump(isVulnerable($component['name'], $component['slug'], $component['version'], $component['type'], $vulnerabilities));

// Should return false.
$component['version'] = '5.9.2'
var_dump(isVulnerable($component['name'], $component['slug'], $component['version'], $component['type'], $vulnerabilities));
```

Running this script with the proper PSKey injected on line 147 should result in the following response:

```
bool(true)
bool(false)
bool(true)
bool(false)
bool(true)
bool(false)
bool(true)
bool(false)
```
