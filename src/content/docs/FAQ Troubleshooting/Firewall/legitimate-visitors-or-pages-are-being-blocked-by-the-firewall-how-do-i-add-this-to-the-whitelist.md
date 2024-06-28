---
title: "Legitimate visitors or pages are being blocked by the firewall. How do I add these to the whitelist?"

excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Fri Aug 26 2022 11:41:41 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed May 10 2023 13:48:10 GMT+0000 (Coordinated Universal Time)"
---
Our whitelist feature makes it easy to whitelist specific requests.

To manage the whitelist:

1. Log in to the Patchstack App
2. Go to **Sites** > **yourdomain.com** > **Protection** > **Additional settings**
3. Scroll down to **Whitelist** text field

This text field supports a specific syntax that you can use to whitelist specific requests. Each definition must be placed on its own line.

We accept the following parameters in this text field:

**Parameters**  
IP:IPADDRESS  
PAYLOAD:someval  
URL:/someurl

**Definitions**  
IP = firewall will not run against the IP  
PAYLOAD = if the entire payload contains the keyword, the firewall will not proceed  
URL = if the URL contains the given URL, the firewall will not proceed

**Example**  
IP:192.168.1.1  
PAYLOAD:contact_form  
URL:water  
URL:/some-form

In this scenario, the firewall will not run if the IP address is 192.168.1.1 or if the payload contains contact_form or if the URL contains water, or if the URL contains /some-form.
