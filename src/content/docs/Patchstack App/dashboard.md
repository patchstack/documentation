---
title: "Dashboard"

excerpt: ""
hidden: false
createdAt: "Wed Oct 18 2023 12:41:44 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Dec 12 2023 12:31:21 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 1
---
To access the dashboard, click on **Dashboard** from the left menu.

**Dashboard** shows you a general overview of all your WordPress sites:

![](@images/patchstack-dashboard-view-populated.png)

## Vulnerabilities section

![](@images/patchstack-dashboard-vulnerabilities-section.png)

Vulnerabilities section shows you a general overview about all the vulnerabilities currently present on each of your WordPress sites. The vulnerabilities are divided into different groups, which indicate the patching priority.

**High priority** - these software versions are expected to be mass-exploited or have already known to be exploited vulnerabilities. It's important to patch those by updating the software to patched versions and/or enabling Patchstack firewall, which applies vPatches automatically.

**Medium priority** - these software versions are not expected to be mass-exploited, but could potentially be exploited in more targeted attacks. It's important to patch those by updating the software to patched versions and/or enabling Patchstack firewall, which applies vPatches automatically.

**Low priority** - these software versions are not expected to be exploited. Low patch priority vulnerabilities won't receive a vPatch from Patchstack.

## Vulnerability information and filtering

You can use the search bar to find vulnerabilities of specific site, or search vulnerabilities by description.

![](@images/patchstack-filters.png)

**Priority filter** - find vulnerabilities by patch priority. You can filter by high, medium and low patch priority vulnerabilities.

**Severity filter** - find vulnerabilities by <a href="/faq-troubleshooting/other/what-is-the-cvss-score/" target="_blank">CVSS severity score</a>. You can filter by critical, high, medium, low severity.

**Exploited** - filter out the vulnerabilities that are know to be exploited.

There are several icons on each vulnerability. Below is a list of what each icon means.

### List of vulnerability icons with descriptions

<style>
.icon-row-container {
  display: block;
}
.icon-row {
  display: grid;
  grid-template-columns: 120px auto;
  align-items:center;
}
</style>

<div class="icon-row-container">
<div class="icon-row">
  <div>

  ![](@images/7d6df8c-Patchstack_no_update_available.png)

  </div>
  <div>

  **No update available**  
  This software is found vulnerable, but it has no updates yet. It is recommended to turn on Patchstack firewall, or to disable and remove this plugin until update is available.

  </div>
</div>
</div>

***

<div class="icon-row-container">
<div class="icon-row">
  <div>

  ![](@images/0ffffa6-patchstack_updates_available.png)
  
  </div>
  <div>

  **Update available**  
  This plugin has an update available. It is recommended to do this immediately as new software versions usually come with patched code (in case it is found vulnerable).

  </div>
</div>
</div>

***

<div class="icon-row-container">
<div class="icon-row">
  <div>

  ![](@images/3a9cb28-patchstack_high_patch_priority.png)

  </div>
  <div>

  **High patch priority**  
  Red exclamation mark indicates that this software version is expected to be mass-exploited or has already known to be exploited vulnerability. It is recommended to turn on Patchstack firewall as high patch priority vulnerabilities receive a vPatch from Patchstack. Update this software as soon as possible.

  </div>
</div>
</div>

***

<div class="icon-row-container">
<div class="icon-row">
  <div>

  ![](@images/cb98b42-patchstack_medium_patch_priority.png)

  </div>
  <div>

  **Medium patch priority**  
  Yellow exclamation mark indicates that this software version is not expected to become mass-exploited, but could potentially be exploited in more targeted attacks. It is recommended to turn on Patchstack firewall as medium patch priority vulnerabilities receive a vPatch from Patchstack. Update this software as soon as possible.

  </div>
</div>
</div>

***

<div class="icon-row-container">
<div class="icon-row">
  <div>

  ![](@images/e5df8d4-patchstack_low_patch_priority.png)

  </div>
  <div>

  **Low patch priority**  
  Gray exclamation mark indicates that this software version is not expected to become exploited. It is important to update this software when possible, although the security risk is very low. Low patch priority vulnerabilities won't receive a vPatch from Patchstack.

  </div>
</div>
</div>

***

<div class="icon-row-container">
<div class="icon-row">
  <div>

  ![](@images/236fdf6-patchstack_cvss_score.png)

  </div>
  <div>

  **CVSS score**  
  These numbers represent the CVSS score given to the vulnerability. The higher the CVSS score, the more severe is the vulnerability.  
  Low (0.0 - 3.9); Medium (4.0 - 6.9); High (7.0 - 8.9); Critical (9.0+)

  </div>
</div>
</div>

## Threats blocked section

![](@images/patchstack-threats-blocked-section.png)

In the **Threats Blocked** section you can see a graph, which shows you how many attacks have been blocked by Patchstack across all your sites in total.  
On the top right corner, you can choose the time period (7 days, 1 month, 6 months or 1 year).  
On the left side, you see the number of attacks.

By moving the cursor across the graph, you can see the number of attacks by day.

## Sites

In the **Sites** section, you see a quick overview of how many sites you have added to Patchstack, and how many of them have any outdated or vulnerable components.  
You can add new websites(s) when you click the **"+ Add new"** button. It will trigger a popup with steps to take to add more websites.

## Software

In the **Software** section, you can see how many software components your sites have in total.  
The next number shows how many of these are vulnerable.  
The third number shows how many of these components are disabled.

## Reports

In the **Reports** section, you can see how many reports have been scheduled and how many are available to download.
