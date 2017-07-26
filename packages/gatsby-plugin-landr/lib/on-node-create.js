const path = require('path');

module.exports = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators
  let slug
  if (
    node.internal.type === `MarkdownRemark`
  ) {
    const fileNode = getNode(node.parent)
    if (fileNode.internal.type !== 'File') {
      return;
    }
    // console.log(fileNode)
    const parsedFilePath = path.parse(fileNode.relativePath)
    if (parsedFilePath.name !== `index` && parsedFilePath.dir !== ``) {
      slug = `/docs/${parsedFilePath.dir}/${parsedFilePath.name}/`
    } else if (parsedFilePath.dir === ``) {
      slug = `/docs/${parsedFilePath.name}/`
    } else {
      slug = `/docs/${parsedFilePath.dir}/`
    }

    // Add slug as a field on the node.
    createNodeField({ node, name: `slug`, value: slug })
  }
}
