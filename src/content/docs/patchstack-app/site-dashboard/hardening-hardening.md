---
title: "Hardening > Hardening"
slug: "hardening-hardening"
excerpt: "Manage your hardening features"
hidden: true
createdAt: "Fri Aug 05 2022 12:56:09 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jan 18 2024 13:27:46 GMT+0000 (Coordinated Universal Time)"
---
_Accessible for the Developer and Business plan users only._

## Hardening Features

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/dd27832-patchstack-hardening-hardening.png",
        null,
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


From the **Hardening** page you can manage the settings such as:

<ol>
<li>
<b> Auto Update Software </b> - Select what needs to be automatically updated each time WordPress looks for updates in the background. Keep in mind that if a plugin update contains a bug or a fatal error, it could break your application. In case you want to activate Auto Updating, check the corresponding checkboxes and click <b>Save Settings</b> at the bottom of this section</li>
<li><b>Disable the theme editor</b> - This could protect you from potential automated attacks that involve the theme editor</li>
<li><b>Remove readme.html </b>- This will attempt to stop basic readme.txt scans</li>
<li><b>Disable user enumeration</b> - Block hackers from getting your usernames</li>
<li><b>Hide WordPress version</b> - removes the WordPress version in the <meta> tag in the HTML output</li>
<li><b>Enable activity log</b> - every user action will be recorded and put to activity logs</li>
<li><b>Log failed logins</b> - If this is checked along with the activity logs, we will also log failed login attempts</li>
<li><b>Block Application Passwords</b> - Disables the application passwords feature introduces in WordPress 5.6</li>
<li><b>Restrict XML-RPC Access</b> - restricts access to xmlrpc.php by only allowing authenticated users to access it</li>
<li><b>Restrict WP REST API Access</b> - Restricts access to the WP Rest API by only allowing authenticated users to access it</lI>
</ol>

Lastly, we have **Registration Email Blacklist** input, from which you can block users with certain emails or email domains. You need to separate emails with commas.

**For example if we want to block:**

<ul><li>
hacker@somedomain.com 
</li>
<li>and all the emails from the domain example.com (test@example.com, someone@example.com)</li></ul>

In that case we type in <b>"[hacker@somedomain.com](mailto:hacker@somedomain.com), @example.com"</b>

Remember to click **Save Changes** after making any changes.

## reCaptcha

reCaptcha is a powerful tool for protecting your application against different spambots.  
With Patchstack, you can integrate reCaptcha easily into your WordPress applications':

<ul><li>Commenting forms</li>
<li>Login form</li>
<li>Registration form</li>
<li>Password reset form</li></ul>

You can choose whether to use reCaptcha v2 or reCaptcha v3.  
Find information about different reCaptcha versions <a href="https://developers.google.com/recaptcha/docs/versions" target="_blank">here!</a>

To activate Google reCaptcha on your site, you will have to generate a reCaptcha Public Key and reCaptcha Secret Key. Here is a tutorial how to generate those: <a href="https://docs.patchstack.com/docs/how-to-get-the-site-and-secret-key-for-the-recaptcha-feature" target="_blank">https\://docs.patchstack.com/docs/how-to-get-the-site-and-secret-key-for-the-recaptcha-feature</a>

After all the changes, click on **Save Settings**.

![](https://files.readme.io/06d7d08-Hardening_-_recaptcha.png "Hardening - recaptcha.png")
