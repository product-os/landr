export const name = 'Faq'

export const variants = (metadata) => {
  const combinations = []

  if (metadata.data.faq) {
    combinations.push({
      faq: metadata.data.faq
    })
  }

  return combinations
}

export default {
  name,
  variants
}
