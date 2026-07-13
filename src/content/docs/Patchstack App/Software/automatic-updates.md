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
:::danger[Deprecated]
The automatic updates feature has been deprecated and is no longer available in the Patchstack app. The **Software** > **Automatic updates** page has been removed. If automatic updates were previously turned off, they can no longer be re-enabled.

The information below is kept for historical reference only and no longer describes functionality available in the app.
:::

_The automatic updates feature was previously available for all Patchstack users._  
**_This feature was available for WordPress sites only._**

The automatic updates page was previously found under **Software** > **Automatic updates**. This page has since been removed and is no longer accessible.

On the **Automatic updates** subpage, you could see which of your sites had auto-updates enabled, and turn automatic updates for each of your sites on / off.  
Patchstack also had an option to only auto-update such software that had any vulnerabilities detected.

For each site, the following options were available:

<ol><li>Auto-update only vulnerable components (recommended)
 - this option includes core versions, plugins and themes</li>
<li>Auto-update WordPress core (whenever update is available)</li>
<li>Auto-update plugins (whenever update is available)</li>
<li>Auto-update themes (whenever update is available)</li>
</ol>

![](@images/patchstack-software-automatic-updates.png)

## Turning on the auto-updates

The steps below describe how the (now removed) auto-updates feature previously worked and are no longer actionable.

To turn on the **auto-updates** feature, you would click the **Change** button of the corresponding site in the table.  
You would then be shown a popup, which let you toggle auto-updates for:
* Only vulnerable software versions
* For all WordPress core versions (whenever update is available)
* For all plugin versions (whenever update is available)
* For all theme versions (whenever update is available)

To activate any of the options, toggle the buttons. (see the image below).

![](@images/patchstack-software-auto-update-settings.png)

> ❗️ Note that auto-updating won't work for some of the premium plugins or themes as these may not use standard updating mechanisms (for example some software requires a separate licnese checking call)

> ‼️ Note that updating software could potentially break your site, but for security reasons, it is recommended to still auto-update at least your vulnerable software components.

After toggling the buttons, click **Update**.
