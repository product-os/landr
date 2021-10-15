const chalk = require('chalk')
const scrutinizer = require('scrutinizer')
const git = require('simple-git/promise')()
const metaGenerator = require('../../bot/lib/generate-landr-meta')

exports.log = (message) => {
  console.log(chalk.blue('[landr]'), message)
}

exports.getCurrentGitReference = async () => {
  exports.log('gathering git reference information...')

  const branch = await git.revparse([ '--abbrev-ref', 'HEAD' ])
  const remote = await git.listRemote([ '--get-url', 'origin', '--push' ])
  const repository = remote.trim().match(/:(.+)\.git$/)[1]

  return {
    branch,
    repository
  }
}

exports.getMetaData = async (repository, branch) => {
  exports.log('generating data...')

  const scrutinizerData = await scrutinizer.remote(repository, {
    reference: branch
  })

  const contract = await metaGenerator.run(scrutinizerData)

  return contract
}
