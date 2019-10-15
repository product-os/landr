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

module.exports = (contract) => {
  const result = []

  const latestDocsVersion = contract.data.docs.latest
  const latestDocs = _.get(contract, [ 'data', 'docs', 'tags', latestDocsVersion ], [])

  const docsToc = latestDocs.map(
    (doc) => {
      return {
        id: _.kebabCase(doc.title),
        type: 'article',
        content: doc,
        sections: doc.data.filter((entry) => {
          return _.isArray(entry) && entry.includes('header')
        })
      }
    }
  )

  result.push({
    title: 'Homepage',
    path: [],
    context: {
      toc: docsToc.map((entry) => {
        return {
          path: [ 'docs', entry.id ],
          title: entry.content.title,
          sections: entry.sections
        }
      })
    }
  })

  for (const element of docsToc) {
    if (element.id === docsToc[0].id) {
      result.push({
        title: element.content.title,
        path: [ 'docs' ],
        context: {
          toc: docsToc.map((entry) => {
            return {
              path: [ 'docs', entry.id ],
              title: entry.content.title,
              sections: entry.sections
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
      path: [ 'docs', element.id ],
      context: {
        toc: docsToc.map((entry) => {
          return {
            path: [ 'docs', entry.id ],
            title: entry.content.title,
            sections: entry.sections
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
    const versionedDocsToc = contract.data.docs.tags[version].map((doc) => {
      return {
        id: _.kebabCase(doc.title),
        type: 'article',
        content: doc,
        sections: doc.data.filter((entry) => {
          return _.isArray(entry) && entry.includes('header')
        })
      }
    })

    for (const element of versionedDocsToc) {
      if (element.id === versionedDocsToc[0].id) {
        result.push({
          title: element.content.title,
          path: [ 'docs', version ],
          context: {
            toc: docsToc.map((entry) => {
              return {
                path: [ 'docs', entry.id ],
                title: entry.content.title,
                sections: entry.sections
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
        path: [ 'docs', element.id, version ],
        context: {
          toc: docsToc.map((entry) => {
            return {
              path: [ 'docs', entry.id ],
              title: entry.content.title,
              sections: entry.sections
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
      const sections = element.content.data.filter((entry) => {
        return _.isArray(entry) && entry.includes('header')
      })

      element.sections = sections || []

      const path = element.id === contributingToc[0].id
        ? [ 'contributing' ]
        : [ 'contributing', element.id ]

      result.push({
        title: element.content.title,
        path,
        context: {
          toc: contributingToc.map((entry) => {
            const entryPath =
              entry.id === contributingToc[0].id
                ? [ 'contributing' ]
                : [ 'contributing', entry.id ]
            return ({
              path: entryPath,
              title: entry.content.title,
              sections: entry.sections
            })
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
      datePath = [ date.getFullYear().toString(),
        _.padStart(date.getMonth(), 2, '0'),
        _.padStart(date.getDate(), 2, '0') ]
    }

    return [
      'blog',
      ...datePath,
      _.kebabCase(entry.title)
    ]
  }

  if (contract.data.blog && contract.data.blog.length > 0) {
    result.push({
      title: 'Blog',
      path: [ 'blog' ],
      context: {
        toc: docsToc.map((entry) => {
          return {
            path: [ 'docs', entry.id ],
            title: entry.content.title,
            sections: []
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
        path: getBlogPath(entry),
        context: {
          toc: contract.data.blog.map((subentry) => {
            return {
              id: _.kebabCase(subentry.title),
              title: subentry.title,
              path: getBlogPath(subentry),
              type: 'article',
              content: subentry,
              sections: []
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
      path: [ 'changelog' ],
      context: {
        toc: docsToc.map((entry) => {
          return {
            path: [ 'docs', entry.id ],
            title: entry.content.title,
            sections: entry.sections
          }
        })
      }
    })
  }

  return result
}
