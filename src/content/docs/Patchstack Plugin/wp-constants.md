---
title: "WP constants"

excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Thu Jun 29 2023 11:28:48 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Nov 12 2026 00:00:00 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 5
---
Set these constants in `wp-config.php`, before WordPress loads. On multisite they apply to the whole installation; they are separate from per-site App policies.

### Disable writing to .htaccess
To stop hardening-rule writes, define the constant below. It also prevents auto-prepend installation and refresh. It does not remove existing `.htaccess` rules or disable runtime security headers. See [.htaccess hardening](/patchstack-app/site-dashboard/hardening/app-hardening-htaccess/) before changing an existing installation.

```php
define('PS_DISABLE_HTACCESS', true);
```

### Disable mu-plugin creation

Patchstack can install an early firewall loader in the must-use plugin directory. Define `PS_DISABLE_MU` to prevent creating that loader. It also prevents auto-prepend installation and refresh; it does not remove an existing loader or disable a loader already installed.

```php
define('PS_DISABLE_MU', true);
```
