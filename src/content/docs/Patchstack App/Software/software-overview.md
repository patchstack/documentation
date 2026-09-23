---
title: "Overview"

excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Jul 25 2022 09:05:51 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Sep 23 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 4
---
_The Packages overview is accessible for all Patchstack users._  

Navigate to it by clicking **Packages** in the navigation menu, or go to
[https://app.patchstack.com/packages/overview](https://app.patchstack.com/packages/overview).

The **Packages** overview lists every component your sites use — plugins, themes, WordPress core, PHP and database versions, and the npm packages of your JavaScript apps — with **one row per package**, however many sites it is installed on. Plugins and themes that are grayed out are deactivated on every site that has them.

![](@images/patchstack-software.png)

## What the columns mean

| Column | What it shows |
|--------|---------------|
| **Type** | Plugin, Theme, WordPress, PHP, npm and so on. |
| **Package** | The package name. A warning icon next to it carries a note about the package, such as two packages sharing a slug. |
| **Installs** | How many of your sites have the package. The bar splits those installs three ways: **green** — protected, a virtual patch is blocking the known vulnerability; **grey** — no known issues; **red** — vulnerable and not protected. When some installs are red, the count of them is shown as **N exposed**: those are the ones that need you. |
| **Latest version** | The newest version Patchstack knows of. The green part of the bar is the share of your installs already on it; the rest are behind. |
| **License** | The package's licence. Known for npm packages; WordPress plugins and themes show N/A. |
| **Repository** | Where the package's source lives — the wordpress.org page for plugins, themes and core, or the repository the npm registry lists. |
| **VDP** | **Managed** when the product runs a vulnerability disclosure program with Patchstack, linking to its page in the Patchstack database. |

Click a row to see every site the package is installed on, with the version each site runs.

## Narrowing the list

The tabs above the table filter it by status — **Vulnerable**, **Update now**, **Mitigated**, **Threats blocked**, **Deactivated** and **Advised to replace** — each with its count. Search by package name, package slug or site, and use the platform selector to show only WordPress, Drupal or npm packages.

## Updating the software

You can update WordPress plugins, themes and core from this page. Keep in mind to back up your files and databases before doing that.

- To update everything that is outdated in the current view, narrow the list (a tab, a search or a platform), then choose **Actions** > **Update all outdated** at the end of the toolbar.
- To update a package on particular sites, click its row and update from the list of sites.

npm packages are not updated from Patchstack: change the version in your own project and redeploy.
