---
title: "Hardening > Login Protection"
slug: "hardening-login-protection"
excerpt: "Protect your login URL"
hidden: true
createdAt: "Mon Aug 08 2022 11:49:13 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jan 18 2024 13:27:51 GMT+0000 (Coordinated Universal Time)"
---
_Accessible for the Developer and Business plan users only._

From **Login Protection** subpage you can:

<ul>
<li>Block access to wp-login.php</li>
<li>Set a new URL for login page</li>
<li>Ban IPs that fail to log in multiple times in a given period of time</li>
<li>Set a specific time, where in between users can log in to WordPress</li>
<li>Enable a possibility to set up Two Factor Authentication from WordPress site</li>
<li>Add IP addresses (which should never be blocked no matter how many failed login attempts), to whitelist</li>
<li>Block certain IP addresses from being able to log in</li>
</ul>

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/9107e98-patchstack-login-protection.png",
        null,
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


## How does the new login URL work?

If you define a new URL for login, it works like a security token for your wp-admin.

### Example usage:

Let's say you enter **"myadmin"** to the **New URL** field.  
Now, to login to your WordPress admin panel, you need to visit **"yourdomain.com/myadmin"**.  
Once you visit this URL, your IP gets whitelisted and from that moment on, you can log in from the regular **"yourdomain.com/wp-admin"** again.  
Visitors from other IP addresses need to know your token - in that case **"myadmin"** - to whitelist their IP and be able to log in to **/wp-admin**.
