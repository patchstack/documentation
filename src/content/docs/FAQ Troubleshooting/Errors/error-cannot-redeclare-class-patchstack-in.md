---
title: "Error: \"Cannot redeclare class Patchstack in…\""
excerpt: "How to act, when the Patchstack plugin causes a fatal error on your site"
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Aug 22 2022 12:50:37 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu May 11 2023 11:11:53 GMT+0000 (Coordinated Universal Time)"
---
There are many reasons why this can happen, usually, it's because of an .htaccess issue or because the Patchstack plugin does not work properly with one of your other plugins.

First, please copy and paste the PHP error that you are facing and send it to us through our chatbox at the bottom right corner of the page. This will help us to resolve your issue.

Secondly, if you can still access your WordPress admin panel, go to **Plugins** > **Security** > **Deactivate**. After that, if your site still shows the fatal error, go back to **Plugins** and click **Delete** under **Patchstack Security**.

If you cannot access your WordPress admin area at all, we recommend deleting the plugin manually. For that, follow the instructions [here](/faq-troubleshooting/plugin/how-to-delete-the-patchstack-plugin-manually/).

Possible fatal errors:  
"Fatal error: Cannot redeclare class Patchstack in…"
