---
title: "Overview"

excerpt: "Overview of protection modules and blocked traffic"
hidden: false
createdAt: "Wed Jan 17 2024 13:45:49 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Jan 17 2024 14:17:39 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 3.20
---

_Site protection overview and security solutions are available for all Patchstack paid plan users._  
**_Protection settings and modules are available for WordPress sites only._**

The **Protection overview** subpage is found at **Sites** > **yoursite.com** > **Protection** in Patchstack App.

On the **Protection overview** subpage you can:
* Toggle the protection modules on/off for your site
* See where your site got attacks from
* See how have the hackers tried to attack your site

![](@images/patchstack-site-protection-overview.png)

## Protection modules

Patchstack firewall consists of four types of protection modules, which can be toggled on and off for any protected site. These protection modules also show the number of your sites are attached to each module.
Below are the decriptions for all four protection modules:

### vPatching module

Receive Patchstack's **vPatches** (<a href="https://patchstack.com/articles/virtual-patching/" target="_blank">virtual patches</a>) to protect you sites against attacks targeted for known dangerous vulnerabilities in your sites. **vPatches** are highly specific and strict firewall rules that prevent vulnerabilities from being exploited without changing any of your code.  
<a href="/patchstack-app/protection/patchstack-modules/#vpatches" target="_blank">📖 Read more </a>

### Advanced hardening

The **Advanced hardening** module applies additional security mechanics to the WordPress application to block common malicious requests against WordPress sites.  
<a href="/patchstack-app/protection/patchstack-modules/#advanced-hardening" target="_blank">📖 Read more </a>

### Community IP blocklist

Community IP blocklist blocks access to IP addresses which are known to exploit vulnerabilities. This module contributes threat data back to the Patchstack network.

### Generic OWASP

Generic firewall rules against OWASP top 10 vulnerability types including XSS, SQLi, RCE and for other known exploitation methods. Note, due to its generic nature this module may cause false-positives on more complex sites that use a lot of plugins.  
<a href="/patchstack-app/protection/patchstack-modules/#generic-owasp" target="_blank">📖 Read more </a>

## Activity section

From the **Activity** section of the **Protection overview** page, you see how many times did Patchstack firewall block the traffic for potential threats.  
You can set a filter to show the data from up to 1 year ago.
On the right side of this protection activity section, Patchstack App shows the top 5 IP's blocked, and top 5 threats blocked in the given period of time.

## Log history section

Each hacking attempt or attack is shown as a separate protection log entry. You can click on any log entry to view more details about the particular blocking.

To see the details of any attack, click on a table row. A popup opens next.

![](@images/patchstack-attack-popup.png)
