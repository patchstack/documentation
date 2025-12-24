---
title: "WP constants"

excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Thu Jun 29 2023 11:28:48 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jun 29 2023 12:24:18 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 5
---
Patchstack has introduced WordPress constants which can be used in wp-config.php file.

### Disable writing to .htaccess
To prevent Patchstack from writing rules to the .htaccess file, add the following constant to your wp-config.php file. If rules were previously added to your .htaccess file via the Patchstack App, you will need to remove them manually.

```php
define('PS_DISABLE_HTACCESS', true);
```

### Disable mu-plugin creation

Patchstack automatically creates a mu-plugin upon installation. To prevent automatic mu-plugin creation, define the PS_DISABLE_MU constant in your wp-config.php file.

```php
define('PS_DISABLE_MU', true);
```
