import React from "react";
// import Helmet from 'react-helmet';
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default function BlogPost({ data }) {
  const { markdownRemark } = data;
  const imageSource =
    markdownRemark.frontmatter.image.childImageSharp.fluid.src;

  return (
    <Layout title={`Blog`}>
      <img src={imageSource} alt={markdownRemark.frontmatter.title} />
      <h1>{markdownRemark.frontmatter.title}</h1>
      <p>{markdownRemark.frontmatter.date}</p>
      <p>By {markdownRemark.frontmatter.author}</p>
      <p>In: {markdownRemark.frontmatter.category.join()}</p>
      <p>Tags: {markdownRemark.frontmatter.tags.join()}</p>
      <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
    </Layout>
  );
}

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        author
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
