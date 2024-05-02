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

This can happen due to two reasons:
* This is a premium or pro plugin and uses its own update server configuration
* Your site is out of sync with the Patchstack App

The information we show about the plugin status in Patchstack App, is synced straight from your WordPress site.


### 1. This is a premium / pro-licensed plugin

If the plugin shows that it is up-to-date in the Patchstack App, but in reality it is not, then it means that this plugin does not utilize the regular WordPress.org update server but the plugin has its own update server connection integrated. The integration varies and in some cases it does not store the new version in the database, but rather shows it real-time only when you visit the backend of your WordPress site.


### 2. Your site is out of sync with Patchstack App

A missing or wrong version may also show up if your WordPress site is out of sync with the Patchstack App.

* Make sure your site is publicly accessible (so Patchstack can access it)
* Check if you have the correct Patchstack API key inserted into the Patchstack plugin. 
Navigate to wp-admin > Settings > Security.
* Make sure that you don't use the same API key across multiple sites
* Make sure that the site URL you have entered on Patchstack App is correct