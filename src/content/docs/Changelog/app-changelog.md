---
title: "App Changelog"
slug: "docs/app-changelog"
excerpt: "These are all the changes made to the app (portal) in the past."
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Jul 25 2022 09:32:03 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Aug 09 2022 09:51:38 GMT+0000 (Coordinated Universal Time)"
---
<b>August 5th 2022</b>

<ul><li>Version 2.1.20</li>
<li>Fixed: A synchronization bug when a plugin is deactivated or deleted.</li>
<li>Changed: documentation URL structure.</li></ul>

<b>June 8th 2022</b>

<ul><li>Version 2.1.19</li>
<li>Fixed: Patchstack being blocked from the country blocking feature.</li>
<li>Fixed: Scheduled tasks that perform events will now show as "WPCron" in the activity logs.</li>
<li>Fixed: Added more attributes which can be updated remotely, primarily for debugging purposes.</li>
<li>Changed: Bumped WordPress supported version to 6.0.</li></ul>

<b>June 21st 2021</b>

<ul><li>Added: Ability to remotely view and unblock blocked login IP addresses on the hardening > login protection page.</li>
<li>Added: Ability to change the number of sites to display per page on the sites overview.</li>
<li>Added: The search and pagination state of the site overview page will be remembered on the current page session.</li>
<li>Added: The billing page will now show if you have any active coupon codes.</li>
<li>Fixed: Moved the pagination of tables to the left side of the table due to the chat widget partly covering it.</li></ul>

<b>March 10th 2021</b>

<ul>
<li>Added: Ability to search through firewall and activity logs.</li>
<li>Changed: The entire interface has been changed to reflect the new Patchstack colors and branding.</li>
</ul>

<b>December 16th 2020</b>

<ul><li>Added: New notification system which allows you to fine-tune your notification alert rules.</li>
<li>Changed: Completely reworked the interface and user experience of the portal.</li>
<li>Fixed: Issue where the remote management pages (hardening) do not work.</li>
<li>Fixed: SSL certificate and domain name expiration not being properly updated.</li>
<li>Fixed: The performance of the portal has been significantly improved.</li>
<li>Fixed: Issue where the banned IP addresses page accepted an invalid response from the site and would attempt to display it on the page.</li>
<li>Fixed: Turning off the malware removal guarantee will keep it turned on until the end of the billing term for which you paid.</li></ul>

<b>May 1st 2020</b>

<ul><li>Added: Message that displays if the firewall or plugin is not running. This relies on the ping feature of the plugin.</li>
<li>Changed: Some of the buttons and options on the component page have been adjusted.</li>
<li>Fixed: Issue where the banned IP addresses tab would not parse the response properly.</li></ul>

<b>March 11th 2020</b>

<ul><li>Added: Page to manage the components (software) of your sites. This requires Patchstack plugin version 2.0.11 or higher.</li></ul>

<b>December 4th 2019</b>

<ul><li>Fixed: The 2FA secret key should no longer be empty and cause issues when logging in.</li>
<li>Fixed: A particular issue where the hardening/users tab wouldn't work.</li></ul>

<b>November 19th 2019</b>

<ul><li>Added: Button to the firewall management page to clear firewall rules cache of all sites you have added.</li>
<li>Fixed: Issue where the site status on the dashboard did not match the site status that is displayed when viewing a specific site.</li>
<li>Changed: Completely reworked the user interface of the firewall management pages.</li></ul>

<b>October 28th 2019</b>

<ul><li>Added: Ability to turn on the malware removal addon on specific sites.</li>
<li>Fixed: Improved the speed of the site overview table.</li>
<li>Changed: The layout of the site overview table.</li></ul>

<b>October 4th 2019</b>

<ul><li>Added: A new tab under the "Firewall" tab that will show a list of all currently banned IP addresses by the firewall with a button to unban each IP address individually. This requires Patchstack plugin version 2.0.0 or higher.</li>
<li>Added: More options to the "Hardening" tab.</li>
<li>Changed: The layout of most options on the "Hardening" tab.</li></ul>

<b>September 23rd 2019</b>

<ul><li>Added: Multisite indicator in the CMS column.</li>
<li>Added: Website state to the URL column.</li>
<li>Fixed: White background on login and registration screen not taking up the entire page.</li>
<li>Changed: Text of certain labels and input fields.</li>
<li>Changed: Slightly optimized performance of site overview table. We still plan on further optimizing it.</li>
<li>Removed: Uptime SLA % column</li></ul>

<b>September 11th 2019</b>

