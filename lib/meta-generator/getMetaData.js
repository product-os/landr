const scrutinizer = require('scrutinizer')
const {
  log
} = require('../utils/log')
const metaGenerator = require('./generate-landr-meta')

exports.getMetaData = async (repository, branch, context, downloadRepo) => {
  log(`generating data for ${repository} on branch ${branch}...`)
  let scrutinizerData = await scrutinizer.local(repository, {
    reference: branch,
    downloadRepo,
    context
  })
  log(`generated data for ${repository} with version ${scrutinizerData.version}...`)

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
