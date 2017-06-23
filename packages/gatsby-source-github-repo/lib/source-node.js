const GitHubApi = require('github');
const crypto = require('crypto');

var github = new GitHubApi()

module.exports = async ({ boundActionCreators }, { owner, repo }) => {
  const { createNode } = boundActionCreators;

  const { data } = await github.repos.get({ owner, repo });

  const contentDigest = crypto.createHash('md5').update(JSON.stringify(data)).digest(`hex`);

  console.log({data})
  const node = {
    ...data,
    id: `${data.id}`,
    parent: `__SOURCE__`,
    children: [],
    internal: {
      type: `Repo`,
      mediaType: `text/x-gh`,
      contentDigest
    }
  }

  createNode(node);

  return
}
