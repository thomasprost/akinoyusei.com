import React from "react";
// import Helmet from 'react-helmet';
import { graphql } from "gatsby";
import Layout from "../components/layout";
import BlogPostDetails from "../components/Blog/blogPostDetails";
import SEO from "../components/seo";

export default function BlogPost({ data, pageContext }) {
  const { markdownRemark } = data;
  const image = markdownRemark.frontmatter.image
    ? markdownRemark.frontmatter.image.childImageSharp.fluid.src
    : null;
  console.log(markdownRemark.frontmatter);
  return (
    <Layout
      title={`Blog`}
      locale={pageContext.locale}
      rawPath={pageContext.rawPath}
    >
      <SEO
        title={markdownRemark.frontmatter.title}
        image={image}
        description={markdownRemark.frontmatter.description}
        type="article"
      />
      <BlogPostDetails data={data} image={image} />
    </Layout>
  );
}

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "YYYY")
        author
        description
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
