---
title: "Error code 22"

excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Aug 22 2022 13:24:13 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu May 11 2023 11:14:04 GMT+0000 (Coordinated Universal Time)"
---
Error code 22 is the internal code we use for \"temporary IP ban\". If you see this error even though you are a legitimate visitor, there can be multiple causes:
<ol>
<li>The real visitor's IP address is not properly forwarded to your application, either due to a proxy server or another plugin that overrides it. This causes the IP address of the server or proxy to be logged for all visitors which can block all traffic. 
<br>We have a setting to override the IP header we use to retrieve the IP address. To find it, go to <b>Patchstack App</b> > <b>yoursite.com</b> > <b>Protection</b> > <b>Additional settings</b> > Scroll down to <b>IP address header override</b> setting. 
For example, if your host tells you it's in $_SERVER['IP-Header-X'] then you enter IP-Header-X in the text field.</li>

<li>You have a plugin installed which sends a suspicious payload behind the scenes which ultimately triggers our temporary IP ban feature.</li>

<li>The error page is cached by a caching plugin. We send error code 403 when this error is shown so this should never really happen unless the cache server is configured incorrectly.</li>

<li>Make sure that you have whitelisted the proper user roles for your site. Check the user roles whitelist settings, by navigating to <b>Patchstack App</b> > <b>yoursite.com</b> > <b>Protection</b> > <b>Additional settings</b>.</li>
</ol>

The temporary IP ban usually lifts within 30 minutes. You can <a href="#" id="launch-intercom">start a chat with us</a> and provide the URL of the site so we can investigate the exact cause and fix it permanently.

<script>document.querySelector("#launch-intercom").addEventListener("click", ()=>{Intercom("show")});</script>