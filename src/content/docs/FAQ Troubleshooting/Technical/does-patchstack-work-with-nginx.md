---
title: "Does Patchstack work with nginx?"

excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Fri Aug 26 2022 11:24:13 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed May 24 2023 11:35:20 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 7.5
---
If you run nginx, then the .htaccess functionality wont work.

Apache has a feature that allows you to use a .htaccess file to easily implement or override rewrite rules on your site, but nginx does not have such a feature. In order for the rewrite rules to work, you must implement the nginx rules manually.

If you're not sure how to do this, you should ask your host for further assistance since it varies by the host how the nginx configuration works and is implemented. Some hosts provide you with access to an nginx.conf file in the root of your site, but this is not a universal standard so we do not attempt to write to this file.

The official rewrite rules for nginx can be found below. This needs to be added to the server directive in the nginx configuration file of your site.

```typescript NGINX
# Patchstack nginx protection rules.
# Disable directory listing and server signature
autoindex off;
server_tokens off;

# Block access to certain files.

location ~* \.(htaccess|htpasswd|errordocs|logs|log)$ {
  return 403;
}

rewrite ^/readme\.html$ /index.php?webarx_fpage=101 break;
rewrite ^/license\.txt$ /index.php?webarx_fpage=102 break;
rewrite ^/wp-config\.php$ /index.php?webarx_fpage=103 break;
rewrite ^/wp-admin/includes/ /index.php?webarx_fpage=201 break;
rewrite ^/wp-includes/[^/]+\.php$ /index.php?webarx_fpage=202 break;
rewrite ^/wp-content/uploads/(.*)\.php$ /index.php?webarx_fpage=202 break;
rewrite ^/wp-includes/js/tinymce/langs/.+\.php /index.php?webarx_fpage=203 break;
rewrite ^/wp-includes/theme-compat/ /index.php?webarx_fpage=204 break;
rewrite ^/debug\.log$ /index.php?webarx_fpage=502 break;
if ($remote_addr != "18.221.197.243"){
  rewrite ^/(.*)/plugins/(.*)readme\.(txt|html)$ /index.php?webarx_fpage=19 break;
}
  
# Prevent proxy comments.
if ($http_cookie !~* "^.*wordpress_logged_in.*$"){
  set $blockcomment A;
}
  if ($request_method = POST){
    set $blockcomment "${blockcomment}B";
  }
  if ($http_via){
    set $blockcomment "${blockcomment}C";
  }
  if ($http_forwarded){
    set $blockcomment "${blockcomment}C";
  }
  if ($http_useragent_via){
    set $blockcomment "${blockcomment}C";
  }
  if ($http_x_forwarded_for){
    set $blockcomment "${blockcomment}C";
  }
  if ($http_x_forwarded_host){
    set $blockcomment "${blockcomment}C";
  }
  if ($http_proxy_connection){
    set $blockcomment "${blockcomment}C";
  }
  if ($http_xproxy_connection){
    set $blockcomment "${blockcomment}C";
  }
  if ($http_http_pc_remote_addr){
    set $blockcomment "${blockcomment}C";
  }
  if ($http_http_client_ip){
    set $blockcomment "${blockcomment}C";
  }
  if ($blockcomment ~ "ABC"){
    rewrite ^/wp-comments-post\.php$ /index.php?webarx_fpage=7 break;
  }

```
