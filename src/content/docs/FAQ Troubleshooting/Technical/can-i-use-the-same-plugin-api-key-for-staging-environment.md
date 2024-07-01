---
title: "Can I use the same plugin API key for staging environment?"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Wed Jul 27 2022 12:19:45 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Jul 27 2022 12:19:45 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 7.91
---

Patchstack allows you to use the same plugin API key for the staging environment, and production (live) site.

**NB! The only requirement is that your staging site URL needs to contain any of the following phrases**:

```
'dev.',
'development.',
'staging.',
'beta.',
'alpha.',
'cloudwaysapps.com',
'kinsta.cloud',
'amazonaws.com',
'pantheonsite.io',
'devs',
'demo.',
'stage.',
'test.',
'azurecontainerapps',
'backup.',
'wpengine.com',
'wp-dv',
'optiserver.co.uk',
'azurewebsites.net'
```

### How the staging and production site work with Patchstack?
Patchstack will work normally with your live site, if you share the same API key with staging environment - if the staging URL contains any of the phrases given above.
Some things to keep in mind:
- Your production (live) site receives all the real-time protection rules
- All custom hardening rules set in Patchstack App are also synced normally
- All the features that Patchstack offers, will work on your live site (like auto-updates, custom rules, etc)
- On the staging site however, only the API key license check will work. Other features and firewall rules are not synced to the staging site
- We recommend turning on the server level protection for your staging site (e.g. htaccess and htpasswd)


**Example case:**
- Live URL is example.com
- Staging URL is staging.example.com
- Only example.com is added to the Patchstack App
- The Patchstack plugin with the same API key will be added to both staging.example.com and example.com
- The domain example.com will have all the firewall rules and other Patchstack features
- The domain staging.example.com will only pass the license checker, but has no protection
- The domain staging.example.com should be protected on server level, so no third person/bot could access it


### How to set up the staging and production (live) environment?

1. Add your production (live) site URL to the Patchstack App
2. Download the plugin and install it to your staging site
3. Activate the plugin
4. Push the staging site to production