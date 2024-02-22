---
title: "Overview"
slug: "docs/app-protection-overview"
excerpt: "Overview of protection modules and blocked traffic"
hidden: false
createdAt: "Wed Jan 17 2024 13:45:49 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Jan 17 2024 14:17:39 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 3.20
---
:::note
Accessible for the Community (paid), Developer and Business plan users.
:::

On the **Protection Overview** page you can see where your site got attacks from, and how have the hackers tried to attack your web application.

![](@images/d3be1da-patchstack-app-protection.png)

## Protection modules

Patchstack firewall consists of four types of protection modules, which can be toggled on and off for any protected site. The protection modules also show, how many of your apps are attached to each module.

### vPatching Module

Receive **vPatches** for known dangerous vulnerabilities in your applications. **vPatches** are highly specific and strict firewall rules that prevent vulnerabilities from being exploited without changing any code.  
<a href="https://docs.patchstack.com/docs/patchstack-modules#vpatches" target="_blank">📖 Read more </a>

### Advanced Hardening

The **Advanced Hardening** module applies additional security mechanics to the WordPress application to block common malicious requests against WordPress sites.  
<a href="https://docs.patchstack.com/docs/patchstack-modules#advanced-hardening" target="_blank">📖 Read more </a>

### Community IP Blocklist

Community IP blocklist blocks access to IP addresses which are known to exploit vulnerabilities. This module contributes threat data back to the Patchstack network.

### Generic OWASP

Generic firewall rules against OWASP top 10 vulnerability types including XSS, SQLi, RCE and for other known exploitation methods. Note, due to its generic nature this module may cause false-positives for more complex applications.  
<a href="https://docs.patchstack.com/docs/patchstack-modules#generic-owasp" target="_blank">📖 Read more </a>

## Activity

From the **Activity** section, you see, how many times did Patchstack firewall block the traffic for potential threats.  
You can set a filter to show the data about up to 60 days.  
On the right side of the protection activity section, Patchstack App shows the top 5 IP's blocked, and top 5 threats blocked in the given period of time.

## Log history

Each hacking attempt or attack is shown as a separate protection log entry. You can click on any log entry to view more details about the particular blocking.

To see the details of any attack, click on a table row. A popup opens next.

![](@images/d2fe03e-attack-popup.png)
