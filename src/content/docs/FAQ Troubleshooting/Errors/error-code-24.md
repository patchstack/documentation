---
title: "Error code 24"

excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Aug 22 2022 13:24:13 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu May 11 2023 11:14:04 GMT+0000 (Coordinated Universal Time)"
---
Error code 24 means that there has been too many failed log in attempts.
Therefore the IP got temporarily blocked by Patchstack.

You can adjust the threshold for failed log in attempts from Patchstack App, by navigating to **Sites** > **yoursite.com** > **Hardening** > **Login protection**

By scrolling down, you can see the **Block IP addresses on login** section, where you can tweak the settings.
- Enable/disable automatic brute-force IP ban
- Block IP for X minutes; after Y failed login attempts; over a period of Z minutes (where you can define X, Y and Z)

![](@images/patchstack-hardening-block-ip-addresses-on-login.png)


If you need any help, you can <a href="#" id="launch-intercom">start a chat with us</a>, make sure to provide the URL of your site so we can investigate the exact cause and fix it permanently.

<script>document.querySelector("#launch-intercom").addEventListener("click", ()=>{Intercom("show")});</script>