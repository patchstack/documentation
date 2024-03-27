---
title: "How do I connect Patchstack with multisite environment?"

excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Aug 16 2022 11:02:59 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu May 11 2023 13:12:15 GMT+0000 (Coordinated Universal Time)"
---
You can set up Patchstack on each of your network sites as easily as you would set it up on regular WordPress applications.  
Keep in mind that each site will be added to the Patchstack App individually and will take up a slot on your account. Every subsite of your multisite network will have an individual API key which has to be inserted correctly.

Here are the steps to take to install Patchstack on your multisite network.

## Step 1: Installing Patchstack on the multisite network

To install Patchstack on the multisite network, the easiest way is to do it via the Patchstack App.  
Navigate to <a href="https://app.patchstack.com/apps" target="_blank"><b>My Apps</b></a> on the Patchstack App and click on "+ Add New" (at the top bar).  
Type in the name of the domain and press **Enter**.  
Click on **Continue to connect plugin**.

You are then shown a popup like this:

![](@images/3c05aa3-small-fe0cd72-small-Patchstack_dialogues.png)

You can safely enter your WordPress username and password into the corresponding fields. Patchstack will connect with your app and install the plugin automatically. Please note that the login information is not stored on our end.

After inserting your credentials, click on **Auto-install and finish**.  
Patchstack should now be successfully installed on your main network.

Note that, if the automatic installation didn't work, you need to do it manually.  
For that, install the Patchstack plugin to your WordPress site. After plugin activation, enter the API key that you were shown on the Patchstack App.

## Step 2: Activating Patchstack on your network

You now need to activate the plugin on all your multisite domains.  
Let's jump into your WordPress application.

<ol><li>
Go to your Network Admin on your WordPress admin</li>
<li>Click on <b>Plugins</b></li>
<li>You should see <b>Patchstack Security</b> there. If not, download and install it from WP plugins dashboard.</li> <li>Click on <b>Network Activate</b></li>
</ol>

![](@images/3a05a15-small-Patchstack_network_activate.png)

After activating the plugin in your whole network, you will see a Patchstack screen as in the picture below:

![](@images/0ad746b-small-Screenshot_2023-05-11_at_15.57.31.png)

## Step 3: Adding your subsites to Patchstack

If Patchstack didn't already add your subsites to the Patchstack App automatically, you can do so manually as well.  
Head back to the Patchstack **My Apps** page, where you can click **+ Add new**.  
This time, enter your subsite URL (e.g [https://example.com/subsite](<>))

You will then see this popup, where you can just click **Verify installation to finish** this time.

![](@images/c8f8d0b-small-fe0cd72-small-Patchstack_dialogues_1.png)

Copy the API Key and insert them to the Patchstack plugin of your subsite.

<ol><li>From WordPress: My Sites > Network Admin</li>
<li>Click on <b>Patchstack</b> in the admin menu</li>
<li>Click on <b>Edit Settings</b> on your subsite</lI>
<li>Insert the API key of this subsite from Patchstack App</li>
</ol>

![](@images/47faf7b-Patchstack_-_manage_settings.png "Patchstack - manage settings.png")

You may check your Patchstack App now. If you see no alerts, your plugin is running correctly.  
If it isn't, feel free to write to our support chat!
