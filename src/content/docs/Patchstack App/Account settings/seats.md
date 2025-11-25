---
title: "Seats"

excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Jul 25 2022 09:21:53 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu May 25 2023 12:55:11 GMT+0000 (Coordinated Universal Time)"
sidebar:
  order: 9.4
---
_Seats and team features are available on the Developer and Enterprise plan users only._  

To manage your seats and team settings, click on your name on Patchstack App (at the bottom left corner of the screen), then navigate to the **Seats** page, or click here: https://app.patchstack.com/team

On the **Seats** page you can manage the seats. The seat management feature allows you to add sub-users to your account to which you can assign specific permissions and/or sites.  
When you add a new user, they will receive an email with a link to activate their account.

<b>Available roles</b>

<ol><li>Owner: Full control of all users and sites of all users, only 1 owner can exist.</li>
<li>Admin: Full control of all users and sites of all users, but cannot alter owners or other admins.</li>
<li>Manager: Full control of all sites of all users, cannot modify users.</li>
<li>Member: Read and write access to sites assigned to this user, cannot modify users or delete sites.</li>
<li>Independent: An account that is isolated from the others, only the owner can access its sites. This role can be useful in case you want to have a Patchstack account that inherits the subscription type of the owner but needs to be completely protected from other isolated accounts.</li></ol>

In order to attach a site to a user, go to **Site** > **Action button** > **Attach To User**.

![](@images/05d1c7f-small-Patchstack_account_team.png)

### Adding a seat user

To add a seat user, click on **Add seat user**.  
Add a name, email address and role of the seat user.

Note that you can **only add email addresses** that have **not yet registered** in Patchstack.

![](@images/7bc1fea-small-Patchstack_adding_seat_user.png)

After adding the user, you can see the added user in the table below.  
An invitation will be sent to that email asking to register an account on Patchstack App.

### Attaching a "Member" seat user to sites

If you assigned a user the "Member" role, you can choose which sites you want to attach this user.
For that, scroll down to the **Sites** table.
You can see all your sites in this view.  
Click on **Action** and **Attach to user** on the corresponding site.

You will be shown a popup, where you can choose, which seat attaches to the site.  
Pick the newly created user and click on **"Attach"**.

![](@images/patchstack-attach-site-to-seat.png)

Now the new user can manage the site from their own Patchstack App account.

### Detaching a seat user from the site

To detach a user from managing the site, scroll down to the **Sites** table on the page.
Pick a site and click **Action** and **Detach from user**.
You will be shown a confirmation popup.
