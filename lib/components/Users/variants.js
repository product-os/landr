import size from 'lodash/size'
export const name = 'Users'

export const variants = (metadata) => {
  const combinations = []

  if (size(metadata.data.github.usedBy) > 0) {
    combinations.push({
      users: metadata.data.github.usedBy
    })
  }

  return combinations
}

export default {
  name,
  variants
}
