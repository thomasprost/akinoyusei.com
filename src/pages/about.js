import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const About = ({ pageContext }) => (
  <Layout locale={pageContext.locale} rawPath={pageContext.rawPath}>
    <SEO title="About" />
    <h1>{pageContext.i18n.title}</h1>
    <p>{pageContext.i18n.description}</p>
    <p>
      You can go back to the{" "}
      <Link to="/" data-hover="homepage">
        homepage
      </Link>
    </p>
  </Layout>
);

export default About;
