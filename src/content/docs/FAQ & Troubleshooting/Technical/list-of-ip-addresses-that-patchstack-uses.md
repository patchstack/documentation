---
title: "List of IP addresses, that Patchstack servers use"
slug: "docs/list-of-ip-addresses-that-patchstack-uses"
excerpt: "Below is a list of most of the IP addresses that we currently use."
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Aug 22 2022 12:58:51 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue May 16 2023 14:17:00 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 7.3
---
Sometimes you need to whitelist these IP addresses in order to avoid your hosting provider or (secondary) firewall blocking our services.

Note that we may add and remove IP addresses at any time without notice.

18.221.197.243  
52.15.237.250  
3.19.3.34  
3.18.238.17  
13.58.49.77  
18.222.191.77  
3.131.108.250  
3.23.157.140  
3.140.84.221  
3.133.121.93  
18.219.61.133  
3.14.29.150  
18.224.116.108

**CIDR Notation**  
18.221.197.243/32  
52.15.237.250/32  
18.220.89.14/32  
3.18.238.17/32  
13.58.49.77/32  
18.222.191.77/32  
3.131.108.250/32  
3.23.157.140/32  
3.140.84.221/32  
3.133.121.93/32  
18.219.61.133/32  
3.14.29.150/32  
18.224.116.108/32

**IPTables Rules**  
iptables -A INPUT -s 18.221.197.243 -j ACCEPT  
iptables -A OUTPUT -d 18.221.197.243 -j ACCEPT  
iptables -A INPUT -s 52.15.237.250 -j ACCEPT  
iptables -A OUTPUT -d 52.15.237.250 -j ACCEPT  
iptables -A INPUT -s 3.19.3.34 -j ACCEPT  
iptables -A OUTPUT -d 3.19.3.34 -j ACCEPT  
iptables -A INPUT -s 3.18.238.17 -j ACCEPT  
iptables -A OUTPUT -d 3.18.238.17 -j ACCEPT  
iptables -A INPUT -s 13.58.49.77 -j ACCEPT  
iptables -A OUTPUT -d 13.58.49.77 -j ACCEPT  
iptables -A INPUT -s 18.222.191.77 -j ACCEPT  
iptables -A OUTPUT -d 18.222.191.77 -j ACCEPT  
iptables -A INPUT -s 3.131.108.250 -j ACCEPT  
iptables -A OUTPUT -d 3.131.108.250 -j ACCEPT  
iptables -A INPUT -s 3.23.157.140 -j ACCEPT  
iptables -A OUTPUT -d 3.23.157.140 -j ACCEPT  
iptables -A INPUT -s 3.140.84.221 -j ACCEPT  
iptables -A OUTPUT -d 3.140.84.221 -j ACCEPT  
iptables -A INPUT -s 3.133.121.93 -j ACCEPT  
iptables -A OUTPUT -d 3.133.121.93 -j ACCEPT  
iptables -A INPUT -s 18.219.61.133 -j ACCEPT  
iptables -A OUTPUT -d 18.219.61.133 -j ACCEPT  
iptables -A INPUT -s 3.14.29.150 -j ACCEPT  
iptables -A OUTPUT -d 3.14.29.150 -j ACCEPT  
iptables -A INPUT -s 18.224.116.108 -j ACCEPT  
iptables -A OUTPUT -d 18.224.116.108 -j ACCEPT
