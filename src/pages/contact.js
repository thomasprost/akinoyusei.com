import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const Contact = ({ pageContext }) => (
  <Layout locale={pageContext.locale} rawPath={pageContext.rawPath}>
    <SEO title="Contact" />
    <h1>{pageContext.i18n.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: pageContext.i18n.tldr }}></div>
    <div dangerouslySetInnerHTML={{ __html: pageContext.i18n.history }}></div>
    <h3>{pageContext.i18n.contacttitle}</h3>
    <form method="post" netlify-honeypot="bot-field" data-netlify="true">
      <input type="hidden" name="bot-field" />
      <label>
        Name
        <input type="text" name="name" id="name" />
      </label>
      <label>
        Email
        <input type="email" name="email" id="email" />
      </label>
      <label>
        Subject
        <input type="text" name="subject" id="subject" />
      </label>
      <label>
        Message
        <textarea name="message" id="message" rows="5" />
      </label>
      <button type="submit">Send</button>
      <input type="reset" value="Clear" />
    </form>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default Contact;
