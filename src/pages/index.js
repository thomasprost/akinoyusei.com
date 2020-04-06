import React from "react";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";
const config = require("../constants/siteConfig");

class IndexPage extends React.Component {
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

  constructor(props) {
    super(props);
    this.state = { city: config.topCity, currentCity: "" };
  }

  componentDidMount = () => {
    this.updateCity();
  };

  render() {
    const { pageContext } = this.props;

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
        <div
          className="top-present"
          onMouseEnter={this.updateCity}
          roll="presentation"
        >
          <p>こんにちは、</p>
          <div
            dangerouslySetInnerHTML={{ __html: pageContext.i18n.main }}
          ></div>
          <p>
            {pageContext.i18n.living} {this.state.currentCity}。
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
