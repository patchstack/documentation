---
title: "Client Report"
slug: "client-report"
excerpt: "Periodic PDF security report for site owners"
hidden: true
metadata: 
  image: []
  robots: "index"
createdAt: "Fri Mar 03 2023 14:29:56 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu May 25 2023 11:53:30 GMT+0000 (Coordinated Universal Time)"
---
_This feature is for the Business plan users only._  
<https://app.patchstack.com/reports/>

**Client Report** is a periodic PDF security report. It means you will need to pick a time period (for example a month), in which the data is shown on the report. If you manage your clients' websites, this type of report can be sent to them.

**Data in this report:**

- How many attacks were blocked during the period
- How many security vulnerabilities were fixed during the period
- How many actions were taken that may affect security
- Statistics and detailed information about:
  - amount of vulnerabilities on the site at the moment; 
  - amount of new vulnerabilities that were identified; 
  - amount of vulnerabilities that have been solved during that period;
- Security maintenance log - which actions were taken during the period (component updates, deletions, activations, installations)
- Software overview - shows which plugins and themes are currently present on the website and what is the status of each component (see the screenshot below)
- Shows the total number of attacks blocked during the period
- Shows the top 3 threat types and top 3 attacking origin countries
- Shows which attacks were blocked by virtual patches, basic firewall rules, and custom firewall rules

Maintenance reports can be scheduled to be generated automatically. You can see and download the scheduled reports by visiting the **Reports** page and clicking on the **Scheduled reports** tab.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/638470b-patchstack_maintenance_report.png",
        null,
        ""
      ],
      "align": "center",
      "border": true
    }
  ]
}
[/block]


[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/6653b9c-patchstack_maintenance_report_firewall.png",
        null,
        ""
      ],
      "align": "center",
      "border": true
    }
  ]
}
[/block]
