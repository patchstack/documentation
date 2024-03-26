---
title: "How to fix \"Improper HTTP to HTTPS redirection\"?"

excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Fri Aug 26 2022 11:30:51 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed May 10 2023 13:13:40 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 7.6
---
When your web application does not properly redirect HTTP requests to HTTPS, a Man-In-The-Middle attack may be possible.

It must redirect straight from the HTTP to the HTTPS version of your site with no additional HTTP redirects in between.

In order to fix this on a WordPress app, first make sure your site is available over HTTPS (you might have to ask your host regarding this matter). If it is available over HTTPS, we recommend that you install the "Really Simple SSL" plugin. After the plugin setup, it may take up to 12 hours before the HTTPS/SSL error in the app is resolved.

<b>Apache</b>  
If you do not run a WordPress site, you can create a .htaccess file in the root of your website (or modify existing one) through FTP or a file manager in CPanel/WHM/Plesk and add the following (make sure to change the domain name on the last line):

<pre>
RewriteEngine On 
RewriteCond %{SERVER_PORT} 80 
RewriteRule ^(.*)$ https://www.yourdomain.com/$1 [R,L]
</pre>

<b>nginx</b>  
It's a bit more technical to do this for Nginx, as you probably need root access to modify the Nginx web server configuration settings.

The easiest way is to set up a listener for port 80 (HTTP), which redirects traffic with a 301 permanent redirect to the port 443 (HTTPS) listener.
