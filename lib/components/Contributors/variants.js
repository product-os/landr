import size from 'lodash/size'

export const name = 'Contributors'

export const variants = (metadata, _context, route) => {
  const combinations = []

  if (metadata.data.isHumanRepo) {
    return []
  }

  if (
    size(metadata.data.contributors) > 36 &&
    route.path.length === 0 &&
    metadata.data.links.repository
  ) {
    combinations.push({
      minimalView: true
    })
  }

  if (metadata.data.contributors && metadata.data.links.repository) {
    combinations.push({
      name: metadata.data.name,
      contributors: metadata.data.contributors,
      repository: metadata.data.links.repository,
      contributing: metadata.data.contributing.guide
        ? `${metadata.data.links.repository.replace('.git', '')}/blob/master/${
          metadata.data.contributing.guide.filename
        }`
        : null
    })
  }

  return combinations
}

export default {
  name,
  variants
}
