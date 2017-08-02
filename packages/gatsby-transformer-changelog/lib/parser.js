const remark = require('remark');
const heading = require('mdast-util-heading-range');
const hastToHTML = require('hast-util-to-html');
const toHAST = require('mdast-util-to-hast');
const _ = require('lodash');

const getHTML = (ast) => {
  if (_.isArray(ast)) {
    ast = { type: 'root', children: ast }
  }
  return hastToHTML(toHAST(ast, { allowDangerousHTML: true }), {
    allowDangerousHTML: true,
  })
}

const changelogParser = (content, depth) => {
  const ast = remark.parse(content);
  let entries = []
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
      entries.push(
        {
          title: start.children[0].value,
          content: getHTML(nodes)
        }
      )
    });
  };
  return entries;
};


module.exports = changelogParser
