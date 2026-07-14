---
title: "How hardening and security headers work"
excerpt: ""
hidden: false
sidebar:
  order: 3.33
  label: "How it works"
---

Patchstack uses the word "hardening" in more than one place, and security headers can be delivered in more than one way. This page explains how these settings relate to each other, so you know what a given toggle does and does not change.

## "Advanced Hardening" vs the per-site Hardening tab

These are two different things that share a name:

- **Advanced Hardening** is a managed firewall module under **Protection**. It contains protection rules that Patchstack maintains and updates for you (for example, blocking risky file uploads or suspicious `wp-config.php` requests). It is enabled or disabled as part of the firewall. See [Patchstack modules](/patchstack-app/protection/patchstack-modules/).
- The per-site **Hardening** tab (**Sites** > **yourdomain.com** > **Hardening**) holds settings you configure yourself for a single site: the [General hardening](/patchstack-app/site-dashboard/hardening/app-hardening-general/) options and the [.htaccess features](/patchstack-app/site-dashboard/hardening/app-hardening-htaccess/), including **Add security headers**.

Turning the firewall (and Advanced Hardening) off does not clear your per-site Hardening settings. As noted in the [firewall settings](/patchstack-app/site-dashboard/protection/app-protection-additional-settings/), when the firewall is disabled other security measures such as IP bans and `.htaccess` rules remain active.

## Per-site settings apply independently

Hardening and security-header settings are stored per site. Changing them on one site does not change them on another, and there is no single switch that turns off every site's per-site hardening at once. If you disable a higher-level toggle and still see headers or `.htaccess` rules on a site, open that site's own **Hardening** tab: the per-site setting is still on and applying independently.

## Where security headers live: `.htaccess` vs the HTTP response

When **Add security headers** is on, Patchstack adds a standard set of headers (such as `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` and `Strict-Transport-Security`). Depending on your environment, these can be delivered either by rules written to `.htaccess` or by injection into the HTTP response at runtime.

Because of this, **active security headers may not appear in your `.htaccess` file** — and that does not mean they are missing. To confirm which headers are actually being sent, inspect the live HTTP response (for example with [securityheaders.com](https://securityheaders.com/)) rather than reading the `.htaccess` file.

If you also add the same headers manually (in `.htaccess`, in your nginx config, or through another plugin) while Patchstack is sending them, you can end up with **duplicate headers**. To avoid that, keep only one source for each header: either the **Add security headers** toggle or your own manual rules, not both. See [How to add security headers with Patchstack](/faq-troubleshooting/technical/how-to-add-security-headers-with-patchstack/).

## What "Disable .htaccess features" does and does not do

The **Disable .htaccess features** option (the `disable_htaccess` plugin option, or the `PS_DISABLE_HTACCESS` constant in `wp-config.php`) stops Patchstack from writing its rules to `.htaccess`.

It does:

- Stop Patchstack from writing new `.htaccess` rules.

It does not:

- Remove `.htaccess` rules Patchstack already wrote. You must remove those manually.
- Disable protections that do not rely on `.htaccess`, such as the firewall, virtual patches, or security headers delivered by runtime injection.

See [WP constants](/patchstack-plugin/wp-constants/) and [WP options](/patchstack-plugin/wp-options/) for the plugin-side equivalents.
