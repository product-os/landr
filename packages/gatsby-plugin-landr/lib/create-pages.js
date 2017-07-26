const path = require('path');
const Promise = require('bluebird');
const slash = require('slash');
const fs = Promise.promisifyAll(require('fs'));

const getCorrectPath = (repoDir) => {
    return (file) => {
      let p = path.resolve(`${__dirname}/../www/${file}`);

      if (fs.existsSync(`${repoDir}/www/${file}`)) {
        prom = path.resolve(`${repoDir}/www/${file}`);
      }
      return p;
    }
}

const createPages = ({ graphql, boundActionCreators }, pluginOptions) => {
  const { createPage } = boundActionCreators;

  const standardPages = fs.readdirAsync(`${__dirname}/../www/pages`).then(files => {
    return files.forEach(file => {
      const pagePath = getCorrectPath(pluginOptions.repoDir)(`pages/${file}`);

      // todo this doesn't take child folders into account.
      let routeName = path.parse(file).name;
      if (file === 'index.js') {
        routeName = '/';
      }

      createPage({
        path: routeName,
        layout: 'index',
        component: slash(pagePath)
      });
    });
  });

  const docsPages = graphql(
  `
    {
      allMarkdownRemark(
        limit: 1000
        filter: {
          fileAbsolutePath: { regex: "/docs/" }
        }
      ) {
        edges {
          node {
            fileAbsolutePath
            fields {
              slug
            }
          }
        }
      }
    }
  `
  ).then(result => {
    if (result.errors) {
      console.log(result.errors)
    }

    const getRouteName = (fileAbsolutePath) => {
      const pathSplit = fileAbsolutePath.split(path.sep);
      const docsIndex = pathSplit.findIndex((p) => p === 'docs');
      return pathSplit.splice(docsIndex).join('/');
    }

    // Create blog posts pages.
    result.data.allMarkdownRemark.edges.forEach(edge => {
      createPage({
        path: edge.node.fields.slug, // required
        component: getCorrectPath(pluginOptions.repoDir)(`templates/docs.js`),
        context: {
          slug: edge.node.fields.slug,
        },
      })
    })
  });

  return Promise.all([standardPages]);
};

module.exports = createPages;
