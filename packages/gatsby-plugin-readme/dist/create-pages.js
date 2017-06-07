'use strict';

var path = require(`path`);
var slash = require(`slash`);
var fs = require(`fs`);

module.exports = function (_ref) {
  var graphql = _ref.graphql,
      boundActionCreators = _ref.boundActionCreators;
  var createPage = boundActionCreators.createPage;


  try {
    fs.statSync('src/pages/index.js');
  } catch (e) {
    // if there is no index build our template page
    var postTemplate = path.resolve(`${__dirname}/../templates/index.js`);

    createPage({
      // Each page is required to have a `path` as well
      // as a template component. The `context` is
      // optional but is often necessary so the template
      // can query data specific to each page.
      path: `/`,
      component: slash(postTemplate)
    });
  }
};