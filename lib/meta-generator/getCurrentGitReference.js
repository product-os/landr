const {
  log
} = require('../utils/log')

const git = require('simple-git')()

exports.getCurrentGitReference = async () => {
  log('gathering git reference information...')

  var branch = await git.revparse([ '--abbrev-ref', 'HEAD' ])
  if (branch.includes("HEAD")) {
	branch=process.env.CF_PAGES_BRANCH
  }
  const remote = await git.listRemote([ '--get-url', 'origin', '--push' ])
  // const repository = remote.trim().match(/:(.+)\.git$/)[1]
  const repository = remote.trim().split('.com')[1].slice(1).split('.git')[0]
  log(`remote ${remote}, ${branch}, ${repository}`)

  return {
    branch,
    repository
  }
}