<ul><li>Added: Ability to opt-in for monthly report generation so we save the report of your sites at the end of the month.</li>
<li>Changed: Weekly report generation has been adjusted to generate monthly reports only and of the past 2 months only.</li>
<li>Changed: Firewall and activity logs are now permanently archived after 60 days.</li></ul>

<b>August 21st 2019</b>

<ul><li>Added: Support for 3DS payment authentication for when our payment provider publishes support for it live.</li>
<li>Fixed: Renamed reCAPTCHA v3 to v2 on the hardening tab to avoid confusion.</li>
<li>Fixed: True/false values on the hardening tab not being properly parsed from the site which in turn showed inaccurate data.</li>
<li>Fixed: Error when team members couldn't add sites when the team leader created an account during the AppSumo promotion.</li></ul>

<b>August 5th 2019</b>

<ul><li>Added: Link to go directly to a firewall rule on the firewall rules overview page.</li>
<li>Fixed: Issue related to the hardening tab on the portal.</li>
<li>Removed: Text that is no longer relevant on the addons tab on the billing page.</li></ul>

<b>July 16th 2019</b>

<ul><li>Added: Ability to change your billing information.</li>
<li>Added: Ability to subscribe to our new annual plan.</li>
<li>Changed: Review billing page has been redesigned and restructured.</li>
<li>Changed: Signup page.</li>
<li>Fixed: Issue where whitelisting did not work under certain scenarios.</li></ul>

<b>June 12th 2019</b>

<ul><li>Added: Error when the plugin is deactivated on a site on which it was previously activated.</li>
<li>Added: Text that describes the avatar allowed extensions and dimensions.</li>
<li>Changed: Width and height of certain elements.</li>
<li>Changed: Firewall rules management page interface has been slightly modified.</li>
<li>Changed: Firewall rules management menu item no longer has a sub-menu.</li>
<li>Changed: License expiration in the header has been removed.</li>
<li>Changed: Icon of the billing sub-menu item.</li>
<li>Changed: The DataTables error popup text has been adjusted to be more user friendly and show a better message.</li>
<li>Fixed: Show better error when a payment failed to process.</li></ul>

<b>May 28th 2019</b>

<ul><li>Added: User management (team) feature has been added which allows you to add sub-users to your account and assign them sites that they can control.</li>
<li>Added: You can now upload an avatar to your account.</li>
<li>Added: Your company name (if set) is now displayed under your name in the header.</li>
<li>Fixed: Under certain conditions an alert that informs you that your site is down would not be sent.</li></ul>

<b>April 5th 2019</b>

<ul><li>Fixed: Chart on site view not displaying properly when a different week is selected.</li></ul>

<b>March 12th 2019</b>

<ul><li>Added: Ability to whitelist blocked firewall requests with one click on the firewall logs page.</li>
<li>Added: A pen icon has been added next to the website title when you view a site to quickly jump to the section that allows you to edit the website settings.</li>
<li>Added: Ability to instantly re-synchronize the firewall rules and whitelist of a site.</li>
<li>Changed: The site searching textfield now requires you to press enter to perform the search. Additionally, the searching textfield will be hidden until the current listing has been loaded.</li>
<li>Changed: Design for the login, register and password recovery page has been adjusted.</li>
<li>Changed: Some text and font sizes on the billing page.</li></ul>

<b>February 19th 2019</b>

<ul><li>Added: Advanced page where you can manage the firewall rules and add your own.</li>
<li>Added: Icons to the dashboard blocks.</li>
<li>Fixed: Bug with uptime chart.</li>
<li>Fixed: Weekly uptime chart.</li>
<li>Fixed: Bug regarding severity, type and showing POST data of blocked requests on the firewall logs page.</li>
<li>Fixed: Bug regarding PHP firewall and scanner firewall detection feature.</li>
<li>Changed: Last 9 days of the firewall chart on the dashboard will now always be shown, even if 0 attacks blocked.</li>
<li>Changed: "Security Risk" column state will be updated more often.</li>
<li>Changed: Several paragraphs and texts were changed.</li>
<li>Changed: Alert messages on the site view page were moved to the top of the page.</li>
<li>Changed: Firewall and uptime chart will no longer be shown if the plugin or firewall is not installed.</li>
<li>Changed: The display order of the tabs on the site view page has been adjusted.</li>
<li>Changed: Button focus color has been adjusted to match the rest of the color scheme.</li>
<li>Changed: "Up-to-date" element is no longer a button on the software tab.</li>
<li>Changed: "Plugin Settings" button has been moved to its own tab instead.</li>
<li>Changed: Removed middle-step of the payment page.</li>
<li>Changed: Text in the "Security Risk" column on site overview table has been adjusted.</li></ul>

<b>January 31st 2019</b>

