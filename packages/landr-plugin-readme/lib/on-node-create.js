const crypto = require(`crypto`);
const readmeParser = require('readme-parser');
const TYPE = require('./type');

module.exports = async function onNodeCreate({
  node,
  getNode,
  loadNodeContent,
  boundActionCreators
}) {
  const { createNode, createParentChildLink } = boundActionCreators;
  // We are only concerned with readmes

  if (node.name !== 'README') {
    return
    // console.log(JSON.stringify(node, null, 2));
  }

  // We only care about markdown content
  if (node.internal.mediaType !== `text/x-markdown`) {
    return;
  }

  const content = await loadNodeContent(node);
  const readmeData = readmeParser(content);
  const data = {
    ...TYPE,
    ...readmeData
  };

  const objStr = JSON.stringify(data);

  const contentDigest = crypto.createHash(`md5`).update(objStr).digest(`hex`);

  const readmeNode = {
    ...data,
    id: `${node.id} >>> readme`,
    children: [],
    parent: node.id,
    internal: {
      contentDigest,
      type: `Readme`,
      mediaType: 'text/x-markdown',
      content: objStr
    }
  };

  // Add path to the markdown file path
  if (node.internal.type === `File`) {
    readmeNode.fileAbsolutePath = node.absolutePath;
  }
  createParentChildLink({ parent: node, child: readmeNode });
  createNode(readmeNode);
};
