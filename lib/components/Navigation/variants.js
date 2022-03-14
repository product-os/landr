import {
  getStructuredRoutes
} from '../utils'
export const name = 'Navigation'

export const variants = (metadata, context, route, routes) => {
  const combinations = []

  let brandLink = '/'
  let githubUrl =
    (metadata.data.links && metadata.data.links.repository) || null

  const {
    topLevelRoutes
  } = getStructuredRoutes(routes, route)

  const teamMember =
    metadata.data.teamMembers &&
    metadata.data.teamMembers.find((item) => {
      return item.slug === route.base.slice().reverse()[0]
    })

  if (teamMember) {
    brandLink = `/${teamMember.slug}`
  }

  if (metadata.data.isHumanRepo || teamMember) {
    githubUrl = null
  }

  if (githubUrl) {
    githubUrl = githubUrl.replace('.git', '')
  }

  if (githubUrl && !teamMember) {
    if (metadata.data.version) {
      topLevelRoutes.push({
        name: `v${metadata.data.version}`,
        url: githubUrl.replace('.git', '')
      })
    }
  }

  if (
    metadata.data.images.banner ||
    (metadata.data.github.owner.logo && metadata.data.github.owner.logo.base64)
  ) {
    combinations.push({
      name: metadata.data.name,
      logo:
        metadata.data.images.banner ||
        (metadata.data.github.owner.logo &&
          metadata.data.github.owner.logo.base64),
      routes: topLevelRoutes,
      brandLink,
      githubUrl
    })
  }

  if (githubUrl) {
    combinations.push({
      name: metadata.data.name,
      routes: topLevelRoutes,
      brandLink,
      githubUrl
    })
  }

  return combinations
}

export default {
  name,
  variants
}
