import React from "react"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

export const query = graphql`
  query BlogPost($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
        categories
      }
    }
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
  }
`

export default function blogPost({ data }) {
  const post = data.mdx

  return (
    <>
      <div>
        <h1 className="post-title">
          {post.frontmatter.title}
        </h1>
        <small>
          By &nbsp;
          <span>
            <Link to="/about">{data.site.siteMetadata.author.name}</Link>
          </span>
          &nbsp;in&nbsp;
          <span className="post-tag">
            {post.frontmatter.categories.map((categories, i) => (
              <Link
                to={`/category/${categories.toLowerCase()}`}
                key={categories}
                style={{ textDecoration: "none" }}
              >
                {i === 0 ? "" : ","} {categories}
              </Link>
            ))}
          </span>
          — {post.frontmatter.date}
        </small>
        <div className="post-body">
          <MDXRenderer>{post.body}</MDXRenderer>
        </div>
      </div>
    </>
  )
}
