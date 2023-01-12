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

## Garder WordPress et ses plugins à jour

Cela peut paraître évident, mais de nombreux sites vus chez des clients sont très en retard sur leurs mises à jour WordPress.
Sur les petits sites, là où il peut être bon d'activer les mises à jour automatiques, mais sur les plus gros sites, ce n'est jamais une bonne idée.
La mise à jour de WordPress et des plugins peut casser certaines des fonctionnalités / le design du site et conduire à une mauvaise UX et à une perte de revenus pour les sites de e-commerce. Voir [La partie "un peu" plus technique] pour une meilleure façon de gérer ces éléments. Si cette partie est trop compliquée, ayez au moins deux sites web (test et production), mettez à jour les plugins / WordPress via wp-admin, testez. Si tout va bien, sauvegardez la production (voir la partie sauvegarde), mettez à jour la production.

## Garder PHP à jour

PHP étant un langage de programmation populaire, c'est une cible attrayante pour un hackeur. Il est important de monter de version régulièrement pour recevoir les mises à jour de sécurité. Les bons d'hébergeurs vous donnent la possibilité de changer la version de PHP dans leurs paramètres. Faites des sauvegardes (code du site et base de données) avant de changer la version de PHP (voir la section sur les sauvegardes pour plus d'informations).

## Limiter le nombre de plugins

Plus vous ajoutez de plugins à votre site Web, plus ils seront une porte d'entrée aux vulnérabilités (et plus le site Web deviendra lent et difficile à maintenir). Évitez les plugins qui sont rarement mis à jour ou semblent louches. Gardez à l'esprit que même les plugins les plus célèbres sont piratés (plus ils sont populaires, plus ils sont intéressants à exploiter pour un hackeur). Voir [La partie "un peu" plus technique] pour quelques solutions permettant de limiter ce problème. Enfin, privilégiez un marketplace de confiance comme celui de [WordPress](https://wordpress.org/plugins/) pour télécharger vos plugins.

## Utiliser https

Que vous le mettiez en place directement sur le serveur (avec Let's Encrypt ou une autre autorité de certification), automatiquement sur votre hébergement ou grâce à une extension WordPress.

## Sécuriser le tableau de bord de WordPress

- Créez un compte par utilisateur devant se connecter à l'administration.
- N'utilisez pas le compte "admin" par défaut et supprimez-le de l'administration de WordPress.
- Donnez les permissions appropriées à chaque utilisateur (tout le monde n'a pas besoin d'être Administrateur).
- Chaque utilisateur doit avoir un mot de passe complexe et long (qui doit être unique pour ce site là) et utiliser un gestionnaire de mots de passe pour le stocker.

## Changer l'url de votre section d'administration

En changeant l'url de l'admin de votre site, vous pouvez limiter les attaques par force brute qui viseraient wp-login et wp-admin. J'utilise généralement : [WPS Hide Login](https://wordpress.org/plugins/wps-hide-login/) pour ça.

## Limiter le nombre de tentatives de connexion échouées (et autres fonctionnalités utiles)

Une chose importante à ajouter au login wordpress est de limiter le nombre de tentatives échouées. Cela réduit considérablement les tentatives par force brute sur la page login.
J'aime bien [iThemes Security](https://fr.wordpress.org/plugins/better-wp-security/) pour ça ainsi que pour :

- Changer le préfixe de la base de données (limite certaines attaques par injection SQL).
- Changer le salage (salt) de WordPress (peut être changé dans wp-config.php avec [WordPress.org secret-key service](https://api.wordpress.org/secret-key/1.1/salt/))
- Forcer la double authentification
- Changer l'ID de l'utilisateur 1 : Utile si vous ne supprimez pas le compte admin par défaut (qui a l'ID 1 dans la base de données et peut être ciblé par des scripts automatiques).

[Pour comprendre l'intérêt du salage](https://www.okta.com/blog/2019/03/what-are-salted-passwords-and-password-hashing/)

## Eviter d'envoyer des mots de passe en clair par emails / slack / plateformes de gestion de projet.

Encore quelque chose que je vois beaucoup trop souvent mais qui devrait être éviter au maximum (sinon envoyer le mot de passe de son compte à votre client et forcer le à en générer un nouveau).

- Utilisez un gestionnaire de mot de passe pour les partager. J'utilise Bitwarden, mais vous pouvez consulter le [guide de confidentialité](https://www.privacyguides.org/passwords/) pour des recommandations sécurisées.
- Sinon partagez des données sensibles par le biais d'emails chiffrés (j'utilise [ProtonMail](https://proton.me/mail))

## Sauvegarder ses données... et les télécharger !!! (ou les uploader dans un endroit sûr)

La première partie reste évidemment primordiale mais la seconde est beaucoup trop souvent mise de côté. Le simple fait de générer des sauvegardes ne peut pas suffire à une stratégie de sauvegarde sécurisée et cohérente. Téléchargez vos sauvegardes (NAS, …) ou uploadez-les dans un endroit sûr pour pouvoir y accéder plus tard. Si vos sauvegardes restent sur le même serveur que votre site web et que celui-ci est compromis, vos sauvegardes n'auront aucun intérêt.
Quelques solutions :

- Certains hébergeurs font des sauvegardes automatiques (généralement une fois par jour et les supprime au bout d'une ou 2 semaines)
- Installez un plugin qui s'occupera des sauvegardes et de l'upload dans le cloud (S3, Proton drive, ...)
- Voir les autres options dans la partie "Un peu" plus technique

# la partie "Un peu" plus technique

## Garder WordPress et ses plugins à jour | Partie 2

Ce qui marche pour moi :

- 2 ou mieux, 3 environnements : test, préprod et production.
- Si j'ai la possibilite, j'utilise [Bedrock](https://roots.io/bedrock/) pour avoir une structure plus securise et une gestion des mises a jour plus simple (Entre autres avantages). Helas, ce n'est pas toujours possible lors de projets de maintenances ou de serveurs imposes par le client. Lorsque je n'utilise pas Bedrock (ou une option similaire), je ne versionne pas WordPress, mais je versionne généralement les plugins tiers pour garder trace des changements et revenir facilement en arrière en cas de problème (Je sais que beaucoup de devs ne versionnent pas les plugins tiers).
- Mettez à jour WordPress et les plugins sur le site test. Vérifiez que les tests unitaires passent et vérifiez avec les clients que tout va bien. Validez les changements et créez une branche release pour le serveur de préprod. Checkez, checkez, checkez avec le client. Fusionnez la branche dans la branche main. Mettez à jour la production.
- Pour un meilleur cycle de vie des applications, mettez en place une stratégie CI/CD avec votre équipe / client.
  /!\ Pour vos code maison, utilisez les pull requests si vous travaillez en équipe.

## Sauvegarder ses données... et les télécharger !!! (ou les uploader dans un endroit sûr) | Partie 2

- Idem que la section qui conseillait d'utiliser un plugin pour la sauvegarde mais sans le plugin :). Mettez en place un script (sh ou bash selon ce que vous préférez) pour créer une sauvegarde du code et de la base de données. Dans le script, envoyez les sauvegardes vers le service cloud sélectionné et supprimez automatiquement les sauvegardes après X jours. Configurez une cron job (tâche qui s'exécute périodiquement) pour exécuter votre script tous les jours à minuit / X heures / x jours. [Crontab Generator](https://crontab-generator.org/) est très utile pour cette partie.

## Codez des fonctionnalités dès que vous le pouvez

Idem au précédent point. Chaque fois que vous le pouvez, développez les fonctions dont vous avez besoin sans vous appuyer sur des plugins. Les hooks, actions et filtres de WordPress (et Woocommerce) facilitent grandement l'extension de WordPress. Vous gagnerez en flexibilité, facilité de maintenance et rapidité de site.

## Restez à jour au sujet des vulnérabilités de WordPress

Vous pouvez consulter [la base de données Patchstack](https://patchstack.com/database/), [les dernières mises à jour des vulnérabilités Patchstack](https://patchstack.com/articles/wordpress-vulnerability/) ou [le blog de Sucuri](https://blog.sucuri.net/) pour vous tenir au courant des vulnérabilités de WordPress.

## Ajoutez la double authentification

[WP 2FA](https://wordpress.org/plugins/wp-2fa/) ou [iThemes Security](https://fr.wordpress.org/plugins/better-wp-security/) sont de bonnes options selon mon expérience.

# Serveur

## Sécurisez vos environnements de test et de préprod

- Limitez l'accès http par adresse IP : Très sûr mais peut vite se compliquer lorsque de nombreuses personnes sont sur le projet et que leurs adresses IP changent souvent (certains FAI vous attribuent une nouvelle IP chaque fois que vous redémarrez votre ordinateur). Cela peut entraîner une lassitude de l'utilisateur et avoir l'effet inverse à celui souhaité.
- Mettez au moins en place une authentification d'accès de base Authentification d'accès de base avec .htaccess et .htpasswd. Ce n'est pas parfait (on parle pas d'authentification de base pour rien) mais c'est mieux que rien pour les tests et les préprods. /!\ Doit être mis en place sur https [wiki de l'authentification d'accès de base](https://en.wikipedia.org/wiki/Basic_access_authentication#Security).

## Limitez les accès ssh

Limitez les accès ssh à vos environnements (test, préprod, prod) par adresses IP si possible ou au moins avec des mots de passe forts ou des fichiers pem / des comptes différents pour chaque personne devant accéder au ssh. De cette façon, vous pouvez enregistrer ce que fait chaque compte et comprendre ce qui s'est passé si un problème survenait.

## Ne partagez pas le fichier ssh pem / le mot de passe ssh sur slack, basecamp, plateformes auxquelles n'importe qui pourrait accéder / être compromis.

Comme pour le mot de passe, envoyez le fichier pem via un gestionnaire de mots de passe sécurisé ou des e-mails chiffrés.

## Principe de moindre privilège

- Ayez un utilisateur pour le serveur web (généralement www-data ou apache sur un serveur Apache, www-data sur nginx) et un autre pour la mise à jour du site web (que vous utiliserez pour git).
- N'utilisez pas directement le compte root
- Sudo seulement quand c'est absolument nécessaire et pas pour installer des dépendances (via composer, npm, ...) ni pour git (git clone, git pull, ...)
- Suivez les recommandations de WordPress pour les permissions : https://wordpress.org/support/article/hardening-wordpress/#file-permissions . Généralement 644 pour les fichiers et 755 pour les dossiers (sauf pour wp-config.php qui doit être 400 ou 440) :

```
Pour les dossiers :

find /path/to/your/wordpress/install/ -type d -exec chmod 755 {} \;

Pour les fichiers :

find /path/to/your/wordpress/install/ -type f -exec chmod 644 {} \;
```

J'espère que ces solutions concrètes aideront les personnes se sentant un peu perdue dans la gestion et la sécurisation de leur site web WordPress. Je sais que le sujet est très vaste et que je n'ai pas tout couvert dans cet article (les logs notamment).
