import React from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import styles from "./work.module.scss";
import "./prism-material.css";

class Work extends React.Component {
  render() {
    const { data } = this.props;
    const imageSource =
      data.frontmatter.image !== null
        ? data.frontmatter.image.childImageSharp.fluid.src
        : void 0;

    return (
      <AniLink fade className={`${styles.work} no-anim`} to={data.fields.slug}>
        <img src={imageSource} alt={data.frontmatter.title} />
        <div className={styles.workCaption}>
          <h2>{data.frontmatter.title}</h2>
          <p>{data.frontmatter.category.join("、")}</p>
        </div>
      </AniLink>
    );
  }
}

export default Work;
