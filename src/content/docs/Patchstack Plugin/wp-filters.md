---
title: "WP filters"
excerpt: "Configure Patchstack through WordPress filters"
hidden: false
sidebar:
  order: 5.5
---

These examples describe the filters available in WordPress plugin **2.3.8**. Filters change a value while PHP is running; they do not save an option in the database. See [WP options](/patchstack-plugin/wp-options/) for persistent settings and [WP constants](/patchstack-plugin/wp-constants/) for `wp-config.php` controls.

## Where to put the code

Put the PHP examples in a file directly inside your WordPress must-use plugins directory, normally `wp-content/mu-plugins/patchstack-customizations.php`. With a custom content directory, such as Bedrock's `app`, use that directory's `mu-plugins` folder. Create the folder if necessary.

Start the file with `<?php` once, then add the callbacks you need. This loads them before Patchstack initializes and keeps them independent of your active theme or a Patchstack update. On multisite, the file loads for every site; scope a callback to a site when needed.

A filter does not enable a paid feature on a free site. These hooks run inside WordPress; they do not configure a standalone auto-prepend request before WordPress loads.

## reCAPTCHA v3 threshold

`patchstack_recaptcha_v3_threshold` receives the minimum accepted score, which defaults to `0.5`. Return a number from `0` to `1`. Values outside that range, or non-numeric values, fall back to `0.5`.

This example raises the threshold to `0.7`:

```php
<?php
add_filter( 'patchstack_recaptcha_v3_threshold', function ( $threshold ) {
    return 0.7;
} );
```

A higher threshold rejects more low-scoring submissions, including potentially legitimate ones. The response must still be successful and use the expected `submit` action. This filter does not affect reCAPTCHA v2 or Cloudflare Turnstile. See [CAPTCHA setup](/patchstack-app/site-dashboard/hardening/captcha/).

## Hardening directory

`patchstack_htaccess_dir` receives the detected directory for the hardening `.htaccess` file. Return an existing absolute directory path, without the `.htaccess` filename. Invalid paths leave the detected directory in use.

For a custom deployment, replace the example path with your WordPress front-controller directory:

```php
<?php
add_filter( 'patchstack_htaccess_dir', function ( $directory ) {
    return '/srv/www/example/web';
} );
```

Standard WordPress, subdirectory and Bedrock layouts are detected automatically. This override is for layouts needing a different directory; it does not create that directory or change the separate auto-prepend installer. On multisite, hardening files are shared. See [.htaccess hardening](/patchstack-app/site-dashboard/hardening/app-hardening-htaccess/).

## Network remote management

`patchstack_allow_network_remote_management` receives three arguments:

| Argument | Meaning |
| --- | --- |
| `$allowed` | The default authorization decision for this action. |
| `$blog_id` | The site whose request or installer action is being evaluated. |
| `$action` | The signed action name, or `patchstack_firewall_ap_enabled` for the shared auto-prepend installer. |

For normal dashboard access, use the [Network Admin checkbox](/patchstack-plugin/installing-patchstack-on-a-multisite/#remote-management-and-plugin-updates). The filter can impose a narrower host policy. This example vetoes remote plugin deletion while preserving the existing decision for other actions:

```php
<?php
add_filter( 'patchstack_allow_network_remote_management', function ( $allowed, $blog_id, $action ) {
    if ( $action === 'patchstack_plugins_delete' ) {
        return false;
    }

    return $allowed;
}, 10, 3 );
```

Returning `true` overrides the default decision, so scope any additional grant to the intended site and action. The same hook is used for shared auto-prepend installation/removal; preserving `$allowed` keeps those decisions intact. A remote request still needs a valid site signature, and WordPress file-change restrictions still apply.

## XML-RPC methods

When **Restrict XML-RPC Access** is enabled, `patchstack_xmlrpc_allowed_methods` receives the remaining third-party methods and the original method map. Return the method map to retain.

To remove the third-party methods as well:

```php
<?php
add_filter( 'patchstack_xmlrpc_allowed_methods', function ( $remaining, $original ) {
    return [];
}, 10, 2 );
```

This runs only when Patchstack's XML-RPC restriction is enabled. Integrations that need a remaining third-party method will lose it with this example.

## libcurl response decoding

The `patchstack_disable_curl_decoding` option normally enables the workaround only on detected affected Brotli builds. The filter with the same name receives that computed decision and can override it.

A host that manages the decision centrally can force the workaround for WordPress's cURL transport:

```php
<?php
add_filter( 'patchstack_disable_curl_decoding', '__return_true' );
```

This overrides the option and version-detection decision for a site where the hardening hooks are active. It stops libcurl from decompressing responses; WordPress can still decode buffered gzip responses. Streamed and size-limited requests ask for uncompressed responses. It does not turn off HTTPS or certificate verification. See the [option reference](/patchstack-plugin/wp-options/).

## Software inventory

`patchstack_get_software_data` receives the complete software inventory before synchronization. Return an array with the entries to send. Preserve the package identifiers and versions used for vulnerability matching.

This example corrects the display name of one installed private plugin. Replace the file key and display name with your own:

```php
<?php
add_filter( 'patchstack_get_software_data', function ( $software ) {
    foreach ( $software as $index => $package ) {
        if ( isset( $package['sw_type'], $package['sw_key'] )
            && $package['sw_type'] === 'plugin'
            && $package['sw_key'] === 'company-plugin/company-plugin.php' ) {
            $software[$index]['sw_name'] = 'Company Plugin';
        }
    }

    return $software;
} );
```

Plugin entries contain `sw_type`, `sw_name`, `sw_cur_ver`, `sw_new_ver`, `sw_key` and `sw_active`. Other component types can have fewer fields. Removing or changing an entry affects the inventory used by Patchstack App, so the example preserves the rest of the list.

## REST denial message

`disable_wp_rest_api_error` receives the error message used when Patchstack rejects an anonymous REST request. Return a plain-text message:

```php
<?php
add_filter( 'disable_wp_rest_api_error', function ( $message ) {
    return 'Please sign in to access this REST endpoint.';
} );
```

This changes the message only. It does not change the status code, permissions or Contact Form 7 exception. The hook name has no `patchstack_` prefix and may also be used by other plugins.
