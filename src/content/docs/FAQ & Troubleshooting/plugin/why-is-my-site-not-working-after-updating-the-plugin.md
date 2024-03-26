---
title: "Why is my site not working after updating the plugin?"
slug: "docs/why-is-my-site-not-working-after-updating-the-plugin"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Aug 23 2022 12:38:08 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Aug 23 2022 12:38:08 GMT+0000 (Coordinated Universal Time)"
---
In certain environments, PHP might have the OPCache extension installed which caches PHP scripts. If you update the plugin, it's possible that a part of the PHP files of the Patchstack plugin is still cached and another part is no longer in the cache. This will cause fatal errors.

A solution to this is to restart the web server and/or PHP on your server.

If this does not fix the issue, please start a new chat with us and provide us with PHP errors from the error logs that are related to Patchstack.
