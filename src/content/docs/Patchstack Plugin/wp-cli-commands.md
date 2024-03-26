---
title: "WP CLI Commands"

excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Thu Jun 29 2023 11:28:48 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jun 29 2023 12:24:18 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 6
---
The Patchstack WordPress plugin provides you access to the following WP CLI command as of version 2.1.25.  
Before running this command, the Patchstack WordPress plugin should be installed on the site. You can use the WP CLI command below to install it.

```
wp plugin install patchstack --activate
```

### wp patchstack activate

```
wp patchstack activate <id> <secret>
  
Example: wp patchstack activate 123456 2b072e8b60402e30d481df351fc08183906254e0
```

This command will connect and activate the license of the Patchstack WordPress plugin. It is important to provide the proper values for the <id> and <secret> placeholders.

These values can be found at the following location: 

1. Go to the [Patchstack App](https://app.patchstack.com/) and login.
2. Go to "My Apps" from the left menu.
3. Click on the URL of your site.
4. Click on the "Settings" tab.
5. On the right side, the API key section contains the full API key.
6. Now in order to use this value in the WP CLI:
   1. You can either copy this one and as <id> you enter the value on the right side of the dash and as <secret> you enter the left side of the dash.
   2. Or click on "Looking for the old Site ID and Site Secret Key format? Click here." and you will be presented with the <id> and <secret> values directly.
