import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import styles from "./404.module.scss";

class NotFoundPage extends React.Component {
  state = {
    haiku: null,
  };

  getRandomHaiku = () => {
    const { pageContext } = this.props;
    const randomValue = Math.floor(
      Math.random() * Math.floor(pageContext.i18n.haiku.length)
    );

    return pageContext.i18n.haiku[randomValue];
  };

  showText = (target, message, index, interval) => {
    if (index < message.length) {
      const textnode = document.createTextNode(message[index++]);
      document.querySelector(target).appendChild(textnode);
      setTimeout(() => {
        this.showText(target, message, index, interval);
      }, interval);
    }
  };

  constructor(props) {
    super(props);
    this.state = { haiku: this.getRandomHaiku() };
  }

  componentDidMount = () => {
    setTimeout(this.startAnimation, 1500);
  };

  startAnimation() {
    const scene = document.querySelector(".scene"),
      circle = document.querySelector(".blackCircle");

    circle.addEventListener("animationend", () => {
      scene.classList.add("animatescene");
    });
    circle.classList.add("show");
  }

  render() {
    const { pageContext } = this.props;
    const haiku = this.state.haiku;
    return (
      <Layout locale={pageContext.locale} rawPath={pageContext.rawPath}>
        <SEO title="Page not found" />

        {/* <h3>{pageContext.i18n.description}</h3>
        <p id="msg">{haiku.jp}</p>
        <p>{haiku[pageContext.locale]}</p>
        <Link to="/">Go back to the homepage</Link> */}
        <div className={`${styles.scene} scene`}>
          <div className={`${styles.blackCircle} blackCircle`}>
            <div className={`${styles.title} title404`}>404</div>
          </div>
          <h1>{pageContext.i18n.title}</h1>
          <h2
            dangerouslySetInnerHTML={{ __html: pageContext.i18n.description }}
          ></h2>
          <p className={styles.typed} id="msg">
            {haiku.jp}
          </p>
          <p className={styles.typed}>{haiku[pageContext.locale]}</p>
          <div className={styles.links}>
            <div className={styles.lwrap}>
              <Link to="/">Homepage</Link>
            </div>
            <div className={styles.lwrap}>
              <Link to="/works">Check my works</Link>
            </div>
            <div className={styles.lwrap}>
              <Link to="/contact">Contact Me</Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default NotFoundPage;
