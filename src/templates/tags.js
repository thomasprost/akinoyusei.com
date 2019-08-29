import React from "react";
import { Link, graphql } from "gatsby";

import SEO from "../components/seo";
import Layout from "../components/layout";

class Tags extends React.Component {
  render() {
    const { data, pageContext } = this.props;
    const posts = data.allMarkdownRemark.edges;
    const { tag, locale } = this.props.pageContext;

    return (
      <Layout>
        <SEO title="Works" />
        <h1>Tag: {tag}</h1>
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

export default Tags;

export const pageQuery = graphql`
  query tagsPageQuery($locale: String!, $tag: String!, $type: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { tags: { eq: $tag } }
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
