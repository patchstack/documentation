---
title: "What is the difference between a WAF and vPatching?"

excerpt: ""
hidden: false
createdAt: "Tue Sep 20 2022 13:22:34 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Nov 23 2023 12:48:12 GMT+0000 (Coordinated Universal Time)"
---
**WAF** stands for Web Application Firewall, which is a firewall that inspects web traffic and blocks malicious requests. WAFs typically run on the web server software itself and have limited knowledge of the web applications they are protecting. WAFs tend to include and run all firewall rules against all requests, even if it does not apply to the underlying software.

**vPatching** is similar to WAF: blocking known malicious requests but running within the application itself. Patchstack's vPatching goes a step further and can take into context information that only the application (such as WordPress) itself is aware of, like user authorization, software versions, etc. Patchstack has built the vPatch system, a specific method that provides auto-mitigation to open-source software security vulnerabilities through crowdsourced security research and AI/ML based source code analysis.

This means that vPatches tend to be more efficient and cause less resource usage in the application compared to a WAF because the only rules that are enabled are the ones applicable to each website.

<a href="https://patchstack.com/articles/virtual-patching/" target="_blank">Read more about vPatching here</a>
