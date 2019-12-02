import React from "react";
import { Link, graphql } from "gatsby";
import SEO from "../components/seo";
import Layout from "../components/layout";
import styles from "./blog-list.module.scss";

class BlogIndex extends React.Component {
  render() {
    const { data, pageContext } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;
    const { currentPage, numPages, locale } = this.props.pageContext;
    const baseUrl = locale === "en" ? "/blog" : `/${locale}/blog`;

    return (
      <Layout
        title={siteTitle}
        locale={pageContext.locale}
        rawPath={pageContext.rawPath}
      >
        <SEO title="Blog" />
        <h1>Blog / Tutorials</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet
          vitae veritatis qui laudantium distinctio labore deleniti facere sit
          doloremque rerum! Illum saepe cumque reiciendis quidem sint et
          sapiente vel excepturi!
        </p>
        <div className={styles.mainWrapper}>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            const iconSource =
              node.frontmatter.icon !== null
                ? node.frontmatter.icon.childImageSharp.fluid.src
                : void 0;
            return (
              <Link
                className={`${styles.wrapper} no-anim`}
                to={node.fields.slug}
                key={node.fields.slug}
              >
                <h2>{title}</h2>
                <small>{node.frontmatter.date}</small>
                <div className={styles.info}>
                  <p>{node.frontmatter.description}</p>
                  <div
                    className={styles.icon}
                    style={{ backgroundImage: `url(${iconSource})` }}
                  ></div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className={styles.side}>
          <div className="sideElement"></div>
        </div>
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
            description
            icon {
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
