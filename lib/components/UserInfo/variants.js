const getMemberDetails = (userDetails) => {
  const details = {}

  if (userDetails.handle) {
    details.handle = userDetails.handle
  }
  if (userDetails.data.hard_problem) {
    details.hardProblem = userDetails.data.hard_problem
  }
  if (userDetails.data.name) {
    details.name = userDetails.data.name
  }
  if (userDetails.data.short_bio) {
    details.shortBio = userDetails.data.short_bio
  }
  if (userDetails.data.interests) {
    details.interests = (userDetails.data.interests || []).join(', ')
  }
  if (userDetails.data.nickname) {
    details.nickname = userDetails.data.nickname
  }
  if (userDetails.data.haves) {
    details.haves = userDetails.data.haves
  }
  if (userDetails.data.wants) {
    details.wants = userDetails.data.wants
  }
  if (userDetails.data.pronouns) {
    details.pronouns = userDetails.data.pronouns
      ? userDetails.data.pronouns.join(', ')
      : ''
  }
  if (userDetails.data.lat) {
    details.lat = userDetails.data.lat
  }
  if (userDetails.data.lng) {
    details.lng = userDetails.data.lng
  }
  if (userDetails.data.profile_photo) {
    if (userDetails.data.profile_photo.base64) {
      details.avatar = userDetails.data.profile_photo.base64
    } else if (typeof userDetails.data.profile_photo === 'string') {
      details.avatar = userDetails.data.profile_photo
    }
  }

  return details
}

export const variants = (metadata, context, route) => {
  const combinations = []

  const teamMember =
    metadata.data.teamMembers &&
    metadata.data.teamMembers.find((item) => {
      return item.slug === route.base.slice().reverse()[0]
    })

  if (teamMember && teamMember.data) {
    return [ getMemberDetails(teamMember.data.balena.yml) ]
  }

  if (!metadata.data.isHumanRepo) return combinations

  combinations.push(getMemberDetails(metadata.data.balena.yml))

  return combinations
}
export const name = 'UserInfo'

export default {
  name,
  variants
}
