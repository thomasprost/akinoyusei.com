---
title: Creating a Shopping list system with React Query and Strapi - Part 2 (In Progress)
date: 2020-12-01
image: ./shopping-list.jpg
description: Experimenting with React Query and Strapi to manage groceries - Part 2
icon: ../../../src/images/icons/js.png
category:
  - Development
tags:
  - React
  - Hooks
  - React Query
  - Strapi
---

### Introduction

Following the first part of Shopping list to use React Queries and Strapi as API, here are some improvements. We will talk about Environment variables, deploying to production and adding Content Loader to improve user experience.

### Stack

- Creating a Shopping list system with React Query and Strapi - Part 1
- React
- React Query
- Strapi
- Primitive UI (small Sass boilerplate)
- React Content Loader
- Yarn (you can use npm/npx of course)

### Setting up Environment variables

Until now we have been using an hard coded url in our api queries though it's not maintainable nor easy to deploy on production.

Thus we will define an environment variable for our API url

There are different ways to manage environment variables, in this project we will use a .env file to store them.

At the root create two files : .env and .env.local

.env is usually used as an example with dummy values that will be commited to source control (Never commit real production values / secrets into git/svn/...)

.env.local will override .env and won't be commited to source control. This way, we can create a .env.local in each of our environments (local dev, staging, production, ...) without polluting source control.

From [Create React App](https://create-react-app.dev/docs/adding-custom-environment-variables/) :

> Note: You must create custom environment variables beginning with REACT_APP. Any other variables except NODE_ENV will be ignored to avoid accidentally exposing a private key on the machine that could have the same name. Changing any environment variables will require you to restart the development server if it is running.

For now, let's just add a new variable in .env.local :

```
REACT_APP_API_URL=http://localhost:1337/
```

We can do the same in .env file as it's only a local url, nothing secret here. Next time you or another developer pull from the repository, just copy .env into .env.local file and replace the url with the one you need for your environment.

We can now update our Queries.js file to use our variable:

```
const apiUrl = process.env.REACT_APP_API_URL;
```

and replace each hard-coded urls with our new constant, for example:

```javascript{1}
const res = await fetch(`${apiUrl}shopping-items/${id}`);
```

### React content loader to improve user experience (soon)

### Deploying our Application and API (soon)

### Future Improvements (soon)
