import React from "react";
import { Link, graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/layout";
import SEO from "../components/seo";
import styles from "./about.module.scss";

const About = ({ pageContext, data }) => {
  return (
    <Layout
      locale={pageContext.locale}
      rawPath={pageContext.rawPath}
      className={styles.about}
    >
      <SEO title="About" />
      <h1>{pageContext.i18n.title}</h1>
      <div className={styles.tldr}>
        <div dangerouslySetInnerHTML={{ __html: pageContext.i18n.tldr }}></div>
        <Img
          fluid={data.placeholderImage.childImageSharp.fluid}
          className={styles.aboutme}
        />
      </div>

      <div
        className={styles.depth}
        dangerouslySetInnerHTML={{ __html: pageContext.i18n.indepth }}
      ></div>
    </Layout>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "common/about.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 400, maxHeight: 246) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => <About data={data} {...props} />}
  />
);
