---
title: "Hardening > Firewall"
slug: "docs/hardening-firewall"
excerpt: ""
hidden: true
createdAt: "Thu Aug 04 2022 09:21:26 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jan 18 2024 13:27:42 GMT+0000 (Coordinated Universal Time)"
---
On the **Firewall** subpage of your application, you can change multiple settings:

<ul><li>
Firewall</li>
<li>Hardening</li>
<li>Login Protection</li>
<li>Cookie Notice</li>
</ul>

![](@images/0dec560-patchstack-hardening-firewall.png)

## Firewall Settings

_Accessible for the Community, Developer and Business plan users._

Under the **Firewall Settings** section, you can switch the state of your web app's firewall and manage the rules of IP addresses.

> 🚧 Example case:
> 
> Patchstack has blocked 5 attacks on your application by one specific IP address in a period of 60 minutes.  
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

With Patchstack, you can override IP address headers; block certain IPs and whitelist certain traffic to your web application.

> 📘 IP Address Header Override
> 
> If you would like to override the IP address header that we use to grab the IP address of the visitor, enter the value to IP Address Header Override input.
> 
> This must be a valid value in the $\_SERVER array, for example HTTP_X_FORWARDED_FOR. If the $\_SERVER value you enter does not exist, it will fallback to the Patchstack IP grab function so ask your hosting company if you are unsure.
> 
> Leave this empty to use the Patchstack IP address grabbing function.

> 📘 IP Block List
> 
> Lets you completely block IP addresses by entering each IP address to a new line.
> 
> Following formats are accepted:  
> 127.0.0.1  
> 127.0.0.\*  
> 127.0.0.0/24  
> 127.0.0.0-127.0.0.255

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

## Country Blocking

_Accessible for the Developer and Business plan users only._

In case you want to block traffic to your web application from certain countries, you can do so by scrolling down to the **Country Blocking** section.  
You can start typing the names of countries into the **"Blocked Countries"** input.  
After typing the name, press **Enter** or click on the name of a given country.

![](@images/09a9e14-small-Patchstack_-_country_blocking.png)

If you want the country blocking to start working right away, click on **Enable Country Blocking**.  
You may then click **Save Settings**.

PS! We have also added the **Inversed Check** option which works the other way around.  
When this is checked, the countries which are typed into the "Blocked Countries" input, will be the only countries from which the traffic to your application is allowed.

**Example:**  
If you want to allow traffic from only Germany: 

<ol><li>Type "Germany" into <b>"Blocked Countries"</b></li>
<li>Check <b>"Inversed Check"</b></li>
<li>Check <b>"Enable Country Blocking"</b></li>
<li>Click on <b>"Save Settings"</b></li></ol>

## .htaccess Features

_Accessible for the Developer and Business plan users only._

From **.htaccess Features** you can directly modify your .htaccess file by changing your settings.

What you can do:

<ul>
<li>Add security headers</li>
<li>Prevent default WordPress file access</li>
<li>Block access to debug.log file</li>
<li>Disable index views</li>
<li>Forbid proxy comment posting</li>
<li>Prevent image hotlinking</li>
</ol>

![](@images/42ab5b5-small-Patchstack_-_Hardening_firewall.png)

In case you wish to write custom htaccess rules to the file, you can insert your rules to **Custom .htaccess rules** textfield.  
Additionally, you can select if your written rules appear at the bottom of Patchstack rules or at the top of Patchstack rules in the .htaccess file.

Please note that If the custom htaccess rules provided there break your web application, Patchstack will automatically remove them and revert the .htaccess to the previous working state.

Having done all your changes, click on **Save Settings** at the bottom of this section.
