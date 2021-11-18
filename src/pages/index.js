import React from "react"
import { graphql, Link } from "gatsby"
import { Helmet, HelmetProvider } from "react-helmet-async"

export default function Home({ data }) {
  const posts = data.allMdx.edges
  const SiteName = data.site.siteMetadata.title

  console.log(data.site.siteMetadata.description)
  return (
    <>
      <HelmetProvider>
        <Helmet defer="false">
          <title>{data.site.siteMetadata.title}</title>
          <meta name="description" content="Gatsby Mdx Starter Blog"></meta>
        </Helmet>
      </HelmetProvider>
      <div className="homepage-container">
        <h2>{SiteName}</h2>
        <Link
          to="https://github.com/mcnaveen/gatsby-mdx-starter-blog"
          style={{ textDecoration: "none" }}
          aria-label="Source Code"
        >
          <b>✨ Source code ✨</b>
        </Link>

        <div className="posts">
          {posts.map(post => {
            return (
              <div key={post.node.id}>
                <h3 className="post-title-homepage" aria-label={`${post.node.frontmatter.title}`}>
                  <Link to={post.node.fields.slug}>
                    {post.node.frontmatter.title}
                  </Link>
                </h3>
                <span style={{ fontSize: "13px" }}>
                  <span>
                    In{" "}
                    <span className="post-tag">
                      {post.node.frontmatter.categories.map((categories, i) => (
                        <Link
                          to={`/category/${categories.toLowerCase()}`}
                          key={categories}
                          style={{ textDecoration: "none" }}
                        >
                          {i === 0 ? "" : ", "} {categories}
                        </Link>
                      ))}
                    </span>
                  </span>{" "}
                  — {post.node.frontmatter.date}{" "}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export const BlogIndex = graphql`
  query BlogIndex {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            categories
          }
          fields {
            slug
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
