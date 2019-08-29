import React from "react";
import { Link, graphql } from "gatsby";

import SEO from "../components/seo";
import Layout from "../components/layout";

class BlogIndex extends React.Component {
  render() {
    const { data, pageContext } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;
    const { currentPage, numPages, locale } = this.props.pageContext;
    const baseUrl = locale === "en" ? "/blog" : `/${locale}/blog`;
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage =
      currentPage - 1 === 1
        ? baseUrl
        : `${baseUrl}/page/` + (currentPage - 1).toString();
    const nextPage = `${baseUrl}/page/` + (currentPage + 1).toString();

    return (
      <Layout
        title={siteTitle}
        locale={pageContext.locale}
        rawPath={pageContext.rawPath}
      >
        <SEO title="Blog" />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <div key={node.fields.slug}>
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
        <ul>
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              ← Previous Page
            </Link>
          )}
          {Array.from({ length: numPages }).map((_item, i) => {
            const index = i + 1;
            const link = index === 1 ? baseUrl : `${baseUrl}/page/${index}`;
            return (
              <li key={`pagination-number-${index}`}>
                <Link to={link}>{index}</Link>
              </li>
            );
          })}
        </ul>
        {!isLast && (
          <Link to={nextPage} rel="next">
            Next Page →
          </Link>
        )}
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!, $locale: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: {
        fields: { collection: { eq: "blog" }, locale: { eq: $locale } }
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
