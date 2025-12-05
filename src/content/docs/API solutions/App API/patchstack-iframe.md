---
title: "Patchstack iFrame Widget"
hidden: false
createdAt: "Thu May 25 2023 13:54:05 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Jan 24 2024 13:52:09 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 3
---

_Patchstack iframe widget is available for Enterprise plan users_

The Patchstack iframe widget is a drop-in HTML component that lets you display real-time security insights inside your own environment.

Simply plug it in your own environment and give customers deeper insights into the state of their website's security while not giving them too much control over how Patchstack is configured on their website.

### Integration
#### Prerequisites
- Patchstack SaaS Enterprise plan
- [Patchstack App API key](/api-solutions/app-api/patchstack-app-api/#how-to-get-patchstack-app-api-key)
- Your own environment where you want to display the iframe
- Know how to communicate with an API
- Understand the request and response parameters of [/site/{site}/sso/generate](https://api.patchstack.com/app-api/documentation#/Widget/5a98ecb6630a39bb1649affccc030cc0)
- The Patchstack site id of the site which you want to render in the iframe widget

#### Fetching the iframe token
Once you have obtained a Patchstack App API key, you can query the [/site/{site}/sso/generate](https://api.patchstack.com/app-api/documentation#/Widget/5a98ecb6630a39bb1649affccc030cc0) API endpoint in order to retrieve an access token.

This access token can be passed to a special iframe URL after which the iframe will be rendered.

- The access token is valid for 1 hour and its expiration will be pushed back by 1 hour each time it is accessed by the user through the iframe to avoid an unexpected timeout.
- You can pass the `mode` payload parameter and set it to dark or light to set the theme. It defaults to dark.
- You can pass an optional `ip_address` parameter to bind the loading of the iframe to the users' IP address. Ensure the server generating the token knows the client's IP or use a proxying mechanism.

#### Example integration
##### Step 1: send the HTTP request
The following curl example assumes the site identifier is 12345 of the site for which you want to fetch the access token for the iframe. Also replace the YOUR_APP_API_KEY value with your own Patchstack App API key.

```bash
curl -X POST "https://api.patchstack.com/monitor/site/12345/sso/generate" \
  -H "UserToken: YOUR_APP_API_KEY"
```

##### Step 2: parse the HTTP response
The API endpoint will respond with the raw access_token, expires_in, and iframe_url properties. You can use the iframe_url property directly for the next step.

```json
[
  {
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLddleHAiOjE3NDI5MDg0Nzd9.KcDgyhd8sf9xdddMHKLM258drlLrYc2rX6pN166AiEM",
    "expires_in": "3600",
    "iframe_url": "https://app.patchstack.com/iframe?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLddleHAiOjE3NDI5MDg0Nzd9.KcDgyhd8sf9xdddMHKLM258drlLrYc2rX6pN166AiEM"
  }
]
```

##### Step 3: render the iframe widget 

Pass the iframe_url property from step 2 directly to the `src` attribute of the iframe and you are done! A minimal iframe example is shown below.

```html
<!-- Replace src attribute value with the iframe_url parameter from the response -->
<iframe
  src="https://app.patchstack.com/iframe?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2ggX2lkIjoxLddleHAiOjE3NDI5MDg0Nzd9.KcDgyhd8sf9xdddMHKLM258drlLrfc2rX6pN166AiEM"
  width="1200"
  height="1080"></iframe>
```

### Frequently asked questions 

#### Can we customize the widget colors? 
We recommend selecting one of the two themes provided (either dark or light). However, it is also possible to inject custom CSS. This is manually set by the Patchstack Team at this time for your particular account.

If this is needed, reach out to us and provide us with the CSS snippet to inject. Note that HTML/CSS structure and styling of the iframe widget may change over time which may affect the way your custom CSS renders the elements in the iframe widget.

#### Can we choose what information users see? 
No, currently the information is fixed to the views below. 

#### Are the widget height and width static? 
No. You can define the dimensions through the iframe attributes. The width is responsive, but the height would add a scrollbar if it doesn’t fit into view.


### Screenshots

#### Vulnerabilities overview
![](@images/patchstack_iframe_overview_protected.png)

#### Software overview
![](@images/patchstack_iframe_software_protected.png)

#### Protection overview
![](@images/patchstack_iframe_protection_protected.png)