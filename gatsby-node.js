const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

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

    // Get all markdown posts.
    const posts = result.data.allMarkdownRemark.edges;

    // We created a new field for the collection type and will use them to create pages.
    // Get the different types of markdown posts
    const types = result.data.allMarkdownRemark.distinct;

    types.map(type => {
      posts
        .filter(post => post.node.fields.collection === type)
        .forEach((post, index, currentArray) => {
          const previous =
            index === currentArray.length - 1
              ? null
              : currentArray[index + 1].node;
          const next = index === 0 ? null : currentArray[index - 1].node;

          const { collection } = post.node.fields;

          createPage({
            path: post.node.fields.slug,
            component: path.resolve(`./src/templates/${collection}-post.js`),
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          });

          // Only create category pages once, not for every posts of the same type
          if (index === 0) {
            const postsPerPage = 1;
            const numPages = Math.ceil(currentArray.length / postsPerPage);

            Array.from({ length: numPages }).forEach((_, i) => {
              createPage({
                path:
                  i === 0 ? `/${collection}` : `/${collection}/page/${i + 1}`,
                component: path.resolve(
                  `./src/templates/${collection}-list.js`
                ),
                context: {
                  limit: postsPerPage,
                  skip: i * postsPerPage,
                  numPages,
                  currentPage: i + 1,
                },
              });
            });
          }
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

    const url = `/${parent.sourceInstanceName}${value}`;

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
