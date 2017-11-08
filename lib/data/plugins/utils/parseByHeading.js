const remark = require('remark')
const heading = require('mdast-util-heading-range')
const toString = require('mdast-util-to-string')

const parser = (content, depth) => {
  const ast = remark.parse(content)
  let entries = []
  let isEnd = true

  while (isEnd) {
    heading(
      ast,
      (string, node) => {
        return node.depth === depth
      },
      (start, nodes, end) => {
        const range = [start, ...nodes]
        ast.children = ast.children.slice(range.length, ast.children.length)
        isEnd = end
        entries.push({
          title: toString(start),
          markdown: remark.stringify({
            type: 'root',
            children: nodes
          })
        })
      }
    )
  }
  return entries
}

module.exports = parser
