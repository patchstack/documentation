---
title: "Activity"

excerpt: "See all the basic activity about your WordPress site"
hidden: false
createdAt: "Mon Aug 08 2022 13:05:55 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Nov 12 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 3.4
---
_Activity log is accessible for all Patchstack users._  
**This feature available for WordPress sites only.**

To view your site's activity log, navigate to **Sites** > **yourdomain.com** > **Activity** in Patchstack App.


![](@images/patchstack-site-activity.png)

Patchstack activity log displays a large number of events that occur on your WordPress site. The **Activity** page shows events from the last 12 months (6 months on the Personal plan, 24 months on Enterprise).

We keep your site's activity log data while the site is in your Patchstack account. When you remove the site or delete your Patchstack account, its activity log data is deleted too.

On the **Activity** page, you can:

1. Enable / disable the activity log  
   _Disabling the activity log is useful, when your site has a lot of activity. For example, the activity log database may become too large on dropshipping ecommerce sites, where huge amounts of products are being constantly imported. On such sites, we recommend disabling the activity logs._
2. Enable / disable logging the failed logins  
   _The legacy failed-login setting is retained for compatibility. In the current plugin, failed-login audit events follow the main activity logger; this switch does not control login-ban enforcement._
3. Enable / disable uploading the failed login logs to Patchstack  
   _This will sync the failed login entries from WordPress activity logs database to Patchstack App logs_
4. See, what sort of activities have been done on the site.
5. Search for activities by username or IP addresses

## Local logging and login bans

The optional IP-based login ban has its own setting and local counters. It continues to work when activity logging or failed-login uploads are disabled. Ban evidence is retained while needed, so a successful log upload does not remove an active ban. See [Login protection](/patchstack-app/site-dashboard/hardening/app-hardening-login-protection/).

Local logs waiting for the API are different from activity already stored in Patchstack App. The plugin retries failed delivery, but cleans up undelivered activity and firewall entries older than seven days, except records still needed to enforce a ban. This cleanup also applies to a backlog present before upgrading; it does not delete activity already received by the App.
