const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const siteLocales = require("./src/constants/locales");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                collection
                locale
              }
              frontmatter {
                title
              }
            }
          }
          distinct(field: fields___collection)
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    const allLocales = ["en", "fr"];

    // Get all markdown posts.
    const posts = result.data.allMarkdownRemark.edges;

    // We created a new field for the collection type and will use them to create pages.
    // Get the different types of markdown posts
    const types = result.data.allMarkdownRemark.distinct;

    types.map(type => {
      allLocales.map(lang => {
        posts
          .filter(post => post.node.fields.collection === type)
          .filter(post => post.node.fields.locale === lang)
          .forEach((post, index, currentArray) => {
            const previous =
              index === currentArray.length - 1
                ? null
                : currentArray[index + 1].node;
            const next = index === 0 ? null : currentArray[index - 1].node;

            const { collection, locale } = post.node.fields;

            createPage({
              path: post.node.fields.slug,
              component: path.resolve(`./src/templates/${collection}-post.js`),
              context: {
                slug: post.node.fields.slug,
                locale,
                previous,
                next,
              },
            });

            // Only create category pages once, not for every posts of the same type
            if (index === 0) {
              const postsPerPage = 1;
              const numPages = Math.ceil(currentArray.length / postsPerPage);

              Array.from({ length: numPages }).forEach((_, i) => {
                const baseUrl =
                  locale === "en"
                    ? `/${collection}`
                    : `/${locale}/${collection}`;
                createPage({
                  path: i === 0 ? baseUrl : `${baseUrl}/page/${i + 1}`,
                  component: path.resolve(
                    `./src/templates/${collection}-list.js`
                  ),
                  context: {
                    limit: postsPerPage,
                    skip: i * postsPerPage,
                    numPages,
                    locale,
                    currentPage: i + 1,
                  },
                });
              });
            }
          });
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    // Get the parent node
    const parent = getNode(node.parent);

    // Blogs and works can have multiple markdown files in each folder to manage translations
    // We need to grab the locale (usually index.fr.md or any other locale) and generate an url from it : /fr/type/folder-name/
    // If no locale, just create /type/folder-name/ it will use the english file
    const [, locale] = parent.name.split(".");

    const url = `${locale !== undefined ? `/${locale}` : ""}/${
      parent.sourceInstanceName
    }/${parent.relativeDirectory}`;

    createNodeField({
      name: "locale",
      node,
      value: locale !== undefined ? locale : "en",
    });

    // Crate a new field for the locale. Default value is english
    createNodeField({
      name: `slug`,
      node,
      value: url,
    });

    // Create a field on this node for the "collection" of the parent
    // NOTE: This is necessary so we can filter `allMarkdownRemark` by
    // `collection` otherwise there is no way to filter for only markdown
    // documents of type `post`.
    createNodeField({
      node,
      name: "collection",
      value: parent.sourceInstanceName,
    });
  }
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  deletePage(page);

  Object.keys(siteLocales).map(lang => {
    const localizedPath = siteLocales[lang].default
      ? page.path
      : siteLocales[lang].path + page.path;


    return createPage({
      ...page,
      path: localizedPath,
      context: {
        locale: siteLocales[lang].locale,
        rawPath: page.path
      },
    });
  });
};