<ul><li>Added: Plan cancellation feedback form.</li>
<li>Added: Checkbox to mark a site to not be monitored by the uptime monitor and scanner.</li>
<li>Changed: Add year to security report generation filename.</li>
<li>Changed: Adjust hack cleanup addon pricing.</li>
<li>Changed: Claim that prices are excl. taxes.</li>
<li>Changed: Change trial to be the PRO package.</li>
<li>Changed: Make the security check mark on the site overview update more often.</li>
<li>Fixed: Added proper year support to security reports</li></ul>

<b>January 18th 2019</b>

<ul><li>Added: Button to view the change log of a plugin on the "Software" tab when viewing a site.</li>
<li>Added: Hack cleanup and whitelabel purchasable add-ons to the billing page.</li>
<li>Changed: All URL's that contained /invoice have been removed and renamed to /billing.</li>
<li>Changed: Removed some misleading text from the monitoring and uptime notification emails.</li>
<li>Fixed: Text overlapping issue when a security report spans over multiple pages.</li></ul>

<b>January 15th 2019</b>

<ul><li>Added: security reports feature to generate reports for your customers (available to AppSumo users, pro plan and enterprise plan.) Whitelabel support coming soon as purchasable add-on.</li>
<li>Added: button to site view page (top right corner) that when clicked on, will show a page where you can manage the Patchstack plugin settings. (Plugin version >= 1.3.3 required)</li>
<li>Removed: (AppSumo) code redemption form on billing page.</li></ul>

<b>December 21st 2018</b>

<ul><li>Changed: The uptime monitor has been adjusted to start monitoring every hour instead of every fifth minute. This will allow us to focus more on the security aspect of our product and less on the uptime monitoring feature. However note that we may change this in the near future.</li>
<li>Changed: Uptime monitor chart when viewing a site has been adjusted graphically, we also no longer keep track of the response time of the site. If there's a lot of interest for response time averages then we can consider re-adding this.</li>
<li>Fixed: Many performance improvements have been made to the portal in order to handle more traffic and to handle more load.</li></ul>

<b>December 10th 2018</b>

<ul><li>Added: Daily statistics emails for trial users. (Will be available to all users soon)</li>
<li>Fixed: Patchstack Security > Patchstack in certain emails.</li>
<li>Fixed: Show better error messages when payment cannot be completed successfully.</li></ul>

<b>December 6th 2018</b>

<ul><li>Changed: Pricing has been adjusted (lowered).</li>
<li>Changed: "Upgrade your account" button will now only show up to trial accounts..</li>
<li>Fixed: "Processing" bar when loading a table would overlap the notification box.</li>
<li>Fixed: Bug where defacer.id notifications were being sent too often.</li></ul>

<b>December 3rd 2018</b>

<ul><li>Added: PayPal support for payments.</li>
<li>Changed: The address form when making a payment will now show more user friendly errors in case you did not fill in a field with a valid value.</li>
<li>Changed: "Free Stuff" (referral) has been changed to an (upgrade) button to review our subscription package. The referral page will be reworked soon.</li>
<li>Changed: "Patchstack Security" has been modified to "Patchstack" in emails.</li>
<li>Fixed: Slack and email notifications not being sent properly in some scenarios when a site goes down.</li></ul>

<b>November 15th 2018</b>

<ul><li>Added: 2 new monitoring additions; SSL certificate expiration check and .git folder detection.</li>
<li>Added: A more obvious download WordPress plugin button, which can be found at the bottom of the site view page.</li>
<li>Changed: Few more improvements have been made to speed up initial load.</li>
<li>Fixed: Few console errors and informative messages.</li></ul>

<b>November 9th 2018</b>

<ul><li>Changed: Performance improvements have been made to the portal. More specifically: the up-time chart, firewall chart and site listing table on the dashboard.</li></ul>

<b>November 2nd 2018</b>

<ul><li>Added: Timezone support. You can find this option by clicking on your name in the top right corner > Settings > Timezone section.</li>
<li>Changed: If you are a new user with no sites, you will be forced to add sites before you can do anything else.</li>
<li>Changed: Trial expiration message will not show until halfway of the trial period.</li>
<li>Fixed: Some themes would show up as vulnerable (false positive).</li>
<li>Fixed: Show error if the configuration file of the native PHP firewall cannot be downloaded.</li></ul>

<b>October 29th 2018</b>

<ul><li>Added: Two-factor authentication. You can find the option by clicking on your name in the top right corner > Settings > Two-Factor Authentication.</li>
<li>Added: Subtitles to menu items.</li>
<li>Added: Support button that links you to the knowledge-base and chat option.</li>
<li>Fixed: Show better error messages when attempting to perform an action on the plugin management tab.</li></ul>

<b>October 18th 2018</b>

<ul><li>Fixed: Many speed improvements have been made to the portal to prevent the occasional timeouts and slowness of the site.</li></ul>

<b>September 18th 2018</b>

<ul><li>Added: Ability to specify the number of times in a row a website should be down to the uptime server before we send an uptime alert. The option has been added to the notification settings of a site and the settings page of your account.</li>
<li>Fixed: Previously, the uptime monitor would only check the root domain instead of the entire URL that you provide to us in the portal.</li></ul>

<b>August 29th 2018</b>

<ul><li>Added: Remote software management to update plugins/themes/WordPress and delete, deactivate, activate plugins. Requires plugin version 1.3.0 installed.</li>
<li>Added: Remote user management to delete users, reset password and create new admin account. Requires plugin version 1.3.0 installed.</li>
<li>Added: Activity logs tab that will display all activity logs. Requires plugin version 1.3.0 installed.</li>
<li>Added: Tab to see the API ID / Secret Key.</li>
<li>Added: Menu item that will link you to the change log of the portal and plugin.</li>
<li>Changed: A couple of error messages so it now provides more in-depth information.</li>
<li>Removed: Old user login logs tab.</li>
<li>Fixed: Show proper error when payment cannot be processed.</li>
<li>Fixed: Plugin false positive vulnerability when the plugin version is not known.</li>
<li>Fixed: Uptime and firewall charts not showing when an old Patchstack plugin version is installed.</li></ul>

<b>August 13th 2018</b>

<ul><li>Fixed: When you had multiple tags added to a site, then searching for that site would make it show up the number of tags you had added to the site.</li>
<li>Fixed: Error when pulling up firewall logs data when the blocked URL contained certain unicodes.</li>
<li>Fixed: Slack alerts will now also respect the notification settings.</li></ul>

<b>August 9th 2018</b>

<ul><li>Added: Ability to tag your sites which can also be searched for using the search textbox.</li>
<li>Fixed: A small bug regarding the security risk icon; sometimes it would still show as vulnerable even though there was no vulnerability.</li>
<li>Fixed: When clicking directly on the X of a tag to remove it, it wouldn't actually remove it.</li></ul>

<b>August 3rd 2018</b>

<ul><li>Changed: Adjusted some plugin related error messages.</li>
<li>Fixed: In some scenarios, certain plugins would still show as vulnerable even though they were not.</li>
<li>Fixed: When a payment is attempted to be made, it would sometimes fail on accounts that were made under certain conditions.</li></ul>

<b>August 2nd 2018</b>

<ul><li>Added: uptime logs tab on site view page to view detailed information on uptime errors of your site.</li>
<li>Added: After integrating Slack, it will now send a test message to let you know it's properly implemented.</li>
<li>Added: Option to update the notification settings of all your sites at once. (Under Settings > Notification tab)</li>
<li>Added: Ability to receive email notification when your site goes down.</li>
<li>Changed: Settings page has been changed to tabbed navigation to make it more user friendly.</li>
<li>Changed: Previously a site could go down with status code 0, this no longer happens and instead it provides you with a more detailed error message.</li>
<li>Fixed: When updating a site's URL, it will no longer check if it's already in use.</li>
<li>Fixed: Date formatting in domain expiration email.</li>
<li>Fixed: Remove proxy IP in firewall logs tab so the country flag can be displayed.</li>
<li>Fixed: Issue where certain plugins were displayed as vulnerable, even though they were not.</li>
<li>Fixed: Issue where uptime monitoring chart on dashboard would sometimes not display the lines correctly.</li>
<li>Fixed: Domain name expiration not showing the proper date in the email you receive.</li></ul>

<b>July 28th 2018</b>

<ul><li>Added: The sites overview table on the dashboard will now remember the page you were on when you click on a site and go back to the dashboard.</li>
<li>Added: A button has been added to the site view page to rescan your site.</li>
<li>Added: If a website cannot be added due to an error, additionally display a detailed error message that can be given to us or to your host to further investigate the issue.</li>
<li>Fixed: After changing domain notification settings, the "Domain Expiring" checkbox will now properly change to reflect the current setting.</li>
<li>Fixed: The text field of the Slack channel has been adjusted so it does not look like it's already filled in.</li>
<li>Fixed: If your domain expires, the date format will now be the same as the rest of the site on the site view page.</li>
<li>Fixed: If a new day started in the UTC timezone and there is no uptime data to display yet, display a better message.</li>
<li>Fixed: In certain scenarios some firewall logs pages did not load properly, this has been fixed.</li></ul>
