import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styles from "./header.module.scss";
import Navigation from "../Navigation/navigation";

const Header = ({ siteTitle }) => {
  // console.log(siteTitle)

  return (
    <header className={styles.header}>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
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
            {siteTitle !== "" ? siteTitle : "Site"}
          </Link>
        </h1>
        <Navigation />
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
