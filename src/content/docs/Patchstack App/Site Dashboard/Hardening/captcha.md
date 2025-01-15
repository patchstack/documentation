---
title: "Captcha"

excerpt: ""
hidden: false
createdAt: "Thu Jan 18 2024 12:20:27 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jan 18 2024 13:24:28 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 3.33
---
_Captcha feature is available for all Patchstack paid plan users._

Captcha is a powerful tool for protecting your website against spambots.  
With Patchstack, you can integrate captcha solutions easily into your WordPress sites.  

To manage your site's captcha settings, navigate to **Sites** > **yourdomain.com** > **Hardening** > **Captcha** in Patchstack App.

Patchstack offers two captcha solutions:
- Google reCAPTCHA
- Cloudflare Turnstile


![](@images/patchstack-captcha-setup.png)


Note that our captcha can only be used on the WordPress built-in forms - these are:
* Commenting forms
* Login form
* Registration form
* Password reset form

**NB!** Patchstack does not offer captcha integrations for other third-party plugins or themes (eg. WooCommerce, Contact Form 7).

To activate captcha on your site, you will have to generate a public key and secret key first.
The tutorials for creating captcha keys and integrating them with Patchstack can be found below.

## Setting up Google reCAPTCHA

You can choose whether to use reCAPTCHA v2 or reCAPTCHA v3.  
Find information about different reCAPTCHA versions <a href="https://developers.google.com/recaptcha/docs/versions" target="_blank">here!</a>

 <a href="/faq-troubleshooting/integrations/how-to-get-the-site-key-and-secret-key-for-the-recaptcha-feature/" target="_blank">Here is a tutorial how to generate those</a>.

To set up Google reCAPTCHA:
1. Login into your Google account at Google.com
2. Go here: https://www.google.com/recaptcha/admin/create
3. In the label, enter your site name
4. Check reCAPTCHA v2 OR reCAPTCHA v3 depending on which reCAPTCHA version you want to use. The reCAPTCHA v3  feature is only available in our plugin version 1.3 and up
5. In the domains field, enter your domain(s)
6. Check the checkbox to agree to the terms
7. Click on Register
8. You will now see the Site key and Secret key which you will need to copy over to our plugin, then save the settings on the settings page

Once the keys have been generated, insert them to the Patchstack App and click **Save settings**.

## Setting up Cloudflare Turnstile

To set up Cloudflare Turnstile:
1. Choose **Cloudflare Turnstile** from the versions list of captchas in Patchstack App.
2. Log in to Cloudflare: https://dash.cloudflare.com/login
3. In the navigation menu on the left, click "Turnstile"
4. Click on "Add Site"
5. Add your site name, and the domain name which you want to run the Turnstile on
6. Click **Create**
7. The site key and secret key will be shown on the screen
8. Copy these keys over to the fields on the Patchstack App > yoursite.com > Hardening > Captcha page
9. Click **Save settings**



After all the changes, click on **Save settings**.
