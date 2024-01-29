---
title: "What is the CVSS score?"
slug: "what-is-the-cvss-score"
excerpt: "You can find CVSS scores added to the vulnerability info in Patchstack database."
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Wed Jul 27 2022 11:08:00 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Jul 27 2022 11:09:25 GMT+0000 (Coordinated Universal Time)"
---
CVSS or Common Vulnerability Scoring System is a great way to measure and clearly define the danger level of vulnerability.

In other words, we can calculate the impact which can happen by exploiting a particular vulnerability. The latest CVSS version is 3.1, and we're using this as a standard in our database. 

Patchstack calculates only CVSS Base Score. CVSS offers additional scoring schemes like Temporal Score and Environmental Score.

CVSS Base score calculator uses eight parameters to calculate a particular vulnerability's severity (Attack Vector, Attack Complexity, Privileges Required, User Interaction, Scope, Confidentiality, Integrity, Availability).

It's easy to understand the simple logic behind this scheme. For example, we have the parameter "Attack Complexity," there are two possible types of this parameter Low and High.

If an attack has a high complexity, it will add fewer score points because not everyone can execute this type of attack. If an attack is easy to perform (Attack Complexity Low), it adds more score points for vulnerability.

Besides the parameters that give us a clue about the attack complexity, we have three parameters that say what could be impacted (Confidentiality, Integrity, Availability).

It is the so-called CIA Triad (you can read about the CIA Triad here - <a href="https://en.wikipedia.org/wiki/Information_security" target="_blank">https\://en.wikipedia.org/wiki/Information_security</a>)

By adding all these parameters to the CVSS calculator (you can try it yourself here <a href="https://www.first.org/cvss/calculator/3.1" target="_blank">https\://www.first.org/cvss/calculator/3.1</a>) we get the base score represented by numbers from 0.0 (zero - no threat) to 10.0 (ten -  critical threat), so the bigger number means the bigger problem.

As you can see, CVSS is a very convenient and straightforward way to show the level of danger (similar to the earthquake scale).
