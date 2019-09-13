import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const About = ({ pageContext }) => (
  <Layout locale={pageContext.locale} rawPath={pageContext.rawPath}>
    <SEO title="About" />
    <h1>{pageContext.i18n.title}</h1>
    <div dangerouslySetInnerHTML={{ __html:pageContext.i18n.tldr}}></div>
    <div dangerouslySetInnerHTML={{ __html:pageContext.i18n.indepth}}></div>
  </Layout>
);

export default About;
