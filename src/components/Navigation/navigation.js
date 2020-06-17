import AniLink from "gatsby-plugin-transition-link/AniLink";
import React from "react";
import styles from "./navigation.module.scss";
import ThemeContext from "../../context/ThemeContext";
import { Link } from "gatsby";
const siteLocales = require("../../constants/locales");

class Navigation extends React.Component {
  render() {
    const { locale, rawPath = "/", opened = false } = this.props;

    const basePath = locale === "en" ? "" : `/${locale}`;
    const languageMenu = Object.keys(siteLocales).map(lang => {
      return (
        <li
          className={
            locale === siteLocales[lang].locale ? styles.selectedLanguage : ""
          }
          key={lang}
        >
          <AniLink
            fade
            to={
              !siteLocales[lang].default
                ? `/${siteLocales[lang].locale}${rawPath}`
                : rawPath
            }
          >
            {siteLocales[lang].locale}
          </AniLink>
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
                <Link to={`${basePath}/about`}>
                  {siteLocales[locale].navigation.about}
                </Link>
              </li>
              <li key="works">
                <AniLink fade to={`${basePath}/works`}>
                  {siteLocales[locale].navigation.works}
                </AniLink>
              </li>
              <li key="blog">
                <AniLink fade to={`${basePath}/blog`}>
                  Blog
                </AniLink>
              </li>
              <li key="contact">
                <AniLink fade to={`${basePath}/contact`}>
                  Contact
                </AniLink>
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
