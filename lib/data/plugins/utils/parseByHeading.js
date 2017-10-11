const remark = require('remark');
const heading = require('mdast-util-heading-range');
const toString = require('mdast-util-to-string');
const _ = require('lodash');

const getHTML = ast => {
  if (_.isArray(ast)) {
    ast = { type: 'root', children: ast };
  }
  return hastToHTML(toHAST(ast, { allowDangerousHTML: true }), {
    allowDangerousHTML: true
  });
};

const parser = (content, depth) => {
  const ast = remark.parse(content);
  let entries = [];
  let isEnd = true;

  while (isEnd) {
    heading(
      ast,
      (string, node) => {
        return node.depth === depth;
      },
      (start, nodes, end, scope) => {
        const range = [start, ...nodes];
        ast.children = ast.children.slice(range.length, ast.children.length);
        isEnd = end;
        entries.push({
          title: toString(start),
          html: remark.stringify({
            type: 'root',
            children: nodes
          })
        });
      }
    );
  }
  return entries;
};

module.exports = parser;
