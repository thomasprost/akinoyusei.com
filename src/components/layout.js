/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import ThemeContext from "../context/ThemeContext";
// import { useStaticQuery, graphql } from "gatsby"

import Header from "./Header/header";
import "./normalize.scss";
import "./layout.scss";

class Layout extends React.Component {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `);
  render() {
    const {
      title,
      children,
      locale = "en",
      rawPath,
      pageName = "",
    } = this.props;

    return (
      <ThemeContext.Consumer>
        {theme => {
          return (
            <div
              className={`wrapper ${theme.dark ? "dark" : "light"} ${pageName}`}
            >
              <Header siteTitle={title} locale={locale} rawPath={rawPath} />
              <div
                style={{
                  margin: `0 auto`,
                  maxWidth: 1120,
                  padding: `0px 1.0875rem 1.45rem`,
                  paddingTop: 0,
                }}
              >
                <main>{children}</main>
                {/* <footer>
                  © {new Date().getFullYear()}, Built with
                  {` `}
                  <a href="https://www.gatsbyjs.org">Gatsby</a>
                </footer> */}
              </div>
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
