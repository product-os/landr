const remark = require('remark');
const heading = require('mdast-util-heading-range');
const hastToHTML = require('hast-util-to-html');
const toHAST = require('mdast-util-to-hast');
const _ = require('lodash');
const select = require('unist-util-select');
const TYPE = require('./type');

const sections = (ast, depth) => {
  let readmeSections = []
  let cachedLength

  while(ast.children.length !== cachedLength) {
    cachedLength = ast.children.length;
    heading(ast, (string, node) => {
      return node.depth === depth;
    }, (start, nodes, end, scope) => {
      const range = [
        start,
        ...nodes
      ]
      ast.children = ast.children.slice(range.length, ast.children.length);
      readmeSections.push({
        title: start.children[0].value,
        content: getHTML(nodes)
      })
    });
  };
  return readmeSections;
};

const getHTML = (ast) => {
  if (_.isArray(ast)) {
    ast = { type: 'root', children: ast }
  }
  return hastToHTML(toHAST(ast, { allowDangerousHTML: true }), {
    allowDangerousHTML: true,
  })
}

const prepNodes = () => {
  return Promise.all(
    pluginOptions.plugins.map(plugin => {
      const requiredPlugin = require(plugin.resolve)
      if (_.isFunction(requiredPlugin)) {
        return requiredPlugin(
          {
            markdownAST,
            markdownNode,
            getNode,
            files,
            pathPrefix,
          },
          plugin.pluginOptions
        )
      } else {
        return Promise.resolve()
      }
    })
  ).then(() => {
    resolve(markdownAST)
  })
}

const readmeParser = (content) => {
  const ast = remark.parse(content);
  const rdMe = {
    sections: sections(ast, 2),
    images: select(ast, 'image')
  }

  return rdMe;
}

module.exports = readmeParser;
