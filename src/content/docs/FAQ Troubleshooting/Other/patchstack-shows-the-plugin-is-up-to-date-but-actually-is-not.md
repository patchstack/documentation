---
title: "Patchstack shows the plugin is \"Up to date\" but actually is not"

excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Thu May 2 2024 13:47:49 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu May 2 2024 13:47:49 GMT+0000 (Coordinated Universal Time)"
---

This can happen mostly due to two reasons:
* This is a premium or pro-licensed plugin and uses different updating mechanisms compared to normal plugins
* Your site is out of sync with Patchstack App

The information we show about the plugin status in Patchstack App, is synced straight from your WordPress site.


## Case 1: This is a premium / pro-licensed plugin

If the plugin in Patchstack App shows **Up to date**, but in reality it isn't - then it simply means that this plugin uses some sort of custom version handling mechanism. The plugin version active on your site cannot be properly compared with the newest version number in the plugin vendor server.


## Case 2: Your site is out of sync with Patchstack App

If your WordPress site has fallen out of sync, there could be many plugins/themes that show incorrect version numbers in Patchstack App. Make sure that:
* Your site is publicly accessible (so Patchstack can access it, too)
* You have a correct Patchstack API key inserted into the Patchstack plugin. Navigate to wp-admin > Settings > Security
* Make sure that you don't use the same API key across multiple sites
* Make sure that the URL you have entered into Patchstack App is correct