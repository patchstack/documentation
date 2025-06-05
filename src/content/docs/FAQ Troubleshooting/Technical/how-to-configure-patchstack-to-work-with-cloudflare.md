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


### IP address header
In order for Patchstack to properly work with Cloudflare, we recommend that you configure the IP address header override option. 
<ol><li>
Go to <b>Patchstack App</b> > <b>Sites</b> > <b>yourdomain.com</b> > <b>Protection</b> > <b>Additional settings</b></li>
<li>To the <b>IP Address Header Override</b> input, type <b>HTTP_CF_CONNECTING_IP</b></li>
<li>Save the settings</li>
</ol>
This will tell Patchstack to grab the real visitors' IP addresses.

### Support for TLS 1.2 is required
Cloudflare servers support only TLS 1.3 by default. You will additionally need to enable TLS 1.2. To do that:
1. Login at Cloudflare, and click on your domain name
2. In the menu, go to SSL/TLS > Edge Certificates
3. Scroll down to the "Minimum TLS Version" section
4. Ensure that it is set to at least TLS 1.2 or lower


### Custom rules
Sometimes due to specific settings in Cloudflare, you may need to whitelist Patchstack's IP addresses.
<a href="https://docs.patchstack.com/faq-troubleshooting/technical/list-of-ip-addresses-that-patchstack-uses/" target="_blank">Click here</a> to see all the IP addresses that Patchstack servers use.


In case there are still problems with connecting Patchstack, an additional Cloudflare rule that might work is to pass the request if the query string contains "\_wcb" or query parameter "\_wcb" is set.
