---
title: "Multisite installation"

excerpt: ""
hidden: false
metadata: 
  robots: "index"
createdAt: "Tue Mar 07 2023 12:59:59 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed May 10 2023 12:23:51 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 6
---

You can set up Patchstack on each of your network sites as easily as you would set it up on regular WordPress sites.
Keep in mind that each site must be added to the Patchstack App individually and will take up a slot on your account. Every subsite of your multisite network will have an individual API key which has to be inserted correctly.

Here are the steps to take to install Patchstack on your multisite network.

## Step #1 — Adding the site to Patchstack App

To install Patchstack on the multisite network, the easiest way is to do it via the Patchstack App.
1. Navigate to <a href="https://app.patchstack.com/sites" target="_blank">Sites</a> on the Patchstack App and click on **+ Add new** (at the top bar).
2. Type in your domain and click **Continue to plugin sync**
3. You are then shown a popup like this: ![](@images/patchstack-checking-sync-status.png)
4. Click on **Or sync manually** link to get the API key.


## Step #2 — Install the plugin
1. Go to your WordPress admin and navigate to **Plugins** > **Add New Plugin**
2. Search for "Patchstack"
3. Install the "Patchstack – WordPress & Plugins Security" plugin
4. Once the plugin is installed, click **Activate**
![](@images/patchstack-multisite-installation-screen.png)

## Step #3 — Sync the plugin with Patchstack App
1. In WordPress admin menu, under **Patchstack**, click **Sites**
2. Click on **Settings Page** of your main network site
![](@images/patchstack-multisite-plugin-settings.png)
3. If your site is not automatically synced, paste the API key to the corresponding field and click "Sync"
4. You should see a success screen in Patchstack App and in your plugin as well


## Conclusion

You will have to add every subsite separately to the Patchstack App and insert the API keys to every subsite.
After adding a site successfully, you'll see stats of your site on your WordPress admin.
![](@images/patchstack-plugin-connected.png)

If you need further help, don’t hesitate to reach out to us via live chat at the bottom right corner!