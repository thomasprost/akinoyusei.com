import { Link } from "gatsby";
import React from "react";
import styles from "./navigation.module.scss";
import ThemeContext from "../../context/ThemeContext";
const siteLocales = require("../../constants/locales");

class Navigation extends React.Component {
  render() {
    const { locale, rawPath = "", opened = false } = this.props;
    const basePath = locale === "en" ? "" : locale;
    const languageMenu = Object.keys(siteLocales).map(lang => {
      return (
        <li
          className={
            locale === siteLocales[lang].locale ? styles.selectedLanguage : ""
          }
          key={lang}
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
          <nav
            className={styles.nav}
            style={opened ? { transform: "translateX(0)" } : {}}
          >
            <ul>
              {languageMenu}
              <li key="about" className={styles.hasSeparator}>
                <Link to={`${basePath}/about`}>About</Link>
              </li>
              <li key="works">
                <Link to={`${basePath}/works`}>Works</Link>
              </li>
              <li key="blog">
                <Link to={`${basePath}/blog`}>Blog</Link>
              </li>
              <li key="contact">
                <Link to={`${basePath}/contact`}>Contact</Link>
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
