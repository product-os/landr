export const name = 'Introduction'

export const variants = (metadata) => {
  const combinations = []

  if (metadata.data.introduction) {
    combinations.push({
      introduction: metadata.data.introduction
    })
  }

  return combinations
}

export default {
  name,
  variants
}
