---
title: "How to fix the missing security headers issue?"

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
In the Patchstack App, this may show up under "improvements" when you view your application.

If you have our WordPress plugin installed, we will automatically try to inject the security headers into the response.

If this does not work, perhaps due to an aggressive caching plugin or caching/proxy server, you may have to manually add the .htaccess rules below to your .htaccess file. 

## Adding the security headers automatically

To automatically add the security headers, you need to navigate to the app or Patchstack plugin in your WordPress dashboard. 

<b>How to do it via Patchstack plugin?</b>

<ol><li>
Navigate to your WordPress dashboard</li>
<li>On the left side menu find Settings</li>
<li>Under Settings find Security</li>
<li>From the Patchstack plugin menu click Firewall </li>
<li>Scroll down until you see .htaccess Features</li>
<li>Tick the green box "Add security headers" </li>
<li>Scroll down and Save settings</li></ol>

<b>How to do it in the Patchstack App? </b>

<ol>
<li>Click on the application you want to add security headers to from the Patchstack App dashboard</li>
<li>Scroll down and find the Hardening tab </li>
<li>From the Hardening options choose the Firewall tab</li>
<li>Click the option "Add security headers"</li>
<li>Scroll down and click Save settings</li></ol>

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

<i>Note that it may take up to 12 hours before the security headers error in the app is resolved. Or click on the "<b>Rescan</b>" button when you view your application in Patchstack App.</i>
