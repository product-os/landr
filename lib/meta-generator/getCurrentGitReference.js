const {
  log
} = require('../utils/log')

const git = require('simple-git')()

exports.getCurrentGitReference = async () => {
  log('gathering git reference information...')

  const branch = await git.revparse([ '--abbrev-ref', 'HEAD' ])
  const remote = await git.listRemote([ '--get-url', 'origin', '--push' ])
  log(`remote ${remote}, ${branch}`);
  const repository = remote.trim().match(/:(.+)\.git$/)[1]

  return {
    branch,
    repository
  }
}
