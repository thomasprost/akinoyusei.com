import React from "react";
// import Helmet from 'react-helmet';
import { graphql } from "gatsby";
import Layout from "../components/layout";
import BlogPostDetails from "../components/Blog/blogPostDetails";

export default function BlogPost({ data, pageContext }) {
  const { markdownRemark } = data;
  const imageSource =
    markdownRemark.frontmatter.image.childImageSharp.fluid.src;

  return (
    <Layout
      title={`Blog`}
      locale={pageContext.locale}
      rawPath={pageContext.rawPath}
    >
      <BlogPostDetails data={data} />
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
        ingredients
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
