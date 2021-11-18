const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)
const slugify = require(`slugify`)

exports.createPages = async ({ graphql, actions }) => {
  
  const { createPage } = actions
  const GetPosts = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (GetPosts.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  const GetCategories = await graphql(`
    query Categories {
      rawcategories: allMdx {
        group(field: frontmatter___categories) {
          fieldValue
        }
      }
    }
  `)

  // Create blog post pages.
  const posts = GetPosts.data.allMdx.edges
  const postTemplate = path.resolve(`./src/templates/post.js`)

  posts.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: postTemplate,
      context: { id: node.id },
    })
  })

  const categories = GetCategories.data.rawcategories.group
  const categoryTemplate = path.resolve(`./src/templates/category.js`)

  categories.forEach(({ fieldValue }) =>
    createPage({
      path: `category/${slugify(fieldValue, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true,
        strict: false,
      })}`,
      component: categoryTemplate,
      context: {
        category: fieldValue,
      },
    })
  )
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}