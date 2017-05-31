module.exports = {
  plugins: [
    `gatsby-plugin-postcss-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/README.md`,
      },
    },
    `gatsby-transformer-readme`
  ],
  linkPrefix: '/landr'
}
