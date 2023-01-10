---
title: Improving your WordPress site security
date: 2023-01-10
image: ./shopping-list.jpg
description: Enhancing wordpress security for developers and businesses
icon: ../../../src/images/icons/wordpress.png
category:
  - Development
  - Security
tags:
  - Wordpress
  - PHP
  - Server
---

# Introduction

You can find here a list of steps to improve security on a WordPress website. Most are simple to implement, though some might be a bit more time consuming / meant for tech-savvy people. This is not a complete review of all possibilities to secure a WordPress site, just knowledge that I have gathered over the years developing, hosting and maintaining websites for a wide range of clients. I am always surprised by how security is a second-class citizen in many projects and, hopefully, this article will help some developers and businesses better secure their WordPress website.

## Target

- Non tech people who wish to learn more about WordPress security and how to implement it.
- Developers making and maintaining small to medium sized WordPress websites.
- Businesses that created and maintain their own websites.
- Businesses that work with developers (as freelance or through agencies) and want to understand some key parts of WordPress security.

## What this article won't deal with

- Advanced cyber security topics that can impact WordPress (XSS, Injection, Broken Authentication, ...) : See [Owasp Top 10 risks](https://owasp.org/www-project-top-ten/) if you are curious about this subject.
- Other frameworks than WordPress. Some points can be used on any framework and language (permissions, https, ...) but it is moslty meant for WordPress.
- Hosting and securing WordPress on Docker, Kubernetes, Terraform, AWS ... I use Docker for development and set up servers often though I am not a sysadmin and don't know enough to give useful information on this part.
- DevSecOps : Same as previous point, I like to read about it though I am not competent enough for this article.

# Security for everybody

## Keep WordPress and your plugins updated

It might seem obvious, but many WordPress sites that I have seen from clients are way behind on WordPress updates.
On small websites, it's good to have automatic updates activated though on mid to big websites that is not a good idea. Updating WordPress and plugins can break some of the features / design of your site and lead to bad UX and loss of revenues for e-commerce websites. See [The "a bit" more technical part] for a better way to manage these. If this part is too complicated, have at least two websites (test and production), update plugins / WordPress through wp-admin, test. If everything is ok, back up production (See back up part), update production.

## Avoid adding too many plugins

The more plugins you add to your website, the more vulnerabilities come with them (plus website gets slower, harder to maintain). Avoid plugins that are not maintained often or seem shady. Keep in mind that even very famous plugins get hacked (the more popular, the more interesting to exploit for a hacker). See [The "a bit" more technical part] for some solutions. Finally, use a trusted marketplace like [WordPress](https://wordpress.org/plugins/) one to download your plugins.

## Use https

Whether you set it up directly on the server (Let's Encrypt or through another certificate authority), automatically with your host or via a WordPress extension.

## Secure WordPress' admin dashboard

- Create one account per user that need to log in to the admin.
- Don't use the default "admin" account and delete it from the WordPress admin.
- Give proper permissions to each user (not everybody needs to be Administrator).
- Each user should have a complex and long password (that should be unique to the site) and use a password manager to store it.

## Change the url of your admin section

By changing the url of your website's admin, you can mitigate brute force attacks that would target wp-login and wp-admin. Usually I use : [WPS Hide Login](https://wordpress.org/plugins/wps-hide-login/) for this.

## Limit the number of login failed attempts (and other useful features)

One important thing to add to the wordpress login is to limit the number of failed attempts. It greatly reduces the risk of scripts brute forcing your login.
I like [iThemes Security](https://fr.wordpress.org/plugins/better-wp-security/) for this as well as to :

- Change Database Prefix (limits some SQL injection attacks)
- Change WordPress Salts (Can be changed in wp-config.php with [WordPress.org secret-key service](https://api.wordpress.org/secret-key/1.1/salt/))
- Force 2FA
- Change User ID 1 : Useful if you don't delete the default admin account (whom has ID 1 in database and can be targeted by scripts)
- ...

## Avoid sending clear text passwords to clients by emails / slack / platforms to manage projects

I see it way too often but it should be avoided whenever possible (or send a clear password for a new WordPress user account and force your client to reset it). Use a password manager to share passwords. I use and trust Bitwarden though you can check https://www.privacyguides.org/passwords/ for secure recommendations.

## Make backups ... and download them !!! (or upload them somewhere safe)

The first part is very important of course but the second part is often forgotten in the process of a backup policy. Just creating a backup is not enough, you need to download it or upload it somewhere safe so as to be able to access it at a later time. If backups live on your server and it gets compromised, the backups become useless. A few options :

- Some web hosts provide automatic backups (usually once a day and keep them for 1~2 weeks)
- Set up a plugin to automatically backup and upload it to the cloud (S3, Proton drive, ...)
- See other option in the "a bit" more technical part
