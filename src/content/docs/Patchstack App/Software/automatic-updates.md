---
title: "Automatic updates"

excerpt: "Update your software automatically"
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Jul 25 2022 09:06:05 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 13 2023 15:30:24 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 4.2
---
_Automatic updates feature is available for all Patchstack users._  
**_This feature is available for WordPress sites only._**

Navigate to the automatic updates page by visiting **Software** > **Automatic updates**, or click here: [https://app.patchstack.com/software/updates](https://app.patchstack.com/software/updates)

On the **Automatic updates** subpage, you can see which of your sites have auto-updates enabled. You can turn automatic updates for each of your sites on / off.  
Patchstack also has an option to only auto-update such software that has any vulnerabilities detected.

For each site, you have the following options:

<ol><li>Auto-update only vulnerable components (recommended)
 - this option includes core versions, plugins and themes</li>
<li>Auto-update WordPress core (whenever update is available)</li>
<li>Auto-update plugins (whenever update is available)</li>
<li>Auto-update themes (whenever update is available)</li>
</ol>

![](@images/patchstack-software-automatic-updates.png)

## Turning on the auto-updates

To turn on the **auto-updates** feature, click the **Change** button of the corresponding site in the table.  
You will be shown a popup, which lets you toggle auto-updates for:
* Only vulnerable software versions
* For all WordPress core versions (whenever update is available)
* For all plugin versions (whenever update is available)
* For all theme versions (whenever update is available)

To activate any of the options, toggle the buttons. (see the image below).

![](@images/patchstack-software-auto-update-settings.png)

> ❗️ Note that auto-updating won't work for some of the premium plugins or themes as these may not use standard updating mechanisms (for example some software requires a separate licnese checking call)

> ‼️ Note that updating software could potentially break your site, but for security reasons, it is recommended to still auto-update at least your vulnerable software components.

After toggling the buttons, click **Update**.
