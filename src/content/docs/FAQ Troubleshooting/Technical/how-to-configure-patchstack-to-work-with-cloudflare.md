---
title: "How to configure Patchstack to work with Cloudflare?"

excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Aug 23 2022 12:35:39 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed May 10 2023 13:02:14 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 7.4
---
The following steps should only be taken if your site is properly configured behind a Cloudflare proxy. On misconfigured sites, this could allow for IP address spoofing to exist which could potentially lead to a DoS attack

In order for Patchstack to work with Cloudflare, we recommend that you configure the IP address header override option. 

For that:

<ol><li>
Go to <b>Patchstack App</b> > <b>Sites</b> > <b>yourdomain.com</b> > <b>Protection</b> > <b>Additional settings</b></li>
<li>To the <b>IP Address Header Override</b> input, type <b>HTTP_CF_CONNECTING_IP</b></li>
<li>Save the settings</li>
</ol>

This will tell Patchstack to grab the real visitors' IP addresses.
