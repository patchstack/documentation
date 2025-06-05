---
title: "App errors"

excerpt: "List of errors you may see in the app and what to do"
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Fri Jan 20 2023 10:03:31 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue May 09 2023 14:32:13 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 10
---
Sometimes, due to wrong configurations, you may get some alerts in Patchstack App. We have listed these error messages here so you would know what to do before contacting support.

### Failed to load the site settings, contact support.

1. Check if the Patchstack plugin is activated on your WordPress site
2. Check if the **API key** is correct on your WordPress plugin. To see the API Key, click on the **Settings** from the submenu of your application in the Patchstack App. Access the Patchstack plugin from **Settings > Security** on your WordPress site.
3. Check if your site is publicly accessible and is not protected by any passwords. When you visit your site, can you see the content right away, or is there something blocking it?
4. Check that the domain name would be correct. Click on the **Settings** from the submenu of your application in the Patchstack App. Check that the URL uses the correct protocol (http\:// or https://). Also, check if your site uses "www\" or not. The URL **must be correct**.
5. If you are using Cloudflare, make sure you don't have **Under Attack** mode enabled.
6. Make sure that your web-server has support enabled for the TLS 1.2 protocol. You can test your <a href="https://www.cdn77.com/tls-test" target="_blank">TLS versions here</a>.
7. Make sure that your site returns status code 200. You can <a href="https://httpstatus.io/" target="_blank">do this here</a>.
8. If none of the above seem to cause the problem, contact our support via chat.

### Failed to load the component data, contact support.

1. Check if the Patchstack plugin is activated on your WordPress site
2. Check if the **API key** is correct on your WordPress plugin. To see the API Key, click on the **Settings** from the submenu of your application in the Patchstack App. Access the Patchstack plugin from **Settings > Security** on your WordPress site.
3. Check if your site is publicly accessible and is not protected by any passwords. When you visit your site, can you see the content right away, or is there something blocking it?
4. Check that the domain name would be correct. Click on the **Settings** from the submenu of your application in the Patchstack App. Check that the URL uses the correct protocol (http\:// or https://). Also, check if your site uses "www\" or not. The URL **must be correct**.
5. If you are using Cloudflare, make sure you don't have **Under Attack** mode enabled.
6. Make sure that your web-server has support enabled for the TLS 1.2 protocol. You can test your <a href="https://www.cdn77.com/tls-test" target="_blank">TLS versions here</a>.
7. Make sure that your site returns status code 200. You can <a href="https://httpstatus.io/" target="_blank">do this here</a>.
8. If none of the above seem to cause the problem, contact our support via chat.

### Failed to load the users, contact support.

1. Check if the Patchstack plugin is activated on your WordPress site
2. Check if the **API key** is correct on your WordPress plugin. To see the API Key, click on the **Settings** from the submenu of your application in the Patchstack App. Access the Patchstack plugin from **Settings > Security** on your WordPress site.
3. Check if your site is publicly accessible and is not protected by any passwords. When you visit your site, can you see the content right away, or is there something blocking it?
4. Check that the domain name would be correct. Click on the **Settings** from the submenu of your application in the Patchstack App. Check that the URL uses the correct protocol (http\:// or https://). Also, check if your site uses "www\" or not. The URL **must be correct**.
5. If you are using Cloudflare, make sure you don't have **Under Attack** mode enabled.
6. Make sure that your web-server has support enabled for the TLS 1.2 protocol. You can test your <a href="https://www.cdn77.com/tls-test" target="_blank">TLS versions here</a>.
7. Make sure that your site returns status code 200. You can <a href="https://httpstatus.io/" target="_blank">do this here</a>.
8. If none of the above seem to cause the problem, contact our support via chat.

### Failed to cancel the subscription, contact support.

Your account is probably expired due to payment failures, therefore there is nothing to cancel. You can contact support in the chatbox if you have any questions.

### For Cloudflare users
If you are using Cloudflare, your server supports only TLS 1.3 by default. To use Patchstack, additional support for TLS 1.2 is required. To add support for this TLS version in Cloudflare:
1. Login at Cloudflare, and click on your domain name
2. In the menu, go to SSL/TLS > Edge Certificates
3. Scroll down to the "Minimum TLS Version" section
4. Ensure that it is set to at least TLS 1.2 or lower
