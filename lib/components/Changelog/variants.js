export const name = 'Changelog'

export const variants = (metadata) => {
  const combinations = []

  if (metadata.data.changelog) {
    combinations.push({
      changelog: metadata.data.changelog
    })
  }

  return combinations
}

export default {
  name,
  variants
}
