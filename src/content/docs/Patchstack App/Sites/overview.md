---
title: "Sites"

excerpt: "Sites overview page for managing your applications"
hidden: false
createdAt: "Mon Jul 25 2022 09:03:10 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Dec 20 2023 13:36:16 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 2
---
On the **Sites** page you see a general overview of all the sites you have added to the Patchstack App!
![](@images/patchstack-sites-dashboard.png)

## Overview of your WordPress sites

You can see the quick overview of each of your WordPress site from the **Sites** view.  
Let's go through some more important table columns to explain the data shown.

- **Status** - shows whether the site is properly connected. Hover over the dot with your cursor, to see extra details
  - Green: Patchstack plugin is properly connected
  - Yellow: Firewall has been turned off
  - Red: Patchstack plugin is not connected
- **Group** - shows to which groups that site has been attached to. Attaching your sites to custom groups makes it easier to manage them. For example you could group them by care plans you offer.
- **Protection** - shows which protection modules are activated for the site. Note that if you are not on any paid plan, you can see a toggle which lets you activate the protection on that site. Otherwise:
  - VP - vPatching module
  - AH - Advanced hardening module
  - OW - Generic OWASP module
  - IP - Community IP blocklist module
- **Threats blocked** - this graph is a visual representation of the firewall activity in the last 7 days
- **Software** - how many third party software is installed in this particular site (like plugins, themes or WordPress core)
- **Vulnerabilities** - how many vulnerabilities are currently present on your website
- **Outdated** - how many of the third party software are outdated and need updating

## Manage groups

You can attach your applications to the groups that you can define.  
Check [this article](/patchstack-app/my-apps/application-groups/) for details.

## Search and display

You can use the search-bar, to look up for the applications you have added. After typing, hit the Enter key.  
Left from the search-bar, you can choose how many applications to display per page.

## Adding a new site

To add a new WordPress site, click on **+ Add new** and follow the instructions. You can also see a tutorial of adding a new site [in this article](/patchstack-app/my-apps/adding-a-web-app/).

## Removing a site

To delete a site, click on the trashcan icon.  
To delete multiple sites simultaneously, check the according checkboxes, then click **Bulk actions** > **Delete**.  
Check [this article](/patchstack-app/my-apps/removing-a-web-app/) for more details.
