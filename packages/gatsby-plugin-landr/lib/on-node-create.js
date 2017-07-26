const path = require('path');

module.exports = ({ node, boundActionCreators, getNode }) => {
  // Create a slug field for every markdown page created.
  const { createNodeField } = boundActionCreators;
  let slug;
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    if (fileNode.internal.type !== 'File') {
      return;
    }
    const parsedFilePath = path.parse(fileNode.relativePath);
    if (!parsedFilePath.name) {
      return;
    }
    const checkForIndex = fileName => {
      if (fileName === 'index') {
        return '';
      } else {
        return fileName;
      }
    };

    const slug = `/docs/${parsedFilePath.dir}/${checkForIndex(
      parsedFilePath.name
    )}`.replace('//', '/');

    // Add slug as a field on the node.
    createNodeField({ node, name: `slug`, value: slug.replace() });
  }
};
