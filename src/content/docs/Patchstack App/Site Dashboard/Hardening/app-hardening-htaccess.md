---
title: "Htaccess"

excerpt: ""
hidden: false
createdAt: "Thu Jan 18 2024 11:55:42 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jan 18 2024 12:02:52 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 3.31
  label: ".htaccess"
---
_.htaccess settings are available for all Patchstack paid plan users._  
**_Protection is available for WordPress sites only._**

Hardening rules are extra firewall settings, that can be tweaked according to your needs.
To manage your site's .htaccess settings, navigate to **Sites** > **yourdomain.com** > **Hardening** > **.htaccess** in Patchstack App.


![](@images/patchstack-hardening-htaccess.png)

## .htaccess features

On the **.htaccess features** block you can modify some of your site settings and modify the .htaccess file.

Settings you can manage on this page:

<ul>
<li>Add security headers - toggle this, and Patchstack adds basic security headers to your .htaccess file</li>
<li>Prevent default WordPress file access - this feature blocks access to such files as license.txt, readme.html and wp-config-sample.php files</li>
<li>Block access to debug.log file - check this if you want to block access to debug.log file that WordPress creates when debug logging is enabled</li>
<li>Disable index views - disables directory indexing and file listings</li>
<li>Forbid proxy comment posting</li>
<li>Prevent image hotlinking</li>
</ul>

## Writing custom .htaccess rules

In case you wish to write custom .htaccess rules to the file, you can insert your rules to **Custom .htaccess rules** textfield.  
Additionally, you can select if your written rules appear before or after the Patchstack rules in the .htaccess file.

Please note that in case your custom .htaccess rules would break your website, Patchstack will automatically remove them and revert the .htaccess to the previous working state.

Having done all your changes, click on **Save settings** at the bottom of this section.
