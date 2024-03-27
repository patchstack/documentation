---
title: "Missing security headers Permission-Policy or Content-Security-Policy (CSP)"

excerpt: ""
hidden: false
createdAt: "Tue Dec 12 2023 11:08:10 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Dec 12 2023 11:12:02 GMT+0000 (Coordinated Universal Time)"
---
The reason Patchstack does not add these security headers to your site that both of these headers requires very specific manual configuration for them to operate properly.

**Permission-Policy**  
The permission-policy header defines what API features can be used (such as geolocation, microphone, fullscreen, autoplay, payments) on a website, but Patchstack cannot possibly know what your site is about and what API features it uses. Therefore, it requires manual configuration. You can generate the policy for this HTTP security header here <https://www.permissionspolicy.com/>

**Content-Security-Policy (CSP)**  
The content-security-policy header defines how and what resources can load on your website through any kind of HTML tag. The only way to properly generate this policy is the understand every single resource that is loaded on your site through all HTML tags, including images, scripts (such as Google Analytics), iframes, XHR requests, stylesheets, fonts, objects, videos, forms, and many other HTML tags. Patchstack cannot possibly know all resources that your site calls either locally or from a third-party on all pages that are available on your site. More information can be found here <https://content-security-policy.com/>
