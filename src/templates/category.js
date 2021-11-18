import React from "react"
import { graphql } from "gatsby"

export default function categoryLayout({ data, pageContext }) {
    
  return (
    <>
      <h3
        className="latest-from"
        style={{ marginLeft: "0px", color: "rgba(0, 0, 0, 0.8)" }}
      >
        There is <b>{data.allMdx.totalCount}</b> posts in{" "}
        <b style={{ textTransform: "Uppercase" }}>{pageContext.category}</b>{" "}
        category
      </h3>
      <hr />
      <ul>
        {data.allMdx.nodes.map(post => (
          <li key={post.id} className="title is-6">
            <a href={post.fields.slug} title={post.frontmatter.title}>
              {post.frontmatter.title}
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}

export const pageQuery = graphql`
  query CategoryPageQuery($category: String) {
    allMdx(
      filter: {
        frontmatter: { categories: { eq: $category }, published: { eq: true } }
      }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        id
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
      totalCount
    }
  }
`
