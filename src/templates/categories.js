import React from "react";
import { Link, graphql } from "gatsby";

import SEO from "../components/seo";
import Layout from "../components/layout";

class Categories extends React.Component {
  render() {
    const { data } = this.props;
    const posts = data.allMarkdownRemark.edges;
    const { category, locale } = this.props.pageContext;

    return (
      <Layout>
        <SEO title="Works" />
        <h1>Category: {category}</h1>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <div key={node.fields.slug}>
              {locale}
              <h3>
                <Link style={{ boxShadow: "none" }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          );
        })}
      </Layout>
    );
  }
}

export default Categories;

export const pageQuery = graphql`
  query categoriesPageQuery(
    $locale: String!
    $category: String!
    $type: String!
  ) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { category: { eq: $category } }
        fields: { collection: { eq: $type }, locale: { eq: $locale } }
      }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`;
