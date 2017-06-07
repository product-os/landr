const path = require(`path`)
const slash = require(`slash`)
const fs = require(`fs`)

module.exports = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  try {
    fs.statSync('src/pages/index.js')
  } catch(e) {
    // if there is no index build our template page
    const postTemplate = path.resolve(`${__dirname}/../templates/index.js`)

    createPage({
      // Each page is required to have a `path` as well
      // as a template component. The `context` is
      // optional but is often necessary so the template
      // can query data specific to each page.
      path: `/`,
      component: slash(postTemplate),
    })
  }
}
