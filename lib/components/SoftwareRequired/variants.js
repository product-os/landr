export const name = 'SoftwareRequired'

export const variants = (metadata) => {
  const combinations = []

  if (metadata.data.softwareRequired) {
    combinations.push({
      softwareRequired: metadata.data.softwareRequired
    })
  }

  return combinations
}

export default {
  name,
  variants
}
