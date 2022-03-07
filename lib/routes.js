/*
 * Copyright 2019 balena.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const _ = require('lodash')

// Temporary fix until we find the source of `window` usage, in external library
global.window = {}
global.self = {}

const generateLandrRoutes = (contract, base = [], baseScope = 'home') => {
  let result = []

  const latestDocsVersion = contract.data.docs.latest
  const latestDocs = _.get(
    contract,
    [ 'data', 'docs', 'tags', latestDocsVersion ],
    []
  )

  const docsToc = latestDocs.map((doc) => {
    return {
      id: _.kebabCase(doc.title),
      type: 'article',
      content: doc,
      tableOfContent: doc.tableOfContent
    }
  })

  result.push({
    title: 'Homepage',
    base,
    scope: baseScope,
    path: base.concat([]),
    context: {
      base,
      scope: baseScope,
      docsTableOfContent: docsToc.map((entry) => {
        return {
          path: base.concat([ 'docs', entry.id ]),
          title: entry.content.title,
          tableOfContent: entry.tableOfContent
        }
      })
    }
  })

  for (const element of docsToc) {
    if (element.id === docsToc[0].id) {
      result.push({
        title: element.content.title,
        base,
        scope: 'docs',
        path: base.concat([ 'docs' ]),
        context: {
          base,
          scope: 'docs',
          toc: docsToc.map((entry) => {
            return {
              path: base.concat([ 'docs', entry.id ]),
              title: entry.content.title,
              tableOfContent: entry.tableOfContent
            }
          }),
          article: element,
          versions: Object.keys(contract.data.docs.tags),
          latest: contract.data.docs.latest,
          version: contract.data.docs.latest
        }
      })
    }

    result.push({
      title: element.content.title,
      path: base.concat([ 'docs', element.id ]),
      base,
      scope: 'docs',
      context: {
        base,
        scope: 'docs',
        docsTableOfContent: docsToc.map((entry) => {
          return {
            path: base.concat([ 'docs', entry.id ]),
            title: entry.content.title,
            tableOfContent: entry.tableOfContent
          }
        }),
        article: element,
        versions: Object.keys(contract.data.docs.tags),
        latest: contract.data.docs.latest,
        version: contract.data.docs.latest
      }
    })
  }

  for (const version of Object.keys(contract.data.docs.tags)) {
    // eslint-disable-next-line no-loop-func
    const versionedDocsToc = contract.data.docs.tags[version].map((doc) => {
      return {
        id: _.kebabCase(doc.title),
        type: 'article',
        content: doc,
        tableOfContent: doc.tableOfContent
      }
    })

    for (const element of versionedDocsToc) {
      if (element.id === versionedDocsToc[0].id) {
        result.push({
          title: element.content.title,
          path: base.concat([ 'docs', version ]),
          base,
          scope: 'docs',
          context: {
            base,
            scope: 'docs',
            // eslint-disable-next-line no-loop-func
            toc: docsToc.map((entry) => {
              return {
                path: base.concat([ 'docs', entry.id ]),
                title: entry.content.title,
                tableOfContent: entry.tableOfContent
              }
            }),
            article: element,
            versions: Object.keys(contract.data.docs.tags),
            latest: contract.data.docs.latest,
            version
          }
        })
      }

      result.push({
        title: element.content.title,
        path: base.concat([ 'docs', element.id, version ]),
        base,
        scope: 'docs',
        context: {
          base,
          scope: 'docs',
          toc: docsToc.map((entry) => {
            return {
              path: base.concat([ 'docs', entry.id ]),
              title: entry.content.title,
              tableOfContent: entry.tableOfContent
            }
          }),
          docsTableOfContent: docsToc.map((entry) => {
            return {
              path: base.concat([ 'docs', entry.id ]),
              title: entry.content.title,
              tableOfContent: entry.tableOfContent
            }
          }),
          article: element,
          versions: Object.keys(contract.data.docs.tags),
          latest: contract.data.docs.latest,
          version
        }
      })
    }
  }

  if (contract.data.contributing) {
    const contributingToc = [
      {
        id: 'guide',
        type: 'article',
        content: contract.data.contributing.guide
      },
      {
        id: 'architecture',
        type: 'article',
        content: contract.data.contributing.architecture
      },
      {
        id: 'code-of-conduct',
        type: 'article',
        content: contract.data.contributing.codeOfConduct
      },
      {
        id: 'security',
        type: 'article',
        content: contract.data.contributing.security
      }
    ].filter((guide) => {
      return Boolean(guide.content)
    })

    for (const element of contributingToc) {
      const path =
        element.id === contributingToc[0].id
          ? [ 'contributing' ]
          : [ 'contributing', element.id ]

      result.push({
        title: element.content.title,
        base,
        scope: 'contributing',
        path,
        context: {
          base,
          scope: 'contributing',
          toc: contributingToc.map((entry) => {
            const entryPath =
              entry.id === contributingToc[0].id
                ? [ 'contributing' ]
                : [ 'contributing', entry.id ]
            return {
              path: base.concat(entryPath),
              title: entry.content.title
            }
          }),
          article: element
        }
      })
    }
  }

  const getBlogPath = (entry) => {
    let datePath = []

    if (entry.published_at) {
      const date = new Date(entry.published_at)
      datePath = [
        date.getFullYear().toString(),
        _.padStart(date.getMonth(), 2, '0'),
        _.padStart(date.getDate(), 2, '0')
      ]
    }

    return base.concat([ 'blog', ...datePath, _.kebabCase(entry.title) ])
  }

  if (contract.data.blog && contract.data.blog.length > 0) {
    result.push({
      title: 'Blog',
      base,
      scope: 'blog',
      path: base.concat([ 'blog' ]),
      context: {
        base,
        scope: 'blog',
        docsTableOfContent: docsToc.map((entry) => {
          return {
            path: base.concat([ 'docs', entry.id ]),
            title: entry.content.title
          }
        }),
        articles: contract.data.blog.map((entry) => {
          return {
            id: _.kebabCase(entry.title),
            path: getBlogPath(entry),
            type: 'article',
            content: entry
          }
        })
      }
    })

    for (const entry of contract.data.blog) {
      result.push({
        title: entry.title,
        base,
        scope: 'blog',
        path: getBlogPath(entry),
        context: {
          base,
          scope: 'blog',
          docsTableOfContent: docsToc.map((doc) => {
            return {
              path: base.concat([ 'docs', doc.id ]),
              title: doc.content.title
            }
          }),
          toc: contract.data.blog.map((subentry) => {
            return {
              id: _.kebabCase(subentry.title),
              title: subentry.title,
              path: getBlogPath(subentry),
              type: 'article',
              content: subentry.content,
              tableOfContent: subentry.tableOfContent
            }
          }),
          article: {
            id: _.kebabCase(entry.title),
            path: getBlogPath(entry),
            type: 'article',
            content: entry
          }
        }
      })
    }
  }

  if (contract.data.changelog && contract.data.changelog.length > 0) {
    result.push({
      title: 'Changelog',
      base,
      scope: 'changelog',
      path: base.concat([ 'changelog' ]),
      context: {
        base,
        scope: 'changelog',
        docsTableOfContent: docsToc.map((entry) => {
          return {
            path: base.concat([ 'docs', entry.id ]),
            title: entry.content.title
          }
        })
      }
    })
  }
  if (contract.data.privacyPolicy && contract.data.privacyPolicy.content) {
    result.push({
      title: 'Privacy Policy',
      base,
      scope: 'legal',
      path: base.concat([ 'privacy-policy' ]),
      context: {
        base,
        scope: 'legal',
        docsTableOfContent: docsToc.map((entry) => {
          return {
            path: base.concat([ 'docs', entry.id ]),
            title: entry.content.title
          }
        })
      }
    })
  }
  if (contract.data.termsOfService && contract.data.termsOfService.content) {
    result.push({
      title: 'Terms of service',
      base,
      scope: 'legal',
      path: base.concat([ 'terms-of-service' ]),
      context: {
        base,
        scope: 'legal',
        docsTableOfContent: docsToc.map((entry) => {
          return {
            path: base.concat([ 'docs', entry.id ]),
            title: entry.content.title
          }
        })
      }
    })
  }
  if (
    contract.data.masterAgreement &&
    contract.data.masterAgreement.content
  ) {
    result.push({
      title: 'Master Agreement',
      base,
      scope: 'legal',
      path: base.concat([ 'master-agreement' ]),
      context: {
        base,
        scope: 'legal',
        docsTableOfContent: docsToc.map((entry) => {
          return {
            path: base.concat([ 'docs', entry.id ]),
            title: entry.content.title
          }
        })
      }
    })
  }

  if (_.size(contract.data.contributors) > 36) {
    result.push({
      title: 'Contributors',
      base,
      scope: 'contributors',
      path: base.concat([ 'contributors' ]),
      context: {
        base,
        scope: 'contributors',
        docsTableOfContent: docsToc.map((entry) => {
          return {
            path: base.concat([ 'docs', entry.id ]),
            title: entry.content.title
          }
        })
      }
    })
  }

  if (contract.data.teamMembers) {
    result.push({
      title: 'Team',
      base,
      scope: 'team',
      path: base.concat([ 'team' ]),
      context: {
        base,
        scope: 'team',
        docsTableOfContent: docsToc.map((entry) => {
          return {
            path: base.concat([ 'docs', entry.id ]),
            title: entry.content.title
          }
        })
      }
    })

    for (const member of contract.data.teamMembers) {
      let memberPath = [ 'team', member.slug ]
      if (member.data && member.data.links.homepage) {
        const {
          pathname
        } = new URL(member.data.links.homepage)
        memberPath = pathname.split('/').filter((part) => {
          return part !== ''
        })
      }
      result = result.concat(
        generateLandrRoutes(member, memberPath, 'teamMember')
      )
    }
  }

  return result
}

module.exports = generateLandrRoutes
