export const name = 'BlogList'

export const variants = (metadata, context, route) => {
  const combinations = []

  if (context.articles) {
    combinations.push({
      articles: context.articles
    })
  }

  return combinations
}

export default {
  variants,
  name
}
