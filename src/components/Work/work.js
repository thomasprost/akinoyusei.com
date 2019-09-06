import React from "react";
import { Link } from "gatsby";
import styles from "./work.module.scss";

class Work extends React.Component {
  render() {
    const { data } = this.props;
    const imageSource =
      data.frontmatter.image !== null
        ? data.frontmatter.image.childImageSharp.fluid.src
        : void 0;

    return (
      <Link className={styles.work} to={data.fields.slug}>
        <img src={imageSource} alt={data.frontmatter.title} />
        <div className={styles.workCaption}>
          <h2>{data.frontmatter.title}</h2>
          <p>{data.frontmatter.category.join("、")}</p>
        </div>
      </Link>
    );
  }
}

export default Work;
