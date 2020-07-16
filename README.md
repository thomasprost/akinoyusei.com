<h1 align="center">
  My portfolio website
</h1>
This is the repository of my [portfolio website](https://www.akinoyusei.com).

You can use it as a base for your gatsby project or use some of the code that might be useful to you.

### Technologies and choices made

#### Gatsby

Project was made using [Gatsby Framework](https://www.gatsbyjs.org/).

Gatsby is a free and open source framework based on React that helps developers build blazing fast websites and apps.

#### Scss with css modules

When I started the projects I thought about using other patterns to manage css but finally used css modules.

- Pros:

  - splits styles into files easily
  - Loads styles only on the needed pages
  - Easily integrated with Gatsby and Sass

- Cons:
  - Messy very quickly with so many files in many places
  - Using global styles and mixins becomes more complicated than expected at first
  - Takes more time to code for me than a "same directory" pattern with sass and splitting styles inside this style directory.

In the next version of the website, I'll think about using Styled components or switch back to a simple structure for sass files.

#### Transitions

Transitions between pages are made thanks to [Anilink](https://transitionlink.tylerbarnes.ca/docs/anilink/) a wrapper around the TransitionLink component using Gsap.

#### Languages

When I started developping this site, there wasn't much option to have multilanguage in a Gatsby site. Now, it seems that there are some useful libraries that could be more efficient than my code.

Anyway I wanted to try managing languages on the website for both pages and content (blogs and works) by myself. Even if it's not perfect, I learned a lot doing it and it fits my need (for now).

Site languages are in src/constants/locales.js and gastby-node.js will override the static pages creation to recreate them for all languages set in the locales. It will also pass the proper translation object to each page (src/constants/i18n.js) so that a page has only its set of translations and not the whole object.

#### Tags and categories

Blogs and works have tags and categories displayed on their details pages though I don't use the category/tags list pages for now.

TODO : Clean category and tag pages creation in gatsby-node or use them on the website to filter content.

#### Light and Dark Mode

Mode is set up in src/context/ThemeContext.js which is using React ThemeContext to manage its state.

### Things to improve

There are many things to improve in the codebase as previously mentioned. I'm still learning a lot about Gatsby and React so hopefully I'll be able to clean my code and reorganize files while learning more. For example, I'm not happy with how Templates and Components are organized.

### Acknoledgment

#### Development

I have learned a lot through these high-quality articles and tutorials about Gatsby and React. I hope that they will be useful to others:

- [Tania Rascia's blog and github](https://www.taniarascia.com/)
- [Managing images in Gatsby](https://www.orangejellyfish.com/blog/a-comprehensive-guide-to-images-in-gatsby/)
- [Managing images in Gatsby 2](http://stayregular.net/blog/adding-images-and-media-to-your-gatsbyjs-blog)
- [Managing languages in Gatsby](https://medium.com/significa/i18n-with-gatsby-528607b4da81)
- [i18n in React](https://alligator.io/react/i18n-with-react-and-i18next/)
- [Advanced blog system in Gatsby](https://significa.co/blog/advanced-blog-system-in-gatsby)
- [GraphQl](https://github.com/gatsbyjs/gatsby/issues/1634)
- [Wes Bos tutorials](https://wesbos.com/courses)
- [Grafikart - In French](https://www.grafikart.fr/) Crazy good quality web tutorials

### Design

I suck at design so was definitely useful

- [colorspace](https://mycolor.space/)
- [Codrops](https://tympanus.net/codrops/)
- A lot of feedbacks and helps from [Visun.fr](visun.fr) and [Kissing Kourami](https://kissingkourami.jp/) freelancers.
