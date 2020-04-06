import { Link, graphql, StaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styles from "./header.module.scss";
import Navigation from "../Navigation/navigation";
import Img from "gatsby-image";
const siteLocales = require("../../constants/locales");

class Header extends React.Component {
  state = {
    opened: false,
  };

  handleMenu = () => {
    this.setState({
      opened: !this.state.opened,
    });
  };

  render() {
    const { data, locale, rawPath } = this.props;
    return (
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link
            className={styles.logo}
            to={`/${!siteLocales[locale].default ? locale : ""}`}
          >
            <Img fluid={data.placeholderImage.childImageSharp.fluid} />
          </Link>

          <Navigation
            locale={locale}
            rawPath={rawPath}
            opened={this.state.opened}
          />
          <div
            className={`${styles.hbg} ${this.state.opened ? styles.on : ""}`}
            onClick={this.handleMenu}
            roll="button"
          >
            <i className={styles.hbgIcon}></i>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(
          relativePath: { eq: "common/aki-no-logo-2.png" }
        ) {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => <Header data={data} {...props} />}
  />
);
