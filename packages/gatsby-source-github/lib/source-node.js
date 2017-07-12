const GitHubApi = require('github');
const crypto = require('crypto');
const _ = require('lodash');

var github = new GitHubApi();

module.exports = async ({ boundActionCreators, store }, { owner, repo }) => {
  const { createNode, setPluginStatus, touchNode } = boundActionCreators;

  // Touch existing Github nodes so Gatsby doesn't garbage collect them.
  touchNode(
    _.values(store.getState().nodes).find(n => n.internal.type === `Repo`)
  );

  if (process.env.GH_TOKEN) {
    github.authenticate({
      type: 'token',
      token: process.env.GH_TOKEN,
    });
  }

  const TEN_MINS = 10 * 60000;

  let status;
  if (
    store.getState().status.plugins &&
    store.getState().status.plugins['gatsby-source-github']
  ) {
    status = store.getState().status.plugins['gatsby-source-github'];
  }

  // this will get fixed when we fix gatsby .cache location
  if (
    status &&
    Date.now() - TEN_MINS < status.lastFetched &&
    status.repo === repo &&
    status.owner === owner
  ) {
    console.warn(
    `
    *****************************
    NOT FETCHING NEW GITHUB DATA
    *****************************
    `
    );
    return;
  }

  let { data: repoData } = await github.repos.get({ owner, repo });

  const repoMetaData = await Promise.all([
    github.repos.getReleases({ owner, repo }),
    github.repos.getContributors({ owner, repo }),
    github.repos.getCommits({ owner, repo })
  ]).catch(err => {
    console.log(err);
  });

  const allData = {
    ...repoData,
    releases: repoMetaData[0].data,
    contributors: repoMetaData[1].data,
    commits: repoMetaData[2].data
  };

  setPluginStatus({
    lastFetched: Date.now(),
    repo: repo,
    owner: owner
  });

  const contentDigest = crypto
    .createHash('md5')
    .update(JSON.stringify(allData))
    .digest('hex');

  const node = {
    ...allData,
    id: `${allData.id}`,
    parent: '__SOURCE__',
    children: [],
    internal: {
      type: 'Repo',
      mediaType: 'text/x-gh',
      contentDigest
    }
  };

  createNode(node);

  return;
};
