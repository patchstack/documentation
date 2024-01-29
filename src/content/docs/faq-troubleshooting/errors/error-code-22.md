---
title: "Error Code 22"
slug: "error-code-22"
excerpt: "Error code 22 is the internal code we use for \"temporary IP ban\". If you see this error even though you are a legitimate visitor, there can be multiple causes:"
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Aug 22 2022 13:24:13 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu May 11 2023 11:14:04 GMT+0000 (Coordinated Universal Time)"
---
<ol>
<li>The real visitor's IP address is not properly forwarded to your application, either due to a proxy server or another plugin that overrides it. This causes the IP address of the server or proxy to be logged for all visitors which can block all traffic. On the Firewall tab of the plugin, we have a setting to override the IP header we use to retrieve the IP address. For example, if your host tells you it's in $_SERVER['IP-Header-X'] then you enter IP-Header-X in the text field.</li>

<li>You have a plugin installed which sends a suspicious payload behind the scenes which ultimately triggers our temporary IP ban feature.</li>

<li>The page is cached by a caching plugin. We send error code 403 when this error is shown so this should never really happen unless the cache server is configured incorrectly.</li>

<li>You are running the Patchstack plugin of which the version is lower than 1.4.0. We have applied several fixes related to error code 22 in version >= 1.4.0. You should always keep our plugin and any other plugin fully updated.</li>

<li>Make sure that you have whitelisted the proper user roles on the "Firewall" settings page on the Patchstack plugin settings page on the <b>/wp-admin</b> of your site. You can find this at <b>wp-admin</b> > <b>Settings</b> > <b>Security</b> > <b>Firewall</b>.</li>
</ol>

The temporary IP ban usually lifts within 30 minutes. You can start a chat with us and provide the URL of the site so we can investigate the exact cause and fix it permanently.
