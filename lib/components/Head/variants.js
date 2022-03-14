export const name = 'Head'

export const variants = (metadata, context, route, routes, options) => {
  const combinations = []

  if (metadata.data.name) {
    combinations.push({
      siteUrl: options.siteUrl || '',
      pageUrl: `${options.siteUrl || ''}/${route.path.join('/')}`,
      description: metadata.data.description,
      title: route.path.length === 0 ? metadata.data.name : route.title
    })
  }

  return combinations
}

export default {
  name,
  variants
}
