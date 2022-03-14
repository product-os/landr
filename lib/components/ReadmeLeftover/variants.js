import trim from 'lodash/trim'

export const name = 'ReadmeLeftover'

export const variants = (metadata) => {
  const combinations = []

  if (trim(metadata.data.readmeLeftover)) {
    combinations.push({
      readmeLeftover: metadata.data.readmeLeftover
    })
  }

  return combinations
}

export default {
  name,
  variants
}
