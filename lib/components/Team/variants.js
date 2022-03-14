export const name = 'Team'

export const variants = (metadata, context, route) => {
  const combinations = []

  const homepageLink = metadata.data.links.homepage

  const teamMembers =
    metadata.data.teamMembers &&
    metadata.data.teamMembers
      .filter((item) => {
        return item.data.balena.yml
      })
      .map((item) => {
        return {
          handle: item.data.balena.yml.handle || item.slug,
          link: item.data.links.homepage
            ? item.data.links.homepage.replace(homepageLink, '')
            : `/team/${item.slug}/`,
          name: item.data.balena.yml.data.name,
          avatar:
            item.data.balena.yml.data.profile_photo &&
            item.data.balena.yml.data.profile_photo.base64,
          lat: item.data.balena.yml.data.lat,
          lng: item.data.balena.yml.data.lng,
          city: item.data.balena.yml.data.city,
          country: item.data.balena.yml.data.country
        }
      })

  if (teamMembers) {
    combinations.push({
      teamMembers
    })
  }

  return combinations
}

export default {
  name,
  variants
}
