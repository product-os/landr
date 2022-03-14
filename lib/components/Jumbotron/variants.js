import find from 'lodash/find'
import get from 'lodash/get'
import flatten from 'lodash/flatten'

export const name = 'Jumbotron'

export const variants = (metadata, _context, _route, routes) => {
  const combinations = []

  if (metadata.data.isHumanRepo) return []

  const latestDocsVersion = metadata.data.docs.latest
  const entrypoint = get(metadata, [
    'data',
    'docs',
    'tags',
    latestDocsVersion,
    '0'
  ])

  const entryUrl =
    entrypoint &&
    find(routes, (definition) => {
      return (
        definition.context.article &&
        definition.context.article.content.filename === entrypoint.filename
      )
    })

  const steps =
    metadata.data.installation &&
    flatten(
      metadata.data.installation.steps.map((step) => {
        const commands = []
        if (step.text) {
          commands.push({
            command: step.text,
            comment: true
          })
        }
        if (step.code) {
          commands.push({
            command: step.code,
            comment: false
          })
        }
        return commands
      })
    )

  if (metadata.data.name && metadata.data.description && entryUrl) {
    combinations.push({
      isCli: metadata.data.cli,
      title: metadata.data.name,
      description: metadata.data.description,
      packageName: metadata.data.name,
      action: `/${entryUrl.path.join('/')}`,
      logoBrandMark: metadata.data.logoBrandMark,
      deployWithBalenaUrl:
        metadata.data.deployWithBalenaUrl &&
        metadata.data.deployWithBalenaUrl.replace('.git', ''),
      steps,
      type: metadata.data.type,
      repositoryUrl: metadata.data.links.repository,
      screenshot: metadata.data.screenshot,
      bannerText: get(metadata, [ 'data', 'images', 'bannerText' ])
    })
  }

  if (metadata.data.name && metadata.data.description) {
    combinations.push({
      isCli: metadata.data.cli,
      title: metadata.data.name,
      description: metadata.data.description,
      packageName: metadata.data.name,
      steps,
      type: metadata.data.type,
      repositoryUrl: metadata.data.links.repository,
      screenshot: metadata.data.screenshot,
      bannerText: get(metadata, [ 'data', 'images', 'bannerText' ])
    })
  }

  if (metadata.data.name) {
    combinations.push({
      isCli: metadata.data.cli,
      title: metadata.data.name,
      packageName: metadata.data.name,
      steps,
      type: metadata.data.type,
      repositoryUrl: metadata.data.links.repository,
      bannerText: get(metadata, [ 'data', 'images', 'bannerText' ])
    })
  }

  return combinations
}

export default {
  name,
  variants
}
