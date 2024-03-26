---
title: "Hosting API"

excerpt: ""
hidden: true
metadata: 
  image: []
  robots: "index"
createdAt: "Thu Jun 01 2023 12:04:17 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jul 31 2023 12:13:26 GMT+0000 (Coordinated Universal Time)"
---
# Hosting API Documentation

## Introduction

The information below describes the API URL’s, payloads and authentication necessary to communicate with our API. A special authentication key will have to be supplied in each request (that will be created specifically for the hosting provider) against an endpoint.

All actions (such as adding sites, users, etc.) will be logged and flagged under the name of the hosting provider so only they can access and alter the data that they created.

Each request will respond with JSON containing certain information about the action that was executed.

## Authorization

A HTTP header “HostToken” will have to be supplied in each request against our API. This API key is given upon request.

## Endpoints

HTTP endpoint prefix: api.patchstack.com/hosting/

### User

#### POST /user/add

Add a new user.

**Request Data**  
name → required|string  
company → optional|string  
email → required|email  
password → required|string|min:6  
password_confirmation → required|string → must match password input field  
newsletter → required|boolean → 0 or 1  
phone → optional|string

**Response Data**  
**HTTP 401, 403, 404, 422**  
error → Message indicating that bad or missing data was supplied or that the user cannot be added.  
**HTTP 200**  
id → UserID of the user.

#### POST /user/search

Find a user by email address.

**Request Data**  
email → required|email

**Response Data**  
**HTTP 401, 403, 422**  
error → Message indicating that bad or missing data was supplied.  
**HTTP 404**  
error → Message indicating that the user could not be found.  
**HTTP 200**  
JSON response example can be found below.

```json
{
   "id": 1,
   "name": "Dave",
   "email": "support@patchstack.com",
   "created_at": "2017-10-19T00:00:00.000000Z",
   "blocked_attacks": 367,
   "expires_at": "2025-01-01 11:11:11",
   "class": "premium", // Can be free or premium,
   "renew_freq": "monthly" // Can be monthly or annually
}
```

#### POST /user/{userid}/edit

Modify an existing user.

**Request Data**  
name → optional|string  
company → optional|string  
email → optional|email  
phone → optional|string  
newsletter → optional|boolean → 0 or 1

**Response Data**  
**HTTP 401, 403, 404, 422**  
error → Message indicating that bad or missing data was supplied or that the user cannot be added.  
**HTTP 200**  
success → Message indicating that it updated the user.

#### POST /user{userid}/delete

Delete an existing user.

**Request Data**  
None

**Response Data**  
**HTTP 401, 403, 404**  
error → Message indicating that bad or missing data was supplied, the user cannot be deleted or the user was not found.  
**HTTP 200**  
 success → Message indicating that the user was deleted.

#### POST /user/{userid}/sso

Returns a URL that can be used by the user to login into the portal. Each user can only have 1 non-expired and unused token which will be valid for 24 hours.

 **Request Data**  
 None

 **Response Data**  
 **HTTP 403, 404**  
 error → Message indicating that the user cannot be accessed or the user was not found.  
 **HTTP 200**  
 url → The URL that can be used to login as the user.  
 expires_at → The timestamp in UTC time in the format Y-m-d H:i:s when the token is no longer valid.

#### GET /user/{userid}/view

 Get information about a user.

**Request Data**  
None

**Response Data**  
**HTTP 401, 404, 404**  
**HTTP 200**  
JSON response example can be found below.

```json
{
    "user": {
        "id": 1,
        "name": "Dave",
        "email": "support@patchstack.com",
        "created_at": "2017-10-19T00:00:00.000000Z",
        "blocked_attacks": 367,
        "expires_at": "2025-01-01 11:11:11",
        "class": "premium", // Can be free or premium,
        "renew_freq": "monthly", // Can be monthly or annually,
        "addon_mr": "false", // Malware removal guarantee addon
        "addon_wl": "false" // Whitelabel reporting addon
    },
    "sites": [
        {
            "id": 315,
            "url": "http://wptest.com/singlesite/"
        },
        {
            "id": 16106,
            "url": "http://test1.com"
        }
    ]
}
```

### Site

#### POST /site/add

Add a new site to a specific user.

**Request Data**  
url → required|url → In the form of <https://www.domain.com>  
userid → required|integer → The userid of the user to which the URL should be bound to.  
strict → optional|boolean → true|false → Whether or not we should check if the site has already been added globally to Patchstack.

**Response Data**  
**HTTP 403, 404, 422**  
error → Message indicating that bad or missing data was supplied or that the site could not be added.  
**HTTP 200**  
success → Message indicating that the site was added.  
siteid → The ID of the site.  
api → array containing _id_ and _secret_ for plugin/firewall API authentication

#### POST /site/{siteid}/edit

Modify an existing site.

**Request Data**  
url → required|url → In the form of <https://www.domain.com/>

**Response Data**  
**HTTP 401, 403, 404, 422**  
error → Message indicating that bad or missing data was supplied, the site cannot be modified or the site could not be found.  
**HTTP 200**  
success → Message indicating that the site has been updated.

#### POST /site/{siteid}/delete

Delete an existing site.

**Request Data**  
None

**Response Data**  
**HTTP 401, 403, 404**  
error → Message indicating that bad or missing data was supplied, the site cannot be deleted or the site could not be found.  
**HTTP 200**  
success → Message indicating that the site has been deleted.

#### GET /site/{siteid}/download

Download the plugin file that belongs to the site.

**Request Data**  
None

