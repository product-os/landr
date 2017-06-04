
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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `readme`,
        path: `/Users/gaudi/work/modules/landr/CHANGELOG.md`,
      },
    },
    `gatsby-transformer-readme`,
    `gatsby-transformer-changelog`
  ],
  linkPrefix: '/landr'
}
