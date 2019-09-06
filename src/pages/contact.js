import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const Contact = ({ pageContext }) => (
  <Layout locale={pageContext.locale} rawPath={pageContext.rawPath}>
    <SEO title="Contact" />
    <h1>{pageContext.i18n.title}</h1>
    <p>{pageContext.i18n.description}</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default Contact;
