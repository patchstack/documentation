---
title: "Additional settings"

excerpt: ""
hidden: false
createdAt: "Tue Jan 16 2024 15:02:52 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Jan 17 2024 15:02:17 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 3.21
---
_Accessible for the Community (paid), Developer and Business plan users._

![](@images/patchstack-protection-additional-settings.png)

## User role whitelist

You can whitelist users from the Patchstack firewall. This means that the Patchstack firewall would not run against these user types. 

1. Toggle the roles, that you wish to whitelist from the firewall. 
2. Click **Save settings** once the changes have been done.

## Country blocking

In case you want to block traffic to your site from certain countries, you can do so by scrolling down to the **Country blocking** section.  
You can start typing the names of countries into the country list input field.  
After typing the name, press **Enter** or click on the name of a given country.

![](@images/patchstack-country-blocking.png)

If you want the country blocking to start working right away, click on **Enable country blocking**.  
Scroll down and click **Save settings**.

PS! We have also added the **Inversed check** option which works the other way around.  
When this is checked, the countries which are typed into the country list input, will be the only countries from which the traffic to your site is allowed.

**Example:**  
If you want to allow traffic ONLY from Germany: 

<ol><li>Type "Germany" into <b>country input field</b></li>
<li>Check <b>"Inversed check"</b></li>
<li>Check <b>"Enable country blocking"</b></li>
<li>Click on <b>"Save settings"</b></li></ol>

## General whitelist settings

Under the **General whitelist settings** section, you can manage whitelist settings and add IP address header override rule.

> 📘 Whitelist
> 
> Each rule must be on a new line.
> 
> The following keywords are accepted  
> IP:IPADDRESS  
> PAYLOAD:someval  
> URL:/someurl
> 
> Definitions  
> IP = firewall will not run against the IP  
> PAYLOAD = if the entire payload contains the keyword, the firewall will not proceed  
> URL = if the URL contains given URL, firewall will not proceed
> 
> Example  
> IP:192.168.1.1  
> PAYLOAD:contact_form  
> URL:water  
> URL:/some-form
> 
> In this scenario, the firewall will not run if the IP address is 192.168.1.1 or if the payload contains contact_form or if the URL contains water or if the URL contains /some-form.

> 📘 IP Address Header Override
> 
> If you would like to override the IP address header that we use to grab the IP address of the visitor, enter the value to IP Address Header Override input.
> 
> This must be a valid value in the $\_SERVER array, for example HTTP_X_FORWARDED_FOR. If the $\_SERVER value you enter does not exist, it will fallback to the Patchstack IP grab function so ask your hosting company if you are unsure.
> 
> Leave this empty to use the Patchstack IP address grabbing function.

## Block IP settings

Block IPs that are a potential threat to your sites.

![](@images/1f3457c-patchstack_block_ips.png)

> 🚧 Example case:
> 
> Patchstack has blocked 5 attacks on your site from one specific IP address in a period of 60 minutes.  
> You would now want this IP to be blocked.
> 
> Type in the following data:
> 
> Block IP for **4320** Minutes  
> After **5** Blocked Attacks  
> Over A Period of **60** Minutes
> 
> Click **Save Settings**
> 
> Now - any IP address which meets all those conditions will be blocked for three days.

> 📘 IP Block List
> 
> Lets you completely block IP addresses by entering each IP address to a new line.
> 
> Following formats are accepted:  
> 127.0.0.1  
> 127.0.0.\*  
> 127.0.0.0/24  
> 127.0.0.0-127.0.0.255
