---
title: "Overview"

excerpt: "General overview of protection settings and logs across your sites"
hidden: false
createdAt: "Thu Jan 04 2024 14:16:59 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jan 18 2024 14:21:19 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 5.00
---
_General protection is available for all Patchstack paid plan users._

Navigate to the general protection overview page by visiting **Protection** from the navigation menu, or click here: [https://app.patchstack.com/protection/overview](https://app.patchstack.com/protection/overview)

On this page, you can:
* Manage the protection modules across all your sites
* See the firewall blockings data across all your sites
* See the firewall log history across all your sites

![](@images/patchstack-protection-overview.png)



### Protection modules

A module is a collection of firewall rules managed by Patchstack. Assign modules to your sites to protect them. Three managed modules are shown as cards:

* **RapidMitigate** — one card for every platform Patchstack protects (WordPress, Drupal, npm-based apps). It shows how many mitigation rules are currently deployed on your sites out of the total available, and how many sites are attached.
* **Community IP blocklist** — shows the number of blocklisted IPs and attached sites.
* **WordPress Hardening** — shows the number of rules included and attached sites. WordPress sites only.

A module's icon is green when it is attached to at least one site and grey when it is not.

Click the green **Manage** button on a card to open the **Attach sites to module** panel. In the panel you can:

* Search for a site by its URL, or by the name of a package (plugin, theme or npm dependency) installed on it.
* Filter the site list by platform, and sort it by newest, oldest or alphabetically.
* Toggle the module on or off per site. Sites the module cannot apply to (for example a Drupal site under WordPress Hardening) are greyed out.
* Toggle the module on or off per group. A module attached to a group is also applied to any site that joins the group later.

Click **Done** to save your changes.  
[📖 Read more about the protection modules here.](/patchstack-app/protection/patchstack-modules/)

### Activity

From this section, you see, how many times did Patchstack firewall block the traffic for potential threats across all your sites.  
By default, it shows the results for the last 30 days. You can also choose to show it last 7 days, or 60 days, by clicking on the filter at the top right corner of this section.  
On the right side of the protection activity section, Patchstack App shows the top 5 IP's blocked, and top 5 threats blocked in the given period of time.

![](@images/patchstack-protection-activity.png)

### Log history

Each hacking attempt or attack is shown as a separate log entry. You can click on any log entry to view more details about the particular blocking. You can use the filters and search bar, to find entries of particular application, IP or URL from the protection log history. 

To see the details of any attack, click on a table row. A popup with details opens next.

![](@images/patchstack-protection-log-history.png)