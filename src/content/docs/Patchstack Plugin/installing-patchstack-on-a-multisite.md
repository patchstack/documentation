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
4. Click on **Or sync manually** link and copy the API key


## Step #2 — Install the plugin
1. Go to your WordPress Network Admin and navigate to **Plugins** > **Add New Plugin**
2. Search for "Patchstack"
3. Install the "Patchstack – WordPress & Plugins Security" plugin
4. Once the plugin is installed, click **Activate**
5. You will then see screen as such:
![](@images/patchstack-multisite-installation-screen.png)
6. Click on the last link in this box, then paste the API key to that field, and click "Sync"
7. Your main site is now connected and synchronized with Patchstack
8. You should see a success screen in Patchstack App and in your plugin as well


## Step #3 - Connecting the subsites

To connect the subsites, repeat the process in **step 1** - add your site to Patchstack App, and then get the plugin API key.
1. In your Network Admin, navigate to **Patchstack** > **Sites**
2. You'll see screen as such: ![](@images/patchstack-multisite-plugin-settings.png)
3. To add an API key to the corresponding site, click "Settings page" and add the API key the same way as you did for the main site


## Rerunning the database migration
In some certain scenarios, you may encounter database errors on your error logs about Patchstack database tables, when running the multisite environment. For that, you will need to rerun the database migrations. 

This can be done when you navigate to: **Network Admin** > **Patchstack** > **Sites** and click on **Rerun Database Migration** from there for your sites.


## Conclusion

You will have to add every subsite separately to the Patchstack App and insert the plugin API keys to every subsite.
After adding a site successfully, you'll see stats of your site on your WordPress admin.
![](@images/patchstack-plugin-connected.png)

If you need further help, don’t hesitate to reach out to us via live chat at the bottom right corner!