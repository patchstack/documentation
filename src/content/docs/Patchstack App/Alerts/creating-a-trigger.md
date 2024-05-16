---
title: "Creating a trigger"

excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Jul 25 2022 09:09:02 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu May 25 2023 11:57:30 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 7.2
---
_New triggers can be created on the Developer and Business plan only._

You can create a trigger by clicking on **"+ Create Trigger"** on the **Alerts** page or navigating here: <a href="https://app.patchstack.com/alerts/create" target="_blank">https://app.patchstack.com/alerts/create</a>.

![](@images/4158fc2-Patchstack_-_Create_a_Trigger.png "Patchstack - Create a Trigger.png")

Give your trigger a name by typing it into <b>"Trigger Title"</b> field.  
Select the condition of when the alert is triggered from the dropdown

The dropdown includes the following conditions:

<ol>
<li>Component Event
<ul>
<li><span class="color1">Outdated</span> - sends an alert, when a component on your site is outdated</li>
<li><span class="color1">Vulnerable</span> - sends an alert, when a component on your site is vulnerable</li>
</ul>
</li>

<li>WordPress Activity Event
<ul>
<li><span class="color1">User Logged In</span> - sends an alert, when someone logs in to WordPress</li>
<li><span class="color1">User Registered</span> - sends an alert, when a new account is created in WordPress</li>
<li><span class="color1">Post Deleted</span> - sends an alert, when a post is deleted from WordPress</li>
<li><span class="color1">Post Trashed</span> - sends an alert, when a post is sent to the trash in WordPress</li>
<li><span class="color1">Attachment Uploaded</span> - sends an alert, when an attachment is uploaded to WordPress</li>
<li><span class="color1">Plugin Installed</span> - sends an alert, when a new plugin gets installed on WordPress</li>
<li><span class="color1">Plugin Deactivated</span> - sends an alert, when a plugin is deactivated on WordPress</li>
<li><span class="color1">Plugin Activated</span> - sends an alert, when a plugin is activated on WordPress</lI>
</ul>
</li>

<li>Firewall Logs Event
<ul>
<li><span class="color1">Match IP</span> - sends an alert, when your site gets visited from a certain URL</li>
<li><span class="color1">Match URL</span> - sends an alert, when a certain URL gets visited</li>
<li><span class="color1">Match Payload</span> - sends an alert, when a certain payload is submitted</li>
</ul>
</li>
</ol>

Depending on a condition, you may be asked to set additional parameters to the conditions.  
For example by choosing "Match IP", you will have to choose, whether the status has to equal or be bigger than the code you type.

You will see the conclusion of your built rule before saving it (see the image below).

![](@images/0b4f492-small-Patchstack_create_trigger.png)

The next step is to choose whether you would like to get notified to your email, Slack channel, or both.

After having set your rules, click on **"Create Trigger"**.  
You will be then directed back to the **Alerts** page where you can see your new trigger on the right side of the page.
