---
title: "How to add security headers with Patchstack?"

excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Fri Aug 26 2022 11:31:59 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu May 11 2023 12:00:52 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 7.7
---
If you have the Patchstack plugin installed, we will automatically try to inject the security headers into the response.

If this does not work, perhaps due to an aggressive caching plugin or caching/proxy server, you may have to manually add the .htaccess rules below to your .htaccess file. 

## Adding the security headers automatically

To automatically add the security headers, you need to navigate to the Patchstack App or Patchstack plugin in your WordPress dashboard. 

<b>How to do it in the Patchstack App? </b>


1. Navigate to your site from the Patchstack App > Sites
2. Click on the Hardening tab 
3. Click on the .htaccess sub-tab
4. Switch on the option "Add security headers"
5. Scroll down and click **Save settings**

## Adding the security headers manually

You can manually add the following security headers into the .htaccess file if you use <b>Apache</b>:

<pre>
&lt;IfModule mod_headers.c&gt;
   Header set Referrer-Policy "strict-origin-when-cross-origin"
   Header set X-XSS-Protection "1; mode=block"
   Header set X-Content-Type-Options "nosniff"
   Header set X-Frame-Options "SAMEORIGIN"
   Header set Strict-Transport-Security "max-age=31536000"
   Header unset X-Powered-By
&lt;/IfModule&gt;</pre>

If you are running <b>nginx</b>, add the following to the nginx configuration file and restart or reload nginx:  

<pre>add_header X-Frame-Options SAMEORIGIN;  
add_header X-Content-Type-Options nosniff;  
add_header X-XSS-Protection "1; mode=block";  
add_header Strict-Transport-Security "max-age=31536000";  
add_header Referrer-Policy "strict-origin-when-cross-origin";</pre>

Additionally, in order to permanently remove the X-Powered-By header instead of using the above changes, set the expose_php value of your PHP configuration to "Off". You may have to ask your host to make the above changes.

## More help
A more detailed guide about security headers can be found in this article:
https://patchstack.com/articles/wordpress-security-headers/

In case you need help, turn to our support chat - just click the green chat bubble at the bottom right corner!


