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

module.exports = (contract) => {
  const result = []

  result.push({
    title: 'Homepage',
    path: [],
    context: {}
  })

  const contributingToc = [
    {
      id: 'guide',
      name: 'Contributing',
      type: 'article',
      content: contract.data.contributing.guide
    },
    {
      id: 'architecture',
      name: 'Architecture',
      type: 'article',
      content: contract.data.contributing.architecture
    },
    {
      id: 'code-of-conduct',
      name: 'Code of Conduct',
      type: 'article',
      content: contract.data.contributing.codeOfConduct
    }
  ]

  result.push({
    title: 'contributing',
    path: [ 'contributing' ],
    context: {
      toc: contributingToc,
      versions: Object.keys(contract.data.docs.tags),
      latest: contract.data.docs.latest
    }
  })

  for (const element of contributingToc) {
    result.push({
      title: element.name,
      path: [ 'contributing', element.id ],
      context: {
        toc: contributingToc,
        article: element,
        versions: Object.keys(contract.data.docs.tags),
        latest: contract.data.docs.latest
      }
    })
  }

  return result
}
