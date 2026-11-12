---
title: "How to uninstall"

excerpt: ""
hidden: false
metadata: 
  robots: "index"
createdAt: "Wed Dec 21 2022 17:45:01 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Nov 12 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 6
---
You can deactivate and uninstall the Patchstack plugin just like any other WordPress plugin.  
We recommend uninstalling it from the WordPress admin panel to have the plugin and its data correctly removed from the server (files and database entries).

Uninstalling removes most Patchstack options and its log tables for the site being cleaned up. It deliberately retains connection credentials, CAPTCHA settings and attack counters in the options table. User 2FA enrollment is stored separately in user metadata. Reinstalling therefore does not start with a completely empty configuration.

To deactivate, go to your **Plugins** page, find **Patchstack Security**, click on **Deactivate** and then **Delete**

![](@images/6e81bdf-Patchstack_delete_plugin.jpg)
