// get url from local Filepath, we should instead search for this with gh-api
module.exports.getGithubFilePath = repoUrl => absLocalFilePath => {
  const name = repoUrl.split('/').pop();
  const path = absLocalFilePath.split(name).pop();
  return `${repoUrl}/blob/master${path}`;
};
