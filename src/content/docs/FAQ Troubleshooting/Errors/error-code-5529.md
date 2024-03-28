---
title: "Error Code 5529"

excerpt: ""
hidden: false
createdAt: "Tue Jul 11 2023 11:51:08 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jan 18 2024 14:16:08 GMT+0000 (Coordinated Universal Time)"
---
This error usually means that the visitor got blocked because of a malicious request received by your server.  
If you are sure, it was a false positive blocking, you may whitelist the payload that got blocked.

We recommend you to check the firewall logs on your site. To open the firewall log:

1. Go to Patchstack App > yourdomain.com
2. Open the **Protection** tab
3. Now, from the firewall log, open the log entry which has the IP of the person who got blocked
4. Copy the part of the payload that should be whitelisted. 

Example payload looks like this: `[action] => edit_post`

To whitelist a payload: 

1. Navigate to **Protection > Additional Settings** tab of your site on Patchstack App
2. Into the Whitelist textbox, type "PAYLOAD:[action] => edit_post"
3. Click Save Settings

If done correctly, the visitor should not get blocked with such request anymore.

If you have any questions regarding this error, feel free to chat with our live support on the website.
