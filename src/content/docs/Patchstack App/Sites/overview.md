---
title: "Sites"
excerpt: "Sites overview page for managing your applications"
hidden: false
createdAt: "Mon Jul 25 2022 09:03:10 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Dec 20 2023 13:36:16 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 2
---
On the <a href="https://app.patchstack.com/sites" target="_blank">**Sites**</a> page you see a general overview of all the sites you have added to the Patchstack App.\
<https://app.patchstack.com/sites>

![](@images/patchstack-sites-dashboard.png)

## Overview of all your sites

You can see the quick overview of each of your sites from the <a href="https://app.patchstack.com/software/overview" target="_blank">**Sites**</a> view in Patchstack App.  
Let's go through some more important table columns to explain the data shown.

1. **Status** column shows whether the site is properly connected. Hover over the circle with your cursor, to view  the status of your site connection. Below is the list of possible color indicators:
    - Green circle: Patchstack plugin is properly connected
    - Yellow circle: Firewall is currently out of sync, delayed or turned off
    - Red circle: Patchstack plugin is not connected with your site
2. **Group** column shows what groups that site has been attached to. Attaching your sites to custom groups makes it easier to manage them. For example you could group them by care plan names that you offer.
3. **Protection** column shows you, which protection modules are activated on the site. If you are on a free plan, you can see a toggle which lets you activate the protection on that site. If you have protection enabled, you'll see such modules:
    - VP - <a href="/patchstack-app/protection/patchstack-modules/#vpatches" target="_blank">vPatching module</a>
    - AH - <a href="/patchstack-app/protection/patchstack-modules/#advanced-hardening" target="_blank">Advanced hardening module</a>
    - IP - <a href="/patchstack-app/protection/patchstack-modules/#community-ip-blocklist" target="_blank">Community IP blocklist module</a>
    - OW - <a href="/patchstack-app/protection/patchstack-modules/#generic-owasp" target="_blank">Generic OWASP module</a>
4. **Threats blocked** - this graph is a visual representation of the firewall activity in the last 7 days
5. **Software** column shows how many third party software is installed on this particular site (like plugins, themes or WordPress core)
    - **Vulnerabilities** - how many vulnerabilities are currently present on your website
    - **Outdated** - how many of the third party software are outdated and need updating

## Manage groups

You can define groups, to which your sites can be attached to.
Check [this article](/patchstack-app/sites/site-groups/) for details.

## Search and display

You can use the search-bar, to look up for the sites you have added. After typing, hit the Enter key. Left from the search-bar, you can choose how many sites to display per page.

## Adding a new site

To add a new site, click on **+ Add new** and follow the instructions. You can also see a tutorial of adding a new site [in this article](/patchstack-app/sites/adding-a-site/).

## Removing a site

To delete a site, click on the trashcan icon.  
To delete multiple sites simultaneously, check the according checkboxes, then click **Bulk actions** > **Delete**.  
Check [this article](/patchstack-app/sites/removing-a-site/) for more details.
