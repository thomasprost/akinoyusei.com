import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

class NotFoundPage extends React.Component {
  getRandomHaiku() {
    const { pageContext } = this.props;
    const randomValue = Math.floor(
      Math.random() * Math.floor(pageContext.i18n.haiku.length)
    );

    return pageContext.i18n.haiku[randomValue];
  }

  render() {
    const { pageContext } = this.props;
    const haiku = this.getRandomHaiku();
    return (
      <Layout locale={pageContext.locale} rawPath={pageContext.rawPath}>
        <SEO title="About" />
        <h2>{pageContext.i18n.title}</h2>
        <p>{pageContext.i18n.description}</p>
        <p>{haiku.jp}</p>
        <p>{haiku[pageContext.locale]}</p>
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    );
  }
}

export default NotFoundPage;
