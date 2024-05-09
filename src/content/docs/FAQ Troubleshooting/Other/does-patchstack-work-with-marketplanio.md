---
title: "Does Patchstack work with MarketPlan.io?"

excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Aug 23 2022 13:48:38 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed May 10 2023 14:14:10 GMT+0000 (Coordinated Universal Time)"
---
By default, the Patchstack plugin injects certain security headers into the server response of your application. However, these security headers prevent Marketplan.io from working properly on your application.

This most likely happens because they insert your site as an iframe into their application which the X-Frame-Options security header prevents from doing because it prevents clickjacking attacks.

In order to make it work, disable the security headers setting by going to the **Patchstack App** > **Sites** > **yourdomain.com** > **Hardening** > **.htaccess** > Uncheck **Add security headers** > Scroll down and click on the **Save settings** button.

It might take a few minutes before the security headers have been removed from your site.
