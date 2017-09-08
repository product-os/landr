const crypto = require(`crypto`);
const readmeParser = require('./parser');
const _ = require('lodash');

module.exports = async function onNodeCreate({
  node,
  getNode,
  loadNodeContent,
  boundActionCreators
}) {
  const { createNode, createParentChildLink } = boundActionCreators;

  // We only care about markdown content
  if (node.name !== 'README') {
    return;
  }

  // We only care about markdown content
  if (node.internal.mediaType !== `text/x-markdown`) {
    return;
  }

  const content = await loadNodeContent(node);
  const data = readmeParser(content);

  // console.log(content)

  const objStr = JSON.stringify(data);

  const contentDigest = crypto.createHash(`md5`).update(objStr).digest(`hex`);

  const readmeNode = {
    ...data,
    id: `${node.id} >>> readme`,
    children: [],
    parent: node.id,
    content: content,
    internal: {
      contentDigest,
      type: `Readme`,
      content: objStr
    }
  };

  // Add path to the markdown file path
  if (node.internal.type === `File`) {
    readmeNode.fileAbsolutePath = node.absolutePath;
  }
  createParentChildLink({ parent: node, child: readmeNode });
  createNode(readmeNode);

  _.each(data.sections, j => {
    const objStr = JSON.stringify(data);

    const contentDigest = crypto.createHash(`md5`).update(objStr).digest(`hex`);
    const sectionNode = {
      title: j.title,
      id: `${readmeNode.id} >>> ${j.title}`,
      children: [],
      parent: readmeNode.id,
      internal: {
        contentDigest,
        mediaType: 'text/x-markdown',
        type: `readmeSection`,
        content: j.content
      }
    };

    createNode(sectionNode);
    createParentChildLink({ parent: readmeNode, child: sectionNode });
  });
};
