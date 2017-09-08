const Remark = require('remark');
const heading = require('mdast-util-heading-range');
const _ = require('lodash');
const select = require('unist-util-select');
const toString = require('mdast-util-to-string');

const remark = new Remark().data(`settings`, {
  commonmark: true,
  footnotes: true,
  pedantic: true
});

const sections = (ast, depth) => {
  let readmeSections = [];
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
        readmeSections.push({
          title: toString(start),
          content:
            remark.stringify({
              type: 'root',
              children: nodes
            }) + '\n'
        });
      }
    );
  }
  return readmeSections;
};

const readmeParser = content => {
  const ast = remark.parse(content);
  return {
    images: select(ast, 'image'),
    sections: sections(ast, 2)
  };
};

module.exports = readmeParser;
