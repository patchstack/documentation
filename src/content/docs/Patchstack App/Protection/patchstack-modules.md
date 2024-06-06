---
title: "Patchstack protection modules"

excerpt: "Patchstack provides managed modules which you can enable on your site."
hidden: false
createdAt: "Fri Nov 17 2023 10:20:26 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jan 18 2024 14:22:20 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 5.10
---
## Introduction

Patchstack modules are modules managed by us and regularly updated to contain the latest vPatch definitions. Below contain the modules which you can enable on your sites with a description about its functionality.

### vPatches

This module contains all the vPatches that protect you against plugin, theme and WordPress vulnerabilities for which we generated a vPatch. These vPatches match against specific conditions in the request to ensure a as low as possible false positive rate.

For example, a vPatch for a plugin vulnerability which allows someone to export all orders due to the plugin not implementing proper authorization checks may contain the following conditions:

- If the requesting URL contains /wp-admin/index.php?export_orders=1
- AND
- If the current authenticated user is not a Shop Manager or Administrator
- THEN
- Block request

This allows us to block specific attacks without it affecting users who still may need to access the ability to export orders.

### Advanced Hardening

This module contains protection rules that protect you against commonly seen attacks that target WordPress sites. Some examples of the protection rules that are part of this module are listed below. All of them are not executed against users who are logged in as administrator.

These protection rules could cause false positives with remote WordPress management tools, in particular the protection rules that block settings from being changed by unauthenticated users.

- Block file uploads containing .php and .html extensions.
  - These attacks attempt to upload .php backdoors to gain full access to your site.
- Block requests that contain wp-config.php anywhere in the URL or form payload.
  - These attacks attempt to read or write to your wp-config.php file to steal your WordPress salts and database information.
- Block requests that contain default_role and administrator.
  - These attacks attempt to change the default registration role to administrator so new accounts are immediately granted the administrator privilege.
- Block requests that contain users_can_register.
  - These attacks attempt to enable the registration feature by setting the users_can_register WordPress option to 1. Malicious people usually do this together with changing the default registration role.
- Block requests that contain \_capabilities and administrator.
  - These attacks attempt a user to change their own privilege from a lower privilege, such as subscriber, to that of an administrator.
- Block requests that contain wp_is_mobile in the browser user agent (spoofed).
  - At one point a large number of premium plugins/themes from a vendor contained a backdoor that got triggered with this string in the user agent. We block attacks if this is present.

### Community IP Blocklist

Community IP blocklist blocks access to IP addresses which are known to exploit vulnerabilities. This module contributes threat data back to the Patchstack network.

### Generic OWASP

This module contains protection rules that protect you against requests that contain certain patterns that match the <a href="https://owasp.org/www-project-top-ten/" target="_blank">OWASP top 10</a> ruleset.

This provides very aggressive protection and has a higher chance of false positives, so it is only recommended to enable this on sites with a low number of plugins and do not run some sort of e-commerce environment such as WooCommerce.
