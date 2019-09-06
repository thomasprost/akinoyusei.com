import React from "react";
import { Link, graphql } from "gatsby";

import SEO from "../components/seo";
import Layout from "../components/layout";
import Work from "../components/Work/work";

class WorksIndex extends React.Component {
  render() {
    const { data, pageContext } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;
    const { currentPage, numPages, locale } = this.props.pageContext;
    const baseUrl = locale === "en" ? "/works" : `/${locale}/works`;

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
        <SEO title="Works" />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            return <Work key={node.fields.slug} data={node} />;
          })}
        </div>
        <ul>
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              ← Previous Page
            </Link>
          )}
          {Array.from({ length: numPages }).map((item, i) => {
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

export default WorksIndex;

export const pageQuery = graphql`
  query worksPageQuery($skip: Int!, $limit: Int!, $locale: String!) {
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
        fields: { collection: { eq: "works" }, locale: { eq: $locale } }
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
            category
            image {
              childImageSharp {
                fluid {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;
