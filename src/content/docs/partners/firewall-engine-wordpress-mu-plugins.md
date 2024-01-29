---
title: "Firewall engine WordPress mu-plugins"
slug: "firewall-engine-wordpress-mu-plugins"
excerpt: ""
hidden: true
metadata: 
  image: []
  robots: "index"
createdAt: "Tue May 30 2023 11:36:39 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue May 30 2023 11:37:57 GMT+0000 (Coordinated Universal Time)"
---
In order to block more exploitation attempts of certain vulnerabilities, we can let the firewall engine run as a mu-plugin before it's run inside of a plugin itself.

In the mu-plugin we can run all firewall rules that do not have a privilege check in the firewall rule (using the current_user_cannot matching type). The privilege related firewall rules cannot run in mu-plugin because WordPress core itself has not initialize the session yet at this point. Only in the plugin itself the rules which do have a privilege related firewall rule will run those rules, but not the others which already ran in the mu-plugin.

In order to do this, you can create a file in the mu-plugin folder that contains code similar to below. The example below uses the test extension and fictive data, settings and directory paths.

```php
<?php

// Load essential WP core file.
require_once ABSPATH . 'wp-admin/includes/plugin.php';

// Determine if the Patchstack plugin folder exists.
// Likely want this to match your own, important to add this so it does not
// throw a fatal error if the plugin is deactivated or renamed.
$pluginDir = WP_PLUGIN_DIR . '/patchstack';
if ( ! is_dir( $pluginDir ) || ! is_plugin_active( 'patchstack/patchstack.php' ) ) {
    return;
}

// Determine if the core file exists.
// This is the vendor autoload file of the firewall engine.
if ( ! file_exists( WP_PLUGIN_DIR . '/patchstack/lib/patchstack/vendor/autoload.php' ) ) {
    return;
}

// Load the firewall engine.
require_once WP_PLUGIN_DIR . '/patchstack/lib/patchstack/vendor/autoload.php';

// This should load your own extension.
$extension = new Patchstack\Extensions\Test\Extension();

// Get the rules from some place... filesystem or database.
$rules = file_get_contents(WP_PLUGIN_DIR . '/patchstack/lib/patchstack/tests/data/Rules.json');

// Initiate the firewall processor with the settings.
$firewall = new Patchstack\Processor(
    $extension,
    json_decode($rules, true),
    [], // Whitelist rules
    [
        'autoblockAttempts' => 10,
        'autoblockMinutes' => 30,
        'autoblockTime' => 60,
        'mustUsePluginCall' => true
    ]
);

// Launch the firewall.
$firewall->launch();

// Important to define as this will let the next firewall run only run privilege related rules.
define( 'PS_FW_MU_RAN', true );
```

Now that it is running as a mu-plugin, you can use similar code to make it run in your own plugin's file, or init hook. It is important that the _mustUsePluginCall_ value is left out or set to false when you make this call from your own plugin or any other WordPress hook. 

If for whatever reason the firewall does not run as mu-plugin or the _PS_FW_MU_RAN_ constant is not set, all rules will run by default.
