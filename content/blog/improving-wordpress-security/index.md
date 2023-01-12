---
title: Improving your WordPress site security
date: 2023-01-10
image: ./code.jpg
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

I am always surprised by how security is a second-class citizen for many companies. Businesses usually don't measure the danger and don't really know where to start security wise. Here, I tried compiling a list of steps to improve security on a WordPress website. Most are simple to implement, though some might be a bit more time consuming / meant for tech-savvy people.
This is not a complete review of all possibilities to secure a WordPress site, just knowledge that I have gathered over the years developing, hosting and maintaining websites for a wide range of clients. Hopefully, this article will help some developers and businesses better secure their WordPress website.

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

## Keep PHP updated

PHP being a popular programming language, it is heavily targeted. Keeping it updated is important to receive security updates. Good host providers give you the possibility to change PHP version in your host settings. Make backups (website code + database) before changing the PHP version (See backup section for more info).

## Avoid adding too many plugins

The more plugins you add to your website, the more vulnerabilities come with them (plus website gets slower and harder to maintain). Avoid plugins that are not maintained often or seem shady. Keep in mind that even very famous plugins get hacked (the more popular, the more interesting to exploit for a hacker). See [The "a bit" more technical part] for some solutions to avoid this problem. Finally, use a trusted marketplace like [WordPress](https://wordpress.org/plugins/) one to download your plugins.

## Use https

Whether you set it up directly on the server (Let's Encrypt or through another certificate authority), automatically with your host or via a WordPress extension.

## Secure WordPress' admin dashboard

- Create one account per user that need to log in to the admin.
- Don't use the default "admin" account and delete it from the WordPress admin.
- Give proper permissions to each user (not everybody needs to be Administrator).
- Each user should have a complex and long password (that should be unique to the site) and use a password manager to store it.

## Change the url of your admin section

By changing the url of your website's admin, you can mitigate brute force attacks that would target wp-login and wp-admin. Usually I use : [WPS Hide Login](https://wordpress.org/plugins/wps-hide-login/) for this.

## Limit the number of failed login attempts (and other useful features)

One important thing to add to the wordpress login is to limit the number of failed attempts. It greatly reduces the risk of scripts brute forcing your login.
I like [iThemes Security](https://fr.wordpress.org/plugins/better-wp-security/) for this as well as to :

- Change Database Prefix (limits some SQL injection attacks)
- Change WordPress Salts (Can be changed in wp-config.php with [WordPress.org secret-key service](https://api.wordpress.org/secret-key/1.1/salt/))
- Force 2FA
- Change User ID 1 : Useful if you don't delete the default admin account (whom has ID 1 in database and can be targeted by scripts)
- ...

[To understand why changing the salt is important.](https://www.okta.com/blog/2019/03/what-are-salted-passwords-and-password-hashing/)

## Avoid sending clear text passwords to clients by emails / slack / platforms to manage projects

I see it way too often but it should be avoided whenever possible (or send a clear password for a new WordPress user account and force your client to reset it). Use a password manager to share passwords. I use and trust Bitwarden though you can check [Privacy guides](https://www.privacyguides.org/passwords/) for secure recommendations.
Sharing sensitive data with encrypted emails (I use [ProtonMail](https://proton.me/mail)) is also a good option.

## Make backups ... and download them !!! (or upload them somewhere safe)

The first part is very important of course but the second part is often forgotten in the process of a backup policy. Just creating a backup is not enough, you need to download it or upload it somewhere safe so as to be able to access it at a later time. If backups live on your server and it gets compromised, the backups become useless. A few options :

- Some web hosts provide automatic backups (usually once a day and keep them for 1~2 weeks)
- Set up a plugin to automatically backup and upload it to the cloud (S3, Proton drive, ...)
- See other option in the "a bit" more technical part

# The "a bit" more technical part

## Keep WordPress and your plugins updated | Part 2

What works for me :

- Have 2 or even better 3 environments : test, staging and production.
- If I can, set up the project through [Bedrock](https://roots.io/bedrock/) to have a more secure structure and easier way to manage updates. Not always possible when maintaining websites made by someone else / have limitations on a server set up by client. If not using Bedrock (or similar option), I don't version WordPress but usually I version third-party plugins to keep track of changes / easily roll back when bugs arise.
- Update WordPress and plugins on test. Check that unit tests pass and check with clients that everything is ok. Commit the changes and create a release branch for staging server. Check, check, check with client. Merge release into main. Update production.
- For a better application lifecycle, implement a CI/CD strategy with your team / client.
  /!\ For own code changes, use pull requests if working in a team.

## Make backups ... and download them !!! (or upload them somewhere safe) | Part 2

- Same as using a plugin for backuping but without a plugin :). Set up a script (sh or bash depending on what you prefer) to create a backup of the code and the database. In the script, send the backups to the cloud service selected and automatically delete backups after X days. Set up a cron job (job that run periodically) to run your script every day at midnight / X hours / x days. [Crontab Generator](https://crontab-generator.org/) is very helpful for this part.

## Code features whenever you can

This is linked to the previous point. Whenever you can, develop the functions you need without relying on plugins. WordPress (and Woocommerce) hooks, actions and filters facilitate extending WordPress.

## Stay updated with WordPress vulnerabilities

You can check [Patchstack database](https://patchstack.com/database/), [Patchstack latest vulnerabilities updates](https://patchstack.com/articles/wordpress-vulnerability/) or [Sucuri's blog](https://blog.sucuri.net/) to get updated on WordPress vulnerabilities.

## Add Two-factor Authentication

[WP 2FA](https://wordpress.org/plugins/wp-2fa/) or [iThemes Security](https://fr.wordpress.org/plugins/better-wp-security/) seem to be good options in my experience.

# Server

## Secure your test and staging environments

- Limit http access by IP addresses : Very secure though can be complicated with many people on the project / client and IP addresses that change often (some ISPs assign you a new IP every time you restart your computer). This can lead to user's fatigue and have the opposite effect to that desired.
- Set up Basic Access Authentication with .htaccess and .htpasswd. This is not perfect (it's called basic for a reason) but better than nothing for test / staging. /!\ Must be used over https [Basic Access Authentication's wiki](https://en.wikipedia.org/wiki/Basic_access_authentication#Security).

## Limit ssh access

Limit ssh accesses to your environments (test, staging, prod) by IP addresses when possible or at least with strong passwords or pem files / different accounts for each person that need to access ssh. That way you can log what each account does and understand what happened if a problem arises.

## Don't share ssh pem file / ssh password on slack, basecamp, platforms that anybody could access / be compromised

Same as the password part, send pem file through a secure password manager or encrypted emails.

## Least Privilege rules

- Have one user for the web server (usually www-data or apache on Apache server, www-data on nginx) and one to update website (that you will use for git)
- Don't use root account directly
- Sudo only when absolutely needed and not to install dependencies (through composer, npm, ...) nor for git (git clone, git pull, ...)
- Follow WordPress recommendations for permissions : https://wordpress.org/support/article/hardening-wordpress/#file-permissions . Usually 644 for files and 755 for folders (except for wp-config.php that should be 400 or 440) :

```
For Directories:

find /path/to/your/wordpress/install/ -type d -exec chmod 755 {} \;

For Files:

find /path/to/your/wordpress/install/ -type f -exec chmod 644 {} \;
```

Hopefully this will help some people that feel a bit lost on the security side when using / maintaining WordPress websites and wanted to know some concrete solutions. The subject is very wide and I know that I didn't cover everything.
