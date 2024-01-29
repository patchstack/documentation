---
title: "I installed the plugin on my site but it still shows I have missing headers on the app. Why is that?"
slug: "i-installed-the-plugin-on-my-site-but-it-still-shows-i-have-missing-headers-on-the-portal-why-is-that"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Fri Aug 26 2022 12:12:18 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Aug 30 2022 14:10:22 GMT+0000 (Coordinated Universal Time)"
---
Certain things are not updated instantly in the app, here's why.

By default, we perform an extended monitoring scan of your site 2 times a day. However, we currently do not perform a new scan yet when the WordPress plugin has been installed on your site.

It is also possible that the .htaccess file on your webserver does not have the proper CHMOD permissions setup so we can write to it. We need to be able to write to the .htaccess file in order to inject the security headers to the response.

After plugin installation, you can also manually check your security headers by using a tool such as <https://securityheaders.com/>.
