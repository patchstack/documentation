---
title: "Error: You have entered an incorrect reCAPTCHA value on Login Page"
slug: "error-you-have-entered-an-incorrect-recaptcha-value-on-login-page"
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
Go to the /wp-content/plugins folder via FTP (http://codex.wordpress.org/FTP_Clients);
</li><li>
Find and rename “patchstack” folder into “webarx1”;
</li><li>
After you log into your dashboard, you can rename the folder back from "webarx1" to "patchstack" and disable reCaptcha from Patchstack plugin settings.</li></ol>
