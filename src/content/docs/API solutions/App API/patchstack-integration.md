---
title: "Patchstack Integration"
hidden: false
createdAt: "Thu May 25 2023 13:54:05 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Jan 24 2024 13:52:09 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 2
---

Patchstack has made it extremely easy to be integrated into your workflow or control panel. This page will describe the possible ways to integrate us and what tools are needed for this.

Some of the integration steps are essential to follow, while some others entirely depend on how the internal infrastructure looks as well as available developer resources.

Note that this document is made for WordPress sites.

# Integration
## Prerequisites
- Patchstack Developer/Enterprise plan
- [Patchstack App API key](/api-solutions/app-api/patchstack-app-api/#how-to-get-patchstack-app-api-key)
- [Patchstack App API docs](https://api.patchstack.com/app-api/documentation)
- Know how to communicate with an API programmatically
- Local datastore to cache data to avoid HTTP overhead

## Considerations

##### .htaccess file
The Patchstack plugin writes, by default, to the .htaccess file to apply basic protection rules (for example to prevent PHP file access in certain folders). This functionality can be turned off in 2 ways, and we recommend doing this before activating Patchstack on the site.

1. Set the constant PS_DISABLE_HTACCESS to true: add `define('PS_DISABLE_HTACCESS', true);` to wp-config.php
2. Set the `patchstack_disable_htaccess` WordPress option to 1, e.g. WP-CLI command: `wp option update patchstack_disable_htaccess 1`

#### IP address header
The Patchstack plugin tries to guess in which HTTP header the web-server is storing the real IP address of the visitor. This HTTP header varies a lot between hosting providers and also depends on if services such as Cloudflare are used. 

If necessary, this can be set through the WordPress option `patchstack_firewall_ip_header`. This must contain the fill PHP-based HTTP header. For example for Cloudflare it would be HTTP_CF_CONNECTING_IP:
`wp option update patchstack_firewall_ip_header HTTP_CF_CONNECTING_IP`

If the IP address header is invalid, we fallback to REMOTE_ADDR. Note that setting it to an invalid HTTP header could make it possible for malicious users to spoof their IP address.

#### Data caching strategy
To minimize API calls and reduce latency when displaying site information to your users, implement a caching strategy in your local datastore. This is essential for maintaining performance and reducing strain on both your infrastructure and the Patchstack API.

#### Error handling & status codes

All Patchstack API endpoints return standard HTTP status codes. Your integration should handle these appropriately to ensure reliability and provide meaningful feedback to users. E.g. handle status codes 200, 401, 422, 500.

## Flow of integration & plugin
Patchstack works by assigning an API key to a site that has been added to the Patchstack App. This API key is then used in the WordPress plugin to activate the connection to Patchstack.

The plugin takes cares of a few things, but these are most important to know:
- Uploads a list of software to the Patchstack API (SCA)
  - This ensures we attach the proper mitigation rules to the site
- Uploads firewall and activity logs to the Patchstack API
  - For threat intelligence purposes
- Fetches mitigation rules that will run in the plugin on each request
  - We only ship the mitigation rules that the site needs for optimal performance

A possible integration can be split into 4 phases:
1. Account setup & authentication
2. Site provisioning
3. Plugin deployment
4. Management & reporting

## Integration phases
### Step 1: Account setup & authentication
The Patchstack App API requires an API key. Refer to [this](/api-solutions/app-api/patchstack-app-api/#how-to-get-patchstack-app-api-key) page for more instructions on how to get one. Note that you can only obtain the App API key on the developer or enterprise plan.

Once the API key has been acquired, it can be used to communicate with the [Patchstack App API](https://api.patchstack.com/app-api/documentation) by setting the `UserToken` HTTP header to the value of the API key. The root URL of the Patchstack App API is `https://api.patchstack.com/monitor/`.

It's also important to set the `Content-Type` HTTP header to `application/json` when sending request data through the body.

### Step 2: Site provisioning
When the site should be added to Patchstack depend on your use-case scenario. If they require protection immediately then you can execute this flow the moment the website environment (the WordPress site) has been created on the infrastructure. If you upsell Patchstack then this flow can be launched upon purchase or opt-in.

###### 1. Determine if the site already exists in Patchstack
This step is essential as it's possible that a site may be protected already or added to Patchstack. For this, the `/site/exists` API endpoint can be utilized; it will check if a site with given URL has already been added to Patchstack before you attempt to add the site to Patchstack.

The strict parameter dictates whether to do a strict check of the exact URL; avoids checking if different variants of the domain name (with and without www) and protocol (with and without http/https) is added.

```bash
curl -X 'POST' \
  'https://api.patchstack.com/monitor/site/exists' \
  -H 'Content-Type: application/json' \
  -H 'UserToken: <token>' \
  -d '{
  "url": "https://mywebsite.com",
  "strict": false
}'
```

The response will indicate whether or not the site is added already:

```json
{
  "exists": false
}
```

###### 2. Add the website to Patchstack
Once we confirm that the site has not been added already, we can add it to Patchstack to obtain an API key.

```bash
curl -X 'POST' \
  'https://api.patchstack.com/monitor/site/add' \
  -H 'UserToken: <token>' \
  -H 'Content-Type: application/json' \
  -d '{
  "urls": [
    "https://mywebsite.com"
  ],
  "cms_id": 1
}'
```

The response will look something like below.

```json
{
  "success": "Successfully added the site(s).",
  "count": 1,
  "lastid": 12345,
  "oauth": {
    "id": 12345,
    "secret": "DOOs9DIyv2FMcURFtkB0eXOHMRhH7I2EsaNUb4aR"
  }
}
```

###### 3. Store in local datastore
It is now important to store the lastid and oauth properties into a datastore on your infrastructure. This allows you to know the site identifier of the website of the customers without having to query the Patchstack App API. This can then be used for most of our other API endpoints to fetch information for the site.

The API key that is used in the plugin, contains the format `oauth.secret-oauth.id`, for example in above response it would be `DOOs9DIyv2FMcURFtkB0eXOHMRhH7I2EsaNUb4aR-12345`.

### Step 3: Plugin deployment
Now that you have the site identifier and plugin API key stored in your local datastore, you can start the flow of installing and activating the Patchstack plugin on the website.

There are 3 possible ways to do this:
- Through [WP-CLI](https://wp-cli.org/)
  - Fully automatic process
  - Recommended approach
- Downloading pre-configured Patchstack plugin
  - Semi-automatic depending on integration
  - Not recommended → might interfere with file integrity checks
- Manually downloading, installing and activating Patchstack
  - Fully manual process
  - Not recommended → not automated

###### Through WP-CLI
With the WP-CLI, we need to execute 2 commands to get the Patchstack plugin running and activated.

First we execute the command below to install and activate the Patchstack plugin:

`wp plugin install patchstack --activate`

Then we execute the command below to activate the connection to Patchstack. It is important to inject the plugin API key here we retrieved from step 2:

`wp patchstack activate DOOs9DIyv2FMcURFtkB0eXOHMRhH7I2EsaNUb4aR-12345`

This command will return `The Patchstack plugin has been successfully connected.` if it succeeded.

###### Downloading pre-configured Patchstack plugin
The pre-configured Patchstack plugin simply has the plugin API key injected into the /patchstack/patchstack.php file. This API key will be used when the plugin is being activated and we detect that this injected API key is present and Patchstack has not been activated yet.

It can be downloaded through the [/download/wordpress/{site}](https://api.patchstack.com/app-api/documentation#/Plugin%20Download/54ec70b2b389dc50b18e4bcfeaf17aab) API endpoint.

```bash
curl -X 'GET' \
  'https://api.patchstack.com/monitor/download/wordpress/12345' \
  -H 'Accept: */*' \
  -H 'UserToken: <token>' \
```

This will serve a binary .zip file which you can download after which there are 2 options:
1. Option 1: Upload, install and activate the plugin manually through /wp-admin/.
2. Option 2: Unzip into /wp-content/plugins/ so it's unzipped as /wp-content/plugins/patchstack/, then activate it manually through /wp-admin/ or programmatically activate through [custom code](https://developer.wordpress.org/reference/functions/activate_plugin/) of your own.

Note that because we inject the API key into the file, it could fail file integrity checks.

###### Manually downloading, installing and activating Patchstack
Another way to install the Patchstack plugin is from WordPress itself. 

1. In the WordPress admin area, navigate to **Plugins** > **Add New** > Type "Patchstack" to search.
2. Install and activate the plugin
3. Copy the API key from there
4. Go to your WordPress admin, navigate to <b>Settings</b> > <b>Security</b> and insert the API key there

### Step 4: Management & reporting
Once Patchstack has been activated on a site, it will upload the software list to the Patchstack API and fetch the mitigation rules for any vulnerabilities present on the website which need protection.

Now it is important to show value to the customer, and this can be done through 2 ways:
1. You fetch data from the Patchstack App API and display this in the environment
2. You embed our pre-made iframe widget

###### Fetching data
We have a large list of API endpoints to use where you can fetch information of a site.
Some noteworthy ones are [listed below](/api-solutions/app-api/patchstack-integration/#noteworthy-api-endpoints) as well as here:

- [Fetch basic information](https://api.patchstack.com/app-api/documentation#/Sites/d246365f4afc2083b225e4cf2ae84632)
  - Vulnerability counter, total threats blocked, total software counter and how many are vulnerable/outdated
  - Attacks blocked over past 7 days
- [Fetch vulnerabilities present](https://api.patchstack.com/app-api/documentation#/Dashboard/8a6e3f514edd9f267812dc853398e716)
  - All vulnerabilities of a site
  - Information about each individual vulnerability
- [Fetch firewall statistics](https://api.patchstack.com/app-api/documentation#/Firewall/edd0582b9e216543afc1ebe7c70f3526)
  - Fetch the threats blocked over a given period of days or timeframe


###### Embedding iframe widget
The Patchstack iframe widget is a drop-in HTML component that lets you display real-time security insights inside your own environment.

Simply plug it in your own environment and give customers deeper insights into the state of their website’s security while not giving them too much control over how Patchstack is configured on their website.

[Click here for integration and more information](/api-solutions/app-api/patchstack-iframe/)

## Noteworthy API endpoints
The list below are noteworthy API endpoints that might be interesting to our partners.

- Individual site actions
  - [Check if site is added already to Patchstack](https://api.patchstack.com/app-api/documentation#/Sites/886038a2314a8571082e209b901b12e6)
    - Pass full URL of site to check in url parameter.
    - Consider `strict` parameter: Whether to do a strict check of the exact URL; avoids checking if different variants of the domain name (with and without www) and protocol (with and without http/https) is added.
  - [Add site](https://api.patchstack.com/app-api/documentation#/Sites/565eeffd1616c74665d439a4d77bca4b)
    - Pass full URL of site to be added in urls parameter.
    - Returns the site id (lastid) and API key in the response.
  - [Verify installation](https://api.patchstack.com/app-api/documentation#/Sites/d932033c445ab06e5fd2dcb6ea8eead3)
    - Pass site id in URL.
    - Internally this checks if we received the software list from the plugin to the API.
  - [Delete site](https://api.patchstack.com/app-api/documentation#/Sites/3ebcb454c2ad6d4098a541c4c5d939be)
    - Pass site id in URL.
  - [Fetch basic information](https://api.patchstack.com/app-api/documentation#/Sites/d246365f4afc2083b225e4cf2ae84632)
    - Pass site id in URL.
  - [Fetch vulnerabilities](https://api.patchstack.com/app-api/documentation#/Dashboard/8a6e3f514edd9f267812dc853398e716)
    - Pass site id in URL.
  - [Fetch firewall statistics](https://api.patchstack.com/app-api/documentation#/Firewall/edd0582b9e216543afc1ebe7c70f3526)
    - Pass site id in site_id parameter
  - [Fetch software](https://api.patchstack.com/app-api/documentation#/Sites/e411201c74ee4c5e3cd63ebdfb89e7bd)
    - Pass site id in URL.
  - [Get plugin options](https://api.patchstack.com/app-api/documentation#/Sites/928070df689d005b52578154096f553a)
    - Pass site id in URL.
  - [Save plugin options](https://api.patchstack.com/app-api/documentation#/Sites/027e257bf17851530dc90fcbe6492f57)
    - Pass site id in URL.
- Global actions
  - [Search for sites added under the account](https://api.patchstack.com/app-api/documentation#/Sites/36abb3f0d63e821c888326568c712073)

## Frequently asked questions 

### How to determine if a site has been activated and is connected?
Utilize the [/site/plugin/installed/{site}](https://api.patchstack.com/app-api/documentation#/Sites/d932033c445ab06e5fd2dcb6ea8eead3) API endpoint in order to determine if a site has been connected and has done its first software synchronization. This will return true if we have a software list present, but does not check the latest ping status.

```bash
curl -X 'GET' \
  'https://api.patchstack.com/monitor/site/plugin/installed/12345' \
  -H 'UserToken: <token>' \
```

Which outputs the following:
```json
{
  "activated": true
}
```

### How to determine if a site is still connected to Patchstack?
Utilize the [/site/state/{site}](https://api.patchstack.com/app-api/documentation#/Sites/a6ef118c851ff44736580ac25a68a5a8) API endpoint in order to determine if a site is still connected and has pinged the Patchstack API any time recently.

```bash
curl -X 'GET' \
  'https://api.patchstack.com/monitor/site/state/12345' \
  -H 'UserToken: <token>' \
```

Which outputs the following:
```json
{
  "activated": true
}
```