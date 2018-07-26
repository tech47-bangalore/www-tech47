module.exports = {
  siteMetadata: {
    title: `Tech47`,
    siteUrl: `https://www.tech47.in`,
    description: `Tech47 - Building technology to power your startup`,
    instagram: '/social-media/instagram',
  },
  mapping: {
    'MarkdownRemark.frontmatter.author': 'AuthorsYaml'
  },
  plugins: [
    // Adding various source folders to the GraphQL layer.
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`
      }
    },
   {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images/`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: ``
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: ``,
        accessToken: ``
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          'gatsby-remark-smartypants',
          'gatsby-remark-prismjs',
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 800
            }
          },
        ],
      },
    },
    {
  resolve: 'gatsby-plugin-nprogress',
  options: {
    // Setting a color is optional.
    color: '#02a9f7',
    // Disable the loading spinner.
    showSpinner: false,
      },
    },
    'gatsby-transformer-json',
    'gatsby-transformer-yaml',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-react-next'
  ]
};
