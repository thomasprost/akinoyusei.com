import React from "react";
import { graphql } from "gatsby";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import SEO from "../components/seo";
import Layout from "../components/layout";
import styles from "./blog-list.module.scss";

class BlogIndex extends React.Component {
  state = {
    searchValue: "",
    blogs: this.props.data.allMarkdownRemark.edges,
    filteredBlogs: this.props.data.allMarkdownRemark.edges,
    categories: Array.from(
      this.props.data.categories.group.map(key => key.fieldValue)
    ),
    currentCategory: "",
  };

  handleChange = async event => {
    const { name, value } = event.target;

    await this.setState({ [name]: value });

    this.filterBlogs();
  };

  filterBlogs = () => {
    const { blogs, searchValue, currentCategory } = this.state;

    let filteredBlogs = blogs
      .filter(blog => {
        if (currentCategory !== "") {
          return blog.node.frontmatter.category.includes(currentCategory);
        } else {
          return blog;
        }
      })
      .filter(blog => {
        return blog.node.frontmatter.title
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });

    this.setState({ filteredBlogs });
  };

  updateCategory = category => {
    this.setState({
      currentCategory: category === this.state.currentCategory ? "" : category,
    });
  };

  render() {
    const { data, pageContext } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const {
      filteredBlogs,
      searchValue,
      categories,
      currentCategory,
    } = this.state;

    return (
      <Layout
        title={siteTitle}
        locale={pageContext.locale}
        rawPath={pageContext.rawPath}
      >
        <SEO title="Blog" />
        <h1>Blog / Tutorials</h1>
        <div className={styles.mainWrapper}>
          <div className={styles.blogs}>
            <div className={styles.search}>
              <label id="search-label" htmlFor="searchValue">
                Search:
              </label>{" "}
              <br />
              <input
                type="text"
                name="searchValue"
                aria-labelledby="search-label"
                className={styles.searchBox}
                id="searchValue"
                placeholder="Type to filter"
                value={searchValue}
                onChange={this.handleChange}
              />
              <ul className={styles.categories}>
                {categories.map(category => {
                  const active = currentCategory === category;
                  return (
                    <li
                      className={`${active ? styles.active : ""}`}
                      key={category}
                      role="presentation"
                      onClick={async () => {
                        await this.updateCategory(category);
                        await this.filterBlogs();
                      }}
                    >
                      {category}
                    </li>
                  );
                })}
              </ul>
            </div>
            {filteredBlogs.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug;
              const iconSource =
                node.frontmatter.icon !== null
                  ? node.frontmatter.icon.childImageSharp.fluid.src
                  : void 0;
              return (
                <AniLink
                  fade
                  className={`${styles.blogEl} no-anim`}
                  to={node.fields.slug}
                  key={node.fields.slug}
                >
                  <h2>{title}</h2>
                  <small>{node.frontmatter.date}</small>
                  <div className={styles.info}>
                    <p>{node.frontmatter.description}</p>
                    <div
                      className={styles.icon}
                      style={{ backgroundImage: `url(${iconSource})` }}
                    ></div>
                  </div>
                </AniLink>
              );
            })}
          </div>
          <div className={styles.side}>
            <h2>About this blog</h2>
            <div className={styles.sideBox}>
              Wait What ? Recipes on a developer's blog ? <br /> Between my
              clients' projects, I'll try to post tutorials about web
              development and personal projects. When I came to Japan a few
              years ago, I was struggling to find recipes in English / French
              adapted to Japan. Usually ingredients in these recipes are hard to
              find or too expensive here and if you are not fluent in Japanese,
              cookpad.comとか can be tricky to follow. Thereby the "Cooking In
              Japan" part of this blog.
              <br /> Hope it will be helpful.🍱
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!, $locale: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: {
        fields: { collection: { eq: "blog" }, locale: { eq: $locale } }
      }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            description
            category
            icon {
              childImageSharp {
                fluid {
                  src
                }
              }
            }
          }
        }
      }
    }
    categories: allMarkdownRemark(
      limit: 2000
      filter: {
        fields: { collection: { eq: "blog" }, locale: { eq: $locale } }
      }
    ) {
      group(field: frontmatter___category) {
        fieldValue
      }
    }
  }
`;
