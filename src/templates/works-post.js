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
  const { i18n } = pageContext;

  console.log(markdownRemark.frontmatter);
  return (
    <Layout
      title={`Works`}
      locale={pageContext.locale}
      rawPath={pageContext.rawPath}
    >
      <SEO
        title={markdownRemark.frontmatter.title}
        image={imageSource}
        description={`${
          markdownRemark.frontmatter.company
        } | ${markdownRemark.frontmatter.category.join(" ")}`}
      />
      <h1 className={styles.workTitle}>{markdownRemark.frontmatter.title}</h1>
      <img
        className={styles.workMainImage}
        src={imageSource}
        alt={markdownRemark.frontmatter.title}
      />

      <p>
        {pageContext.i18n.released} {markdownRemark.frontmatter.date}
      </p>
      {markdownRemark.frontmatter.linko && (
        <a
          href={markdownRemark.frontmatter.linko}
          target="_blank"
          rel="noreferrer"
        >
          Link to project
        </a>
      )}
      <p className={"categories"}>
        {markdownRemark.frontmatter.category.join(" / ")}
      </p>
      <p className={"tags"}>{markdownRemark.frontmatter.tags.join(" / ")}</p>
      <h2>{i18n.mywork}</h2>
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
        company
        linko
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
