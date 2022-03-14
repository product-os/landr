import size from 'lodash/size'

export const name = 'ReadmeSections'

export const variants = (metadata) => {
  const combinations = []

  if (size(metadata.data.leftoverSections) > 0) {
    combinations.push({
      leftoverSections: metadata.data.leftoverSections
    })
  }

  return combinations
}

export default {
  name,
  variants
}
