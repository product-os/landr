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

exports.getMetaData = async (repository, branch, context, downloadRepo) => {
  exports.log(`generating data for ${repository} on branch ${branch}...`)
  let scrutinizerData = await scrutinizer.local(repository, {
    reference: branch,
    downloadRepo,
    context
  })
  exports.log(`generated data for ${repository} with version ${scrutinizerData.version}...`)

  if (
    scrutinizerData.orgContract &&
    scrutinizerData.orgContract.type === 'organization.blueprint'
  ) {
    let orgScrutinizerData = null

    let repoName = null
    let orgName = null
    if (downloadRepo) {
      [ orgName, repoName ] = repository.split('/')
    } else {
      const {
        repository: gitRepository
      } =
        await exports.getCurrentGitReference();
      [ orgName, repoName ] = gitRepository.split('/')
    }
    const {
      orgContract
    } = scrutinizerData
    if (orgName !== repoName) {
      orgScrutinizerData = await scrutinizer.local(`${orgName}/${orgName}`, {
        reference: 'master',
        downloadRepo: true,
        context
      })
      orgScrutinizerData.teamMembers = [
        await metaGenerator.run(scrutinizerData)
      ]
      scrutinizerData = orgScrutinizerData
    }
    if (orgContract.composedOf) {
      for (const item of orgContract.composedOf) {
        if (item.type === 'human' && item.handle !== repoName) {
          const humanContract = await scrutinizer.local(
            `${scrutinizerData.owner.handle}/${item.handle}`,
            {
              reference: 'master',
              downloadRepo: true,
              context
            }
          )
          if (scrutinizerData.teamMembers) {
            scrutinizerData.teamMembers.push(
              await metaGenerator.run(humanContract)
            )
          } else {
            scrutinizerData.teamMembers = [
              await metaGenerator.run(humanContract)
            ]
          }
        }
      }
    }
  }

  const contract = await metaGenerator.run(scrutinizerData)

  return contract
}
