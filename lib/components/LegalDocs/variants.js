export const variants = (metadata, _context, route, _routes) => {
  const combinations = []

  if (
    metadata.data.masterAgreement &&
    route.path.includes('master-agreement')
  ) {
    let title = 'Master Agreement'
    let updated = null
    if (metadata.data.masterAgreement.frontmatter) {
      if (metadata.data.masterAgreement.frontmatter.title) {
        title = metadata.data.masterAgreement.frontmatter.title
      } else if (metadata.data.masterAgreement.frontmatter.header) {
        title = metadata.data.masterAgreement.frontmatter.header
      }
      if (metadata.data.masterAgreement.frontmatter.updated) {
        updated = metadata.data.masterAgreement.frontmatter.updated
      }
    }
    combinations.push({
      title,
      updated,
      doc: metadata.data.masterAgreement.content
    })
  }
  if (metadata.data.privacyPolicy && route.path.includes('privacy-policy')) {
    let title = 'Privacy Policy'
    let updated = null
    if (metadata.data.privacyPolicy.frontmatter) {
      if (metadata.data.privacyPolicy.frontmatter.title) {
        title = metadata.data.privacyPolicy.frontmatter.title
      } else if (metadata.data.privacyPolicy.frontmatter.header) {
        title = metadata.data.privacyPolicy.frontmatter.header
      }
      if (metadata.data.privacyPolicy.frontmatter.updated) {
        updated = metadata.data.privacyPolicy.frontmatter.updated
      }
    }
    combinations.push({
      title,
      updated,
      doc: metadata.data.privacyPolicy.content
    })
  }
  if (metadata.data.termsOfService && route.path.includes('terms-of-service')) {
    let title = 'Terms of Service'
    let updated = null
    if (metadata.data.termsOfService.frontmatter) {
      if (metadata.data.termsOfService.frontmatter.title) {
        title = metadata.data.termsOfService.frontmatter.title
      } else if (metadata.data.termsOfService.frontmatter.header) {
        title = metadata.data.termsOfService.frontmatter.header
      }
      if (metadata.data.termsOfService.frontmatter.updated) {
        updated = metadata.data.termsOfService.frontmatter.updated
      }
    }
    combinations.push({
      title,
      doc: metadata.data.termsOfService.content,
      updated
    })
  }

  return combinations
}

export const name = 'LegalDocs'

export default {
  name,
  variants
}
