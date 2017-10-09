module.exports = async ({ store, actions }) => {
  const gitInfo = require('gitinfo')({
    gitPath: `${store.getState().config.dir}/.git`,
    defaultBranchName: 'master'
  })

  gitInfo.getConfig()

  actions.addLocals({
    git: {
      githubUrl: gitInfo.getGithubUrl(),
      branchName: gitInfo.getBranchName(),
      remoteUrl: gitInfo.getRemoteUrl(),
      gitPath: gitInfo.getGitPath(),
      name: gitInfo.getName(),
      owner: gitInfo.getUsername(),
      config: gitInfo.getConfig()
    }
  })

  return Promise.resolve('hiii')
}
