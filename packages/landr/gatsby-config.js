
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
    `gatsby-transformer-readme`
  ],
  linkPrefix: '/landr'
}
