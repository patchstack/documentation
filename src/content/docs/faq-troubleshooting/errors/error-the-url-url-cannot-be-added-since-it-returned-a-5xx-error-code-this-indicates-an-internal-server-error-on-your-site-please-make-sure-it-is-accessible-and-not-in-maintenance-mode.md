---
title: "Error: \"The URL <URL> cannot be added since it returned a 5xx error code, this indicates an internal server error on your site. Please make sure it is accessible and not in maintenance mode.\""
slug: "docs/error-the-url-url-cannot-be-added-since-it-returned-a-5xx-error-code-this-indicates-an-internal-server-error-on-your-site-please-make-sure-it-is-accessible-and-not-in-maintenance-mode"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Fri Aug 26 2022 12:13:46 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu May 11 2023 13:15:51 GMT+0000 (Coordinated Universal Time)"
---
In order for us to properly start monitoring your application, its response when you first add it must not be a 5xx HTTP status code.

When you put your site in maintenance mode, it will also result in a 5xx HTTP status code and thus will trigger this error.
