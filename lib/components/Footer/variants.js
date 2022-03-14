import {
  getStructuredRoutes
} from '../utils'

export const name = 'Footer'

export const variants = (metadata, context, route, routes) => {
  const combinations = []

  let githubUrl =
    (metadata.data.links && metadata.data.links.repository) || null

  const {
    topLevelRoutes, secondaryRoutes
  } = getStructuredRoutes(
    routes,
    route
  )

  const teamMember =
    metadata.data.teamMembers &&
    metadata.data.teamMembers.find((item) => {
      return item.slug === route.base.slice().reverse()[0]
    })

  if (metadata.data.isHumanRepo || teamMember) {
    githubUrl = null
  }

  if (githubUrl && !teamMember) {
    topLevelRoutes.push({
      name: 'GitHub',
      url: githubUrl.replace('.git', '')
    })
  }

  if (metadata.data.github.owner && metadata.data.images.banner) {
    combinations.push({
      name: metadata.data.name,
      owner: metadata.data.github.owner,
      logo: metadata.data.images.banner,
      routes: topLevelRoutes,
      secondaryRoutes,
      toc: context.toc,
      docsTableOfContent: context.docsTableOfContent
    })
  }

  if (metadata.data.github.owner) {
    combinations.push({
      name: metadata.data.name,
      owner: metadata.data.github.owner,
      routes: topLevelRoutes,
      secondaryRoutes,
      toc: context.toc,
      docsTableOfContent: context.docsTableOfContent
    })
  }

  return combinations
}

export default {
  name,
  variants
}
