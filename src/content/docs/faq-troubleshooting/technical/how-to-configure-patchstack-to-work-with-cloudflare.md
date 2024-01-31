---
title: "How to configure Patchstack to work with Cloudflare?"
slug: "docs/how-to-configure-patchstack-to-work-with-cloudflare"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Aug 23 2022 12:35:39 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed May 10 2023 13:02:14 GMT+0000 (Coordinated Universal Time)"
---
In order for Patchstack to work with Cloudflare, we recommend that you configure the IP address header override option. 

For that:

<ol><li>
Go to Patchstack App > <b>My Apps</b> > <b>yourdomain.com</b> > <b>Hardening</b></li>
<li>To the <b>IP Address Header Override</b> input, type <b>HTTP_CF_CONNECTING_IP</b></li>
<li>Save the settings</li>
</ol>

This will tell Patchstack to grab the real visitors' IP addresses.
