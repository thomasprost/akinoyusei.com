import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import { graphql } from "gatsby";

const IndexPage = ({ data, pageContext }) => (
  <Layout title="Home" locale={pageContext.locale}>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
    <br />
    <Link to="/blog/">Blog</Link>
    <br />
    <Link to="/works/">Works</Link>
    <br />
    All posts
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
    </ul>
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
