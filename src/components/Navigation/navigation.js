import { Link } from "gatsby";
import React from "react";
import styles from "./navigation.module.scss";
import ThemeContext from "../../context/ThemeContext";
const siteLocales = require("../../constants/locales");

class Navigation extends React.Component {
  render() {
    const { locale, rawPath = "" } = this.props;
    const basePath = locale === "en" ? "" : locale;
    const languageMenu = Object.keys(siteLocales).map(lang => {
      return (
        <li
          className={
            locale === siteLocales[lang].locale ? styles.selectedLanguage : ""
          }
        >
          <Link
            to={
              !siteLocales[lang].default
                ? siteLocales[lang].locale + rawPath
                : rawPath
            }
          >
            {siteLocales[lang].locale}
          </Link>
        </li>
      );
    });

    return (
      <ThemeContext.Consumer>
        {theme => (
          <nav className={styles.nav}>
            <ul>
              {languageMenu}
              <li>
                <Link to={`${basePath}/about`}>About</Link>
              </li>
              <li>
                <Link to={`${basePath}/works`}>Works</Link>
              </li>
              <li>
                <Link to={`${basePath}/blog`}>Blog</Link>
              </li>
              <button
                className={styles.darkSwitcher}
                onClick={theme.toggleDark}
              >
                {theme.dark ? <span>☀</span> : <span>☾</span>}
              </button>
            </ul>
          </nav>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Navigation;
