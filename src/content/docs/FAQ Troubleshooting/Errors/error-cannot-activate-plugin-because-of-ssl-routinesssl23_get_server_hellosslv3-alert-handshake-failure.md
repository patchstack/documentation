---
title: "Error: Cannot activate plugin because of: SSL routines:SSL23_GET_SERVER_HELLO:sslv3 alert handshake failure"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Fri Aug 26 2022 11:26:25 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Aug 26 2022 11:26:25 GMT+0000 (Coordinated Universal Time)"
---
When you see this error when you attempt to activate Patchstack:
1. Check, if your server is using TLS 1.2 protocol activated. You can easily test it here: https://www.cdn77.com/tls-test 
In case it is disabled, you should activate it in your hosting environment.
2. Ask your host to upgrade cURL/OpenSSL on your server to the latest version.