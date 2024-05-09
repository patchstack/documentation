---
title: "Error: The site <URL> cannot be added since it is invalid or blocks Patchstack from accessing the site."

excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Aug 29 2022 14:22:05 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu May 11 2023 11:23:33 GMT+0000 (Coordinated Universal Time)"
---
This error often appears when there is no public access to your website. 
There are 3 main reasons this is happening:

1. Usually, it means that your server is protected using .htaccess and .htpasswd. To install the Patchstack plugin and connect Patchstack App to your website, it has to be publicly accessible for Patchstack as well, so you will have to remove the server authentication.

2. In order for us to properly start monitoring your application, its response when you first add it must not be a 5xx HTTP status code.

3. When your site is in maintenance mode, it will also result in a 5xx HTTP status code and thus will trigger this error.