**Response Data**  
**HTTP 401, 403, 404, 422**  
error → Message indicating that bad or missing data was supplied, the plugin could not be downloaded or the site could not be found.  
**HTTP 200**  
Prompts the download of the plugin .zip file that needs to be installed on the site.  
This .zip file contains hardcoded API keys for that specific site, the same .zip file cannot be installed on other sites. However, once this specific plugin .zip file has been installed on a site, the Patchstack plugin can be updated as usual through WordPress.

#### GET /site/{siteid}/view

Get information about a site such as the number of attacks blocked in the past day and week.

**Request Data**

None

**Response Data**  
**HTTP 401, 404, 404**  
**HTTP 200**  
JSON response example can be found below.

```json
{
    "id": 315,
    "url": "https://my-site.com",
    "created_at": "2019-01-01",
    "user": {
        "id": 1,
        "name": "Dave",
        "email": "dave.jong@patchstack.com",
        "created_at": "2017-10-19T00:00:00.000000Z",
        "site_count": 25,
        "blocked_attacks": 8482
    },
    "attacks": [
        {
            "num": 1,
            "dateday": "2023-06-30"
        },
        {
            "num": 0,
            "dateday": "2023-07-01"
        },
        {
            "num": 0,
            "dateday": "2023-07-02"
        },
        {
            "num": 0,
            "dateday": "2023-07-03"
        },
        {
            "num": 30,
            "dateday": "2023-07-04"
        },
        {
            "num": 0,
            "dateday": "2023-07-05"
        },
        {
            "num": 0,
            "dateday": "2023-07-06"
        },
        {
            "num": 0,
            "dateday": "2023-07-07"
        },
        {
            "num": 0,
            "dateday": "2023-07-08"
        },
        {
            "num": 0,
            "dateday": "2023-07-09"
        },
        {
            "num": 5,
            "dateday": "2023-07-10"
        },
        {
            "num": 0,
            "dateday": "2023-07-11"
        },
        {
            "num": 0,
            "dateday": "2023-07-12"
        },
        {
            "num": 0,
            "dateday": "2023-07-13"
        },
        {
            "num": 0,
            "dateday": "2023-07-14"
        },
        {
            "num": 0,
            "dateday": "2023-07-15"
        },
        {
            "num": 0,
            "dateday": "2023-07-16"
        },
        {
            "num": 0,
            "dateday": "2023-07-17"
        },
        {
            "num": 0,
            "dateday": "2023-07-18"
        },
        {
            "num": 0,
            "dateday": "2023-07-19"
        },
        {
            "num": 0,
            "dateday": "2023-07-20"
        },
        {
            "num": 0,
            "dateday": "2023-07-21"
        },
        {
            "num": 0,
            "dateday": "2023-07-22"
        },
        {
            "num": 0,
            "dateday": "2023-07-23"
        },
        {
            "num": 0,
            "dateday": "2023-07-24"
        },
        {
            "num": 0,
            "dateday": "2023-07-25"
        },
        {
            "num": 0,
            "dateday": "2023-07-26"
        },
        {
            "num": 0,
            "dateday": "2023-07-27"
        },
        {
            "num": 0,
            "dateday": "2023-07-28"
        },
        {
            "num": 0,
            "dateday": "2023-07-29"
        },
        {
            "num": 555,
            "dateday": "2023-07-30"
        },
        {
            "num": 0,
            "dateday": "2023-07-31"
        }
    ],
    "api": {
        "id": 315,
        "secret": "D4ajwfPddOQ6VAhhPYCOR5sggkpe9byNsSCobxxP"
    },
    "software": [
        {
            "name": "PHP",
            "type": "php",
            "version": "7.4.3",
            "version_new": null,
            "slug": null,
            "is_active": true,
            "is_outdated": false,
            "is_vulnerable": false
        },
        {
            "name": "Akismet Anti-Spam",
            "type": "plugin",
            "version": "5.0",
            "version_new": "5.0.1",
            "slug": "akismet",
            "is_active": false,
            "is_outdated": true,
            "is_vulnerable": false
        },
        {
            "name": "Hello Dolly",
            "type": "plugin",
            "version": "1.7.2",
            "version_new": null,
            "slug": "hello.php",
            "is_active": false,
            "is_outdated": false,
            "is_vulnerable": false
        },
        {
            "name": "Patchstack Security",
            "type": "plugin",
            "version": "2.1.22",
            "version_new": null,
            "slug": "patchstack",
            "is_active": true,
            "is_outdated": false,
            "is_vulnerable": false
        },
        {
            "name": "Twenty Twenty",
            "type": "theme",
            "version": "2.0",
            "version_new": null,
            "slug": "twentytwenty",
            "is_active": true,
            "is_outdated": false,
            "is_vulnerable": false
        },
        {
            "name": "Twenty Twenty-One",
            "type": "theme",
            "version": "1.6",
            "version_new": null,
            "slug": "twentytwentyone",
            "is_active": true,
            "is_outdated": false,
            "is_vulnerable": false
        },
        {
            "name": "Twenty Twenty-Two",
            "type": "theme",
            "version": "1.2",
            "version_new": null,
            "slug": "twentytwentytwo",
            "is_active": true,
            "is_outdated": false,
            "is_vulnerable": false
        },
        {
            "name": "WordPress",
            "type": "wordpress",
            "version": "6.0.2",
            "version_new": "6.0.3",
            "slug": null,
            "is_active": true,
            "is_outdated": true,
            "is_vulnerable": true
        }
    ],
    "has_vuln_plugin": 1,
    "software_outdated": 2,
    "software_vulnerable": 1
}
```
