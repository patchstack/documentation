---
title: "Does Patchstack work with other captcha plugins?"

excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Fri Aug 26 2022 12:02:41 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed May 10 2023 13:21:21 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 7.8
---
Patchstack plugin can add either Google ReCAPTCHA or Cloudflare Turnstile to your login page, but it may not work with other plugins.

Patchstack, by default, has the captcha features turned off. You can pick to which pages you would like to add the capcha -- login, register, forgot password, and comments.

Note that Patchstack's captcha only works with WordPress's built-in forms and not for other plugins forms (like e-commerce registration forms).

If you turn this feature on and have a different plugin installed that has the same kind of functionality, you may get locked out of your WordPress site. In this scenario, you'd have to delete either plugin to regain access to your site.
