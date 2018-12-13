import github from '@octokit/rest';
import path from 'path';
import gitInfo from 'gitinfo';

const backend = new github();

// Authenticate for higher rate limit
backend.authenticate({
  type: 'token',
  token: process.env.GH_TOKEN,
});

// Get the git repo metadata
// TODO: Change the branch to the current one
const ghHelper = gitInfo({
  defaultBranchName: 'master',
  gitPath: path.resolve('.git'),
});

const repoNamespace = {
  owner: ghHelper.getUsername(),
  repo: ghHelper.getName(),
};

export { backend, repoNamespace };
