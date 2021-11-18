import React from "react"
import { graphql, Link } from "gatsby"

export default function Home({ data }) {
  const posts = data.allMdx.edges
  const SiteName = data.site.siteMetadata.title

  console.log(data.site.siteMetadata.description)
  return (
    <>
      <div className="homepage-container">
        <h2>{SiteName}</h2>
        <Link to="https://github.com/mcnaveen/gatsby-mdx-starter-blog" style={{ textDecoration: 'none' }}><b>✨ Source code ✨</b></Link>

        <div className="posts">
          {posts.map(post => {
            return (
              <div key={post.node.id}>
                <h4 className="post-title-homepage">
                  <Link to={post.node.fields.slug}>
                    {post.node.frontmatter.title}
                  </Link>
                </h4>
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
