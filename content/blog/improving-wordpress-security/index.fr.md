---
title: Améliorer la sécurité de son site Wordpress
date: 2023-01-10
image: ./code.jpg
description: Permettre aux developpeurs et aux entreprises d'ameliorer la securite de leurs sites Wordpress
icon: ../../../src/images/icons/wordpress.png
category:
  - Développement
  - Sécurité
tags:
  - Wordpress
  - PHP
  - Serveur
---

# Introduction

Au fil des années, je suis toujours surpris de constater que la sécurité d'un site web reste au second plan par de nombreuses TPE et PME. Les entreprises ne mesurent généralement pas le danger et ne savent pas vraiment par où commencer en matière de sécurité.
Dans cet article, j'ai essayé de dresser une liste pour aider à améliorer la sécurité d'un site Web WordPress. Même si la plupart des points sont simples à mettre en œuvre, la deuxième partie de l'article se concentre sur des solutions plutôt destinées à des développeurs.
Il ne s'agit pas d'une revue complète de toutes les possibilités de sécurisation d'un site WordPress, mais simplement des connaissances que j'ai accumulées au fil des années de développement, d'hébergement et de maintenance de sites pour un large éventail de clients. J'espère que cet article aidera certains développeurs et entreprises à mieux sécuriser leur site WordPress.

## Cible

- Les non technicien·nes qui souhaitent en savoir plus sur la sécurité de WordPress et sur la manière de la mettre en œuvre.
- Les développeurs qui créent et gèrent des sites WordPress de petite et moyenne taille.
- Les entreprises qui créent et gèrent leurs propres sites Web.
- Les entreprises qui travaillent avec des développeurs (en tant que freelance ou par le biais d'agences) et qui souhaitent mieux comprendre certains éléments clés de la sécurité de WordPress.

## Cet article ne traitera pas de

- Cybersécurité plus avancée et failles pouvant impacter WordPress (XSS, Injection, Mauvaise gestion de l'authentification, ...) : Voir [Owasp Top 10 risks](https://owasp.org/www-project-top-ten/) (en anglais) si vous voulez en connaître plus sur le sujet.
- Autres frameworks que WordPress. Certains points peuvent être utilisés sur n'importe quel framework et langage (permissions, https, ...) mais ils sont surtout destinés à WordPress sur cet article.
- Héberger et sécuriser WordPress sur Docker, Kubernetes, Terraform, AWS ... J'utilise Docker pour le développement et je configure souvent des serveurs mais je ne suis pas administrateur système et ne maîtrise pas assez cette partie vous vraiment vous être utile.
- DevSecOps : Même chose que le point précédent, j'aime me documenter sur ce sujet mais ne suis pas assez compétent pour en faire un article.

# La sécurité pour tous

## Gardez WordPress et ses plugins à jour

Cela peut paraître évident, mais de nombreux sites vus chez des clients sont très en retard sur leurs mises à jour WordPress.
Sur les petits sites, là où il peut être bon d'activer les mises à jour automatiques, mais sur les plus gros sites, ce n'est jamais une bonne idée.
La mise à jour de WordPress et des plugins peut casser certaines des fonctionnalités / le design du site et conduire à une mauvaise UX et à une perte de revenus pour les sites de e-commerce. Voir [La partie "un peu" plus technique] pour une meilleure façon de gérer ces éléments. Si cette partie est trop compliquée, ayez au moins deux sites web (test et production), mettez à jour les plugins / WordPress via wp-admin, testez. Si tout va bien, sauvegardez la production (voir la partie sauvegarde), mettez à jour la production.

## Gardez PHP à jour

PHP étant un langage de programmation populaire, c'est une cible attrayante pour un hackeur. Il est important de monter de version régulièrement pour recevoir les mises à jour de sécurité. Les bons d'hébergeurs vous donnent la possibilité de changer la version de PHP dans leurs paramètres. Faites des sauvegardes (code du site et base de données) avant de changer la version de PHP (voir la section sur les sauvegardes pour plus d'informations).

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

## Limit the number of login failed attempts (and other useful features)

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
