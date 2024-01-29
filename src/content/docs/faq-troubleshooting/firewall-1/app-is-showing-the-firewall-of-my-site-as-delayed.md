---
title: "App is showing the firewall of my site as delayed"
slug: "app-is-showing-the-firewall-of-my-site-as-delayed"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Aug 22 2022 13:59:36 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed May 10 2023 13:45:01 GMT+0000 (Coordinated Universal Time)"
---
This firewall error might show up on the Patchstack App.

On the Patchstack App, you might see that the firewall is indicating as being "delayed".  
This can happen due to a few reasons:

<ol><li>Scheduled tasks are not running properly on your web application. We attempt to ping our API from your site every hour. However, since WordPress scheduled tasks run when you have visitors on your site, this might not happen if you have no visitors on your app. It is also possible that scheduled tasks are not running at all on your site even when you have visitors due to an error. You can use a plugin such as <a href="https://wordpress.org/plugins/wp-crontrol/" target="_blank">WP Crontrol</a> to keep track of your scheduled tasks.</li>
<li>You do not have the right API key configured on the license settings page. The API credentials which you can find on the Patchstack App under <b>My Apps</b> > yourdomain.com > Settings. API Keys should match the API credentials on your application at wp-admin > Settings > Security.</li></ol>

One potential solution to reason 1 is to use a server-based scheduled task that triggers your scheduled tasks even when you have no visitors.

<ol><li>Disable the default WordPress cronjob by adding the following to your wp-config.php file in the root folder of your app:
<pre>define('DISABLE_WP_CRON', true);</pre></li>
<li> Set up a cronjob in your hosting account management panel. In CPanel, this can be found under Advanced > Cron Jobs.</li>
<li>Set the interval to something between 5 and 15 minutes.</li>
<li>Set the cron command to the following (change the URL to your own):
<pre>wget -q -O - https://examplesite.com/wp-cron.php?doing_wp_cron >/dev/null 2>&1</pre></li>
<li>Now click on the <b>Create new cron job</b> button.</li></ol>
