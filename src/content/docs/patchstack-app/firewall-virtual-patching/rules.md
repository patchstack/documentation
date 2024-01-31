---
title: "Rules"
slug: "docs/rules"
excerpt: ""
hidden: true
createdAt: "Mon Jul 25 2022 09:04:16 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jan 04 2024 14:46:59 GMT+0000 (Coordinated Universal Time)"
---
_Accessible for the Developer and Business plan users only._  
<https://app.patchstack.com/protection/rules>

In the **Rules** subpage you can create and modify the firewall rules and attach them to certain applications.  
A firewall rule can block or whitelist requests based on patterns. They can be assigned to sites directly or attached to a module.

![](/src/assets/images/7ef2e64-small-Patchstack_protection_rules.png)

## Creating a rule

To create a custom rule, click on the **+ Create Rule** button.  
A new page opens up with a firewall rule creation form (see the image below).

![](/src/assets/images/a84f62c-Patchstack_-_create_a_firewall_rule.png "Patchstack - create a firewall rule.png")

Adding a simple rule:

<ol>
<li>Give your rule a name</li>
<li>To the next field (<b>If the IP address matches...</b>) you can type an IP address, CIDR notation, or wildcards. For example: <ul><li>127.0.0.1</li>
<li>127.0.0.1/24</li>
<li>127.0.0.*</li></ul></li>
<li>Next field is another condition - if the requesting URL contains - there you can type any URL pattern (e.g. contact-form/submit)</li>
<li>In the last field you can choose, what action to take if your web app visitor matches all the rules you just set. Your options are to <ul><li>Block</li><li>Redirect</li><li>Log</li><li>Whitelist</li></ul></li>
<li>When you choose "Redirect", a new field opens up, where you can type, which URL the visitor will be redirected to</li>
<li>Having filled the fields, click <b>Create Rule</b></ol>

Finally, you should see your created rule on the **Rules** page.

## Attaching the rule to your app

If you want this rule to take effect, you need to attach it to your apps. To do that:

<ol><li>Navigate to <b>Rules</b> tab</li>
<li>Click on <b>"Action"</b> and <b>"Attach Apps"</b></li>
<li>A popup appears with the list of all your apps</li>
<li>Toggle the button to attach your rule. You can attach as many apps as you wish</li>
<li>Close the popup</b></li>
</ol>

![](/src/assets/images/96f9cec-small-Patchstack_attach_to_applications.png)

Now you need to sync your sites. To do that:

<ol>
<li>Click on <b>"Resync Apps"</b> at the top right corner</li>
<li>From the popup you can click <b>"Resync All"</b> so all your apps will be updated</li>
</ol>

You have now successfully created a firewall rule and attached it to your site!

In the next article let's take a look at **Firewall Modules**. A firewall module is a group of **custom firewall rules**, which can be applied to your apps, all at once.
