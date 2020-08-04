import React from "react";
import styles from "./blogPostDetails.module.scss";

class BlogPostDetails extends React.Component {
  render() {
    const { markdownRemark } = this.props.data;
    const imageSource = this.props.image;

    return (
      <div className={styles.postWrapper}>
        <div className={styles.postTop}>
          <div className={styles.postImage}>
            <img src={imageSource} alt={markdownRemark.frontmatter.title} />
          </div>
          <div className={styles.postFront}>
            <h1>{markdownRemark.frontmatter.title}</h1>
            <p>Posted on {markdownRemark.frontmatter.date}</p>
            <p className={"categories"}>
              {markdownRemark.frontmatter.category.join(" / s")}
            </p>
            <p className={"tags"}>
              {markdownRemark.frontmatter.tags.join(" / ")}
            </p>
          </div>
        </div>
        <div className={styles.postContent}>
          {markdownRemark.frontmatter.ingredients && (
            <div className={styles.postIngredients}>
              <h3>Ingredients</h3>
              <ul>
                {markdownRemark.frontmatter.ingredients.map(ingredient => {
                  return <li key={ingredient}>{ingredient}</li>;
                })}
              </ul>
            </div>
          )}
          <div
            className={styles.postHtml}
            dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
          />
        </div>
      </div>
    );
  }
}

export default BlogPostDetails;
