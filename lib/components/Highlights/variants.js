import size from 'lodash/size'

export const name = 'Highlights'

export const variants = (metadata) => {
  const combinations = []

  if (size(metadata.data.highlights) > 0) {
    combinations.push({
      highlights: metadata.data.highlights
    })
  }

  return combinations
}

export default {
  name,
  variants
}
