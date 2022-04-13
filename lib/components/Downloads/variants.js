import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
export const name = 'Downloads'

export const variants = (metadata) => {
  const combinations = []

  if (
    !isEmpty(get(metadata, [ 'data', 'releases', 'latestRelease', 'assets' ]))
  ) {
    combinations.push({
      assets: metadata.data.releases.latestRelease.assets,
      tag: metadata.data.releases.latestRelease.tagName,
      name: metadata.data.name
    })
  }

  return combinations
}

export default {
  name,
  variants
}
