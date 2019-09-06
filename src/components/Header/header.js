import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styles from "./header.module.scss";
import Navigation from "../Navigation/navigation";

const Header = ({ siteTitle, locale, rawPath }) => {
  // console.log(siteTitle)

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
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {/* {siteTitle !== "" ? siteTitle : "Site"} */}
            Test
          </Link>
        </h1>
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

export default Header;
