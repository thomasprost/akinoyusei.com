import { Link, graphql, StaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styles from "./header.module.scss";
import Navigation from "../Navigation/navigation";
import Img from "gatsby-image";

const Header = ({ data, locale, rawPath }) => {
  return (
    <header className={styles.header}>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 1120,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link
          style={{
            width: "150px",
            height: "63px",
          }}
          to="/"
        >
          <Img fluid={data.placeholderImage.childImageSharp.fluid} />
        </Link>

        <Navigation locale={locale} rawPath={rawPath} />
      </div>
    </header>
  );
};

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
          relativePath: { eq: "common/aki-no-logo-5.png" }
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
