---
title: "Sites"
excerpt: "Sites overview page for managing your applications"
hidden: false
createdAt: "Mon Jul 25 2022 09:03:10 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Sep 22 2026 12:00:00 GMT+0000 (Coordinated Universal Time)"
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
4. **Threats blocked** - this graph is a visual representation of the firewall activity in the last 7 days
5. **Software** column shows how many third party software is installed on this particular site (like plugins, themes or WordPress core)
    - **Vulnerabilities** - how many vulnerabilities are currently present on your website
    - **Outdated** - how many of the third party software are outdated and need updating
6. **Last sync** column shows how long ago Patchstack last heard from the site (for example *34m*, *5h* or *9d*). The figure turns amber when the site is delayed (it has gone quiet recently and we are still trying) and red when it is unresponsive (attempts have been failing for some time); hover over it to read what that means for the site. Click the column heading to sort by it, which is the quickest way to find the sites that have been silent longest.

## Status tabs

The tabs above the table filter the list. A site can appear under more than one tab at the same time, so the tab numbers do not add up to your total number of sites.

- **All** — every site you can see.
- **Unresponsive** — sites Patchstack has not heard from in the last 24 hours. This covers both sites that are merely delayed and sites that have stopped answering altogether, because in each case the most recent attempt to reach them got nowhere.
- **Vulnerable** — sites carrying a medium or high vulnerability that no vPatch is currently holding off. Out-of-sync sites are left out, because their vulnerability data is stale; they are in **Unresponsive**.
- **Outdated** — sites with outdated software. The same set the dashboard counts under Outdated.
- **Protected** — sites where a vPatch is currently holding off at least one active vulnerability. A protected site with nothing to hold off is not listed here; the **Protection** column is where you see whether protection is on.
- **Threats blocked** — sites whose firewall has blocked attacks.

## Retrying a sync

A site normally reports in on its own every few hours. When one falls behind, you can ask it to sync right away instead of waiting for the next attempt.

- **One site** — open the **Action** menu at the end of its row and choose **Retry sync**.
- **Some sites** — tick their checkboxes and click **Retry sync** in the bar above the table.
- **Every site that is behind** — click **Retry sync** next to the status tabs. The number on the button is the number of sites in the **Unresponsive** tab, and the retry covers all of them, not only the ones on the page you are looking at.

Retrying many sites runs in the background, so you can leave the page while it works. While it runs, the button shows how many sites have been reached so far, and a message tells you how many sites were asked to sync once it is done.

A site that stays unresponsive after a retry has usually lost its connection to Patchstack — check that the Patchstack plugin is still installed and activated, and see [this article](/faq-troubleshooting/firewall/app-is-showing-the-firewall-of-my-site-as-delayed/) for the usual causes. Being out of sync does not leave the site unprotected: the rules from its last successful sync stay in place and keep blocking.

Sites built with Pulse do not have a **Retry sync** option. They report their packages when they are next built, and nothing in the app can bring that build forward.

## Manage groups

You can define groups, to which your sites can be attached to.
Check [this article](/patchstack-app/sites/site-groups/) for details.

## Labels on a site

Most sites carry no label at all. A label appears when there is something about the site worth knowing before you read the rest of its row.

- **Not deployed** — Patchstack has never heard from this app: no build has reported its packages and no visitor's browser has checked in. If you know the app is live, the most likely reason is that the connector was not running in the build that went out — rebuild with `@patchstack/connect` installed and it will report on the next deploy. Only appears on sites built with Pulse.
- **Connector deleted** — `@patchstack/connect` reported that it had been removed from the project. Nothing is watching the app's packages any more, and the site keeps using one of your site slots until you delete it here.
- **Not seen on live site** — nothing signalled a removal, but the live page no longer carries Patchstack. This is what a removal done through a prompt looks like: we can see the result without being told. Reinstall the connector, or delete the site to free its slot.
- **Build** — this site is a build or staging environment of another site, shown indented beneath it.
- **Shared** — you reach this site through an organisation you are attached to, rather than owning it yourself.

## Search and display

You can use the search-bar, to look up for the sites you have added. After typing, hit the Enter key. Left from the search-bar, you can choose how many sites to display per page.

Two switches beside the platform filter narrow the list to the sites carrying the labels above:

- **Not deployed** — apps that have never reported in.
- **Connector deleted** — sites whose connector told us it had been removed. Sites labelled *Not seen on live site* are not included: that state is worked out from several signals rather than recorded, so there is no exact set to filter on.

Both can be on at once, in which case you get the sites that are both. The switches only appear on accounts with Pulse, since only apps deploy.

## Adding a new site

To add a new site, click on **+ Add new** and follow the instructions. You can also see a tutorial of adding a new site [in this article](/patchstack-app/sites/adding-a-site/).

## Removing a site

To delete a site, click on the trashcan icon.  
To delete multiple sites simultaneously, check the according checkboxes, then click **Bulk actions** > **Delete**.  
Check [this article](/patchstack-app/sites/removing-a-site/) for more details.
