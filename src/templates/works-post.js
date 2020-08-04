import React from "react";
// import Helmet from 'react-helmet';
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import styles from "./works-post.module.scss";

export default function WorksPost({ data, pageContext }) {
  const { markdownRemark } = data;
  const imageSource =
    markdownRemark.frontmatter.image !== null
      ? markdownRemark.frontmatter.image.childImageSharp.fluid.src
      : void 0;

  return (
    <Layout
      title={`Works`}
      locale={pageContext.locale}
      rawPath={pageContext.rawPath}
    >
      <SEO title={markdownRemark.frontmatter.title} image={imageSource} />
      <h1 className={styles.workTitle}>{markdownRemark.frontmatter.title}</h1>
      <img
        className={styles.workMainImage}
        src={imageSource}
        alt={markdownRemark.frontmatter.title}
      />

      <p>
        {pageContext.i18n.released} {markdownRemark.frontmatter.date}
      </p>
      <p className={"categories"}>
        {markdownRemark.frontmatter.category.join(" / ")}
      </p>
      <p className={"tags"}>{markdownRemark.frontmatter.tags.join(" / ")}</p>
      <h2>My work on the project</h2>
      <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
    </Layout>
  );
}

export const query = graphql`
  query WorksPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "YYYY")
        category
        tags
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
`;
