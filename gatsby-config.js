/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Gatsby Mdx Starter Blog`,
    author: {
      name: `MC.Naveen`,
      summary: `Writing Codes.`,
    },
    description: `A starter mdx blog demonstrating what Gatsby can do.`,
    siteUrl: `https://gatsbystarterblogsource.gatsbyjs.io/`,
    social: {
      twitter: `the_mcnaveen`,
    },
  },
  flags: {
    DEV_SSR: false,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Mdx Starter Blog`,
        short_name: `Gatsby Mdx Starter Blog`,
        description: `Gatsby Mdx Starter Blog`,
        start_url: `/`,
        background_color: `#2c3e50`,
        theme_color: `#2c3e50`,
        display: `standalone`,
        icon: `static/favicon.ico`,
        icon_options: {
          purpose: `any maskable`,
        },
        legacy: true,
      },
    },
    {
      resolve: `gatsby-plugin-html-attributes`,
      options: {
        lang: `en`,
      },
    },
    {
      resolve: `gatsby-plugin-preconnect`,
      options: {
        domains: [
          `https://fonts.googleapis.com`,
          `https://fonts.gstatic.com`,
          `https://www.googletagmanager.com`,
          `https://analytics.google.com`,
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet-async`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        output: "./",
      },
    },

    {
      resolve: `gatsby-plugin-feed-mdx`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  category: edge.node.frontmatter.categories,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                })
              })
            },
            query: `
              {
                allMdx(
                  sort: { fields: [frontmatter___date], order: DESC }
                  filter: { frontmatter: { published: { eq: true } } }
                ) {
                  edges {
                    node {
                      excerpt
                      fields { slug }
                      frontmatter {
                        title
                        description
                        date
                        categories
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Gatsby Mdx Starter Blog RSS Feed",
            match: "^/posts/",
          },
        ],
      },
    },
  ],
}
