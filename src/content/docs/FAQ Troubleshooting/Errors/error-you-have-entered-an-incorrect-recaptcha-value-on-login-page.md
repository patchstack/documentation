---
title: "Error: You have entered an incorrect reCAPTCHA value on Login Page"

excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Fri Aug 26 2022 11:29:39 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Aug 26 2022 11:29:39 GMT+0000 (Coordinated Universal Time)"
---
<b>Solution 1:</b> The easiest solution is to clear the cache, try to login from a different browser or incognito/private browser mode.

<b>Solution 2:</b> If the first solution doesn't work, it is necessary to deactivate the plugin manually. Please complete the following steps:

<ol><li>
Go to the /wp-content/plugins folder via FTP (<a href="https://developer.wordpress.org/advanced-administration/upgrade/ftp/" target="_blank">see different FTP clients here</a>);
</li><li>
Find and rename “patchstack” folder into something else, like “deactivate_patchstack”;
</li><li>
After you log into your dashboard, you can rename the folder back from "deactivate_patchstack" to "patchstack";</li><li>
Disable reCAPTCHA from the settings in Patchstack App, by navigating to <br> <b>Patchstack App</b> > <b>Sites</b> > <b>yoursite.com</b> > <b>Hardening</b> > <b>Captcha</b></li></ol>
