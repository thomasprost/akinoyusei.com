import React from "react";
import { graphql, StaticQuery } from "gatsby";
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
      <SEO title={pageContext.i18n.title} />
      <h1>{pageContext.i18n.title}</h1>
      <div>
        <h2>Technologies</h2>
        <h3>{pageContext.i18n.techSub}</h3>
        <ul className={styles.tech}>
          <li className="stack">「Symfony」</li>
          <li className="stack">「WordPress」</li>
          <li className="stack">「Modern Javascript」</li>
        </ul>
        <h2>{pageContext.i18n.notime.title}</h2>
        <ul>
          <li>
            <a
              href="https://www.linkedin.com/in/thomas-prost-2bbbb427/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>{" "}
            |{" "}
            <a
              href="https://github.com/thomasprost"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
          <li>{pageContext.i18n.notime.position}</li>
          <li>{pageContext.i18n.notime.born}</li>
          <li>{pageContext.i18n.notime.love}</li>
        </ul>
        <div
          dangerouslySetInnerHTML={{ __html: pageContext.i18n.tldr }}
          className={styles.tldr}
        ></div>
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
        placeholderImage: file(relativePath: { eq: "top/portrait-2.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 400, maxHeight: 533) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => <About data={data} {...props} />}
  />
);
