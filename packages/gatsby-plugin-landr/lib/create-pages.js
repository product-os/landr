const path = require('path');
const Promise = require('bluebird');
const slash = require('slash');
const fs = Promise.promisifyAll(require('fs'));
const _ = require('lodash');

const getCorrectPath = repoDir => {
  return file => {
    let p = path.resolve(`${__dirname}/../www/${file}`);

    if (fs.existsSync(`${repoDir}/www/${file}`)) {
      prom = path.resolve(`${repoDir}/www/${file}`);
    }
    return p;
  };
};

const createPages = (
  { graphql, boundActionCreators, store },
  pluginOptions
) => {
  const { createPage, createNodeField } = boundActionCreators;

  const standardPages = fs
    .readdirAsync(`${__dirname}/../www/pages`)
    .then(files => {
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
          component: slash(pagePath),
          context: {
            title: _.startCase(path.parse(file).name)
          }
        });
      });
    });

  const docsPages = graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              id
              fileAbsolutePath
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )
    .then(result => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }

      const index = result.data.allMarkdownRemark.edges.find(edge => {
        return edge.node.fields && edge.node.fields.slug === '/docs/';
      });
      if (index) {
        return;
      }

      const readme = result.data.allMarkdownRemark.edges.find(edge => {
        return _.includes(edge.node.fileAbsolutePath, 'README');
      });

      const node = store.getState().nodes[readme.node.id];
      if (node) {
        createNodeField({ node, name: `slug`, value: '/docs/' });
      }
    })
    .then(() =>
      graphql(
        // TODO filter by slug
        `
    {
      allMarkdownRemark {
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
      )
    )
    .then(result => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }

      const getTitle = node => {
        try {
          return node.frontmatter.title;
        } catch (e) {
          return _.startCase(path.parse(node.fileAbsolutePath).name);
        }
      };

      // Create docs pages.
      result.data.allMarkdownRemark.edges.forEach(edge => {
        if (
          !edge.node.fields ||
          edge.node.fields.slug.slice(0, 6) !== '/docs/'
        ) {
          return;
        }
        createPage({
          path: edge.node.fields.slug, // required
          layout: 'docs',
          component: getCorrectPath(pluginOptions.repoDir)(`templates/docs.js`),
          context: {
            title: getTitle(edge.node),
            slug: edge.node.fields.slug
          }
        });
      });
    })
    .catch(e => console.warn(e));

  return Promise.all([standardPages, docsPages]);
};

module.exports = createPages;
