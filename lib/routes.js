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

  result.push({
    title: 'Homepage',
    path: [],
    context: {}
  })

  const docsToc = contract.data.docs.tags[contract.data.docs.latest].map((doc) => {
    return {
      id: _.kebabCase(doc.title),
      type: 'article',
      content: doc
    }
  })

  for (const element of docsToc) {
    if (element.id === docsToc[0].id) {
      result.push({
        title: element.content.title,
        path: [ 'docs' ],
        context: {
          toc: docsToc.map((entry) => {
            entry.path = [ 'docs', entry.id ]
            return entry
          }),
          article: element,
          versions: Object.keys(contract.data.docs.tags),
          latest: contract.data.docs.latest
        }
      })
    }

    result.push({
      title: element.content.title,
      path: [ 'docs', element.id ],
      context: {
        toc: docsToc.map((entry) => {
          entry.path = [ 'docs', entry.id ]
          return entry
        }),
        article: element,
        versions: Object.keys(contract.data.docs.tags),
        latest: contract.data.docs.latest
      }
    })
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
    ]

    for (const element of contributingToc) {
      const path = element.id === contributingToc[0].id
        ? [ 'contributing' ]
        : [ 'contributing', element.id ]

      result.push({
        title: element.content.title,
        path,
        context: {
          toc: contributingToc.map((entry) => {
            const entryPath = entry.id === contributingToc[0].id
              ? [ 'contributing' ]
              : [ 'contributing', entry.id ]
            entry.path = entryPath
            return entry
          }),
          article: element
        }
      })
    }
  }

  return result
}
