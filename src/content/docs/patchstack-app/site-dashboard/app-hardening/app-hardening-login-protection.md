---
title: "Login Protection"
slug: "app-hardening-login-protection"
excerpt: ""
hidden: false
createdAt: "Thu Jan 18 2024 12:03:24 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jan 18 2024 12:20:08 GMT+0000 (Coordinated Universal Time)"
---
_Accessible for the Community (paid), Developer and Business plan users._

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/534b768-patchstack_app_login_protection.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


On the **Login Protection** subpage you can:

<ul>
<li>Block access to wp-login.php</li>
<li>Set a new login URL for the wp-admin page</li>
<li>Ban IPs that fail multiple login attempts</li>
<li>Set a specific time, where in between users can log in to WordPress</li>
<li>Enable setting up the Two Factor Authentication from WordPress site</li>
<li>Add IP addresses to login whitelist</li>
<li>Block certain IP addresses from being able to log in</li>
</ul>

## How our New Login URL feature works

If you define a new URL for login, it works like a security token for your wp-admin. Entering your custom URL once, will whitelist your IP to access regular wp-admin URL again.

### Example usage:

Let's say you enter **"myadmin"** to the **New URL** field.  
To log in to your WordPress admin panel, you need to:

1. First visit your secret URL (for example**"yourdomain.com/myadmin"**).
2. Your IP gets whitelisted and from that moment on, you can log in from the regular **"yourdomain.com/wp-admin"** again.
3. Other visitors are blocked from wp-admin page, unless they know your security token (eg myadmin).
