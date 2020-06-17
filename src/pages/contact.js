import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import styles from "./contact.module.scss";

const Contact = ({ pageContext }) => (
  <Layout locale={pageContext.locale} rawPath={pageContext.rawPath}>
    <SEO title="Contact" />
    <h1>{pageContext.i18n.title}</h1>
    <div className={styles.contactWrapper}>
      <div className={styles.side}>
        <div dangerouslySetInnerHTML={{ __html: pageContext.i18n.tldr }}></div>
        <div
          dangerouslySetInnerHTML={{ __html: pageContext.i18n.history }}
        ></div>
      </div>
      <div className={styles.side}>
        <h2>{pageContext.i18n.contacttitle}</h2>
        <form method="post" netlify-honeypot="bot-field" data-netlify="true">
          <input type="hidden" name="bot-field" />
          <div className="form-field col x-50">
            <input
              id="name"
              className="input-text js-input"
              type="text"
              required
            />
            <label className="label" htmlFor="name">
              {pageContext.i18n.name}
            </label>
          </div>
          <div className="form-field col x-50">
            <input
              id="email"
              className="input-text js-input"
              type="email"
              required
            />
            <label className="label" htmlFor="email">
              E-mail
            </label>
          </div>
          <div className="form-field col x-100">
            <input
              id="message"
              className="input-text js-input"
              type="text"
              required
            />
            <label className="label" htmlFor="message">
              Message
            </label>
          </div>
          <div className="form-field col x-100 align-center">
            <input
              className="submit-btn"
              type="submit"
              value={pageContext.i18n.submit}
            />
          </div>
        </form>
      </div>
    </div>
  </Layout>
);

export default Contact;
