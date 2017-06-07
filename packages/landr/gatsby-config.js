
module.exports = {
  plugins: [
    `gatsby-plugin-postcss-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `readme`,
        path: `/Users/gaudi/work/modules/landr/README.md`,
      },
    },
    {
      resolve: `gatsby-plugin-readme`,
      options: {
        headerDepth: 2
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `changelog`,
        path: `/Users/gaudi/work/modules/landr/CHANGELOG.md`,
      },
    },
    {
      resolve: `gatsby-plugin-changelog`,
      options: {
        headerDepth: 2
      },
    },
  ],
  linkPrefix: '/landr'
}
