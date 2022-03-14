export const name = 'Motivation'

export const variants = (metadata) => {
  const combinations = []

  if (metadata.data.motivation) {
    combinations.push({
      motivation: metadata.data.motivation,
      name: metadata.data.name,
      tagline: metadata.data.tagline
    })
  }

  return combinations
}

export default {
  name,
  variants
}
