import React from "react";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";
import AniLink from "gatsby-plugin-transition-link/AniLink";
const config = require("../constants/siteConfig");

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { city: config.topCity, currentCity: config.topCity[0] };
  }

  getRandomCity = () => {
    const randomValue = Math.floor(
      Math.random() * Math.floor(this.state.city.length)
    );

    return this.state.city[randomValue];
  };

  updateCity = () => {
    this.setState({
      currentCity: this.getRandomCity(),
    });
  };

  componentDidMount = () => {
    setInterval(
      function() {
        this.setState({
          currentCity: this.getRandomCity(),
        });
      }.bind(this),
      6000
    );
  };

  render() {
    const { pageContext } = this.props;
    const locale = pageContext.locale;
    const basePath = locale === "en" ? "" : locale;

    return (
      <Layout title="Home" pageName="home" locale={pageContext.locale}>
        <Helmet
          bodyAttributes={{
            class: "home",
          }}
          htmlAttributes={{
            class: "home",
          }}
        ></Helmet>
        <SEO title="Home" />
        <div className="top-present" roll="presentation">
          <p>こんにちは、</p>
          <div
            dangerouslySetInnerHTML={{ __html: pageContext.i18n.main }}
          ></div>
          <p>
            {pageContext.i18n.living} {this.state.currentCity}。
          </p>
        </div>
        <div className="top-present" roll="presentation">
          <p>{pageContext.i18n.specialize}</p>
          <h2
            className="spe"
            dangerouslySetInnerHTML={{ __html: pageContext.i18n.tech }}
          ></h2>
        </div>
        <div className="top-present long" roll="presentation">
          <p>
            {pageContext.i18n.check}
            <AniLink fade to={`${basePath}/works`}>
              portfolio
            </AniLink>
            ,{" "}
            <AniLink fade to={`${basePath}/about`}>
              {pageContext.i18n.description}
            </AniLink>
            {pageContext.i18n.or}
            <AniLink fade to={`${basePath}/contact`}>
              {pageContext.i18n.contact}
            </AniLink>{" "}
            {pageContext.i18n.directly}
          </p>
        </div>
      </Layout>
    );
  }
}

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
