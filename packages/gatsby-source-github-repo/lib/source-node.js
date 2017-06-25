const GitHubApi = require('github');
const crypto = require('crypto');
const _ = require('lodash')

var github = new GitHubApi()

module.exports = async ({ boundActionCreators, store }, { owner, repo }) => {
  const { createNode, setPluginStatus, touchNode } = boundActionCreators;

  var TEN_MINS = 10 * 60000;
  // Touch existing Github nodes so Gatsby doesn't garbage collect them.
  touchNode(_.values(store.getState().nodes)
    .find(n => n.internal.type === `Repo`))

  let lastFetched
  if (
    store.getState().status.plugins &&
    store.getState().status.plugins['gatsby-source-github-repo']
  ) {
    lastFetched = store.getState().status.plugins['gatsby-source-github-repo'].lastFetched
  }
  // to get around github rate limiting we only refresh data every 10 mins
  if (lastFetched && (Date.now() - TEN_MINS < lastFetched)) {
    console.log('*not* refetching github data');
    return;
  }

  let { data: repoData } = await github.repos.get({ owner, repo });

  const repoMetaData = await Promise.all([
    github.repos.getReleases({ owner, repo }),
    github.repos.getContributors({ owner, repo })
  ]).catch(err => {
    console.log(err);
  });

  const allData = {
    ...repoData,
    releases: repoMetaData[0].data,
    contributors: repoMetaData[1].data
  }

  setPluginStatus({ lastFetched: Date.now() })

  const contentDigest = crypto.createHash('md5').update(JSON.stringify(allData)).digest(`hex`);

  const node = {
    ...allData,
    id: `${allData.id}`,
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
