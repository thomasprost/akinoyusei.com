import React from "react";
import Helmet from "react-helmet";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import { graphql } from "gatsby";

const IndexPage = ({ data, pageContext }) => (
  <Layout title="Home" pageName="home" locale={pageContext.locale}>
    <Helmet
      bodyAttributes={{
        class: "home",
      }}
      htmlAttributes={{
        class: "home",
      }}
    ></Helmet>
    <SEO title="Home" />
    <h1>こんにちは、</h1>
    <p>I'm Thomas Prost</p>
    <p>a freelance web developer</p>
    <p>living in 東京。</p>
    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div> */}
    {/* <Link to="/page-2/">Go to page 2</Link>
    <br />
    <Link to="/blog/">Blog</Link>
    <br />
    <Link to="/works/">Works</Link>
    <br /> */}
    {/* All posts
    <ul>
      {data.allMarkdownRemark.edges.map(post => {
        return (
          <li key={post.node.id}>
            <Link to={post.node.fields.slug}>
              {post.node.frontmatter.title}
            </Link>
          </li>
        );
      })}
    </ul> */}
  </Layout>
);

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

export default IndexPage;
