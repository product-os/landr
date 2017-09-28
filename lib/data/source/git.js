const findUp = require('find-up')

module.exports = async () => {
  const gitDir = await findUp('.git')

  const gitInfo = require('gitinfo')({
    gitPath: gitDir,
    defaultBranchName: 'master'
  })

  gitInfo.getConfig()

  return gitInfo
}
