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

  const developersToc = [
    {
      id: 'contributing',
      name: 'Contributing',
      type: 'article',
      content: contract.data.developers.guide
    },
    {
      id: 'architecture',
      name: 'Architecture',
      type: 'article',
      content: contract.data.developers.architecture
    },
    {
      id: 'code-of-conduct',
      name: 'Code of Conduct',
      type: 'article',
      content: contract.data.developers.codeOfConduct
    }
  ]

  const docsToc = [
    {
      id: 'cli',
      name: 'CLI',
      type: 'article',
      content: contract.data.docs.tags[contract.data.docs.latest].pages[0]
    }
  ]

  const guidesToc = [
    {
      id: 'running-landr-in-ci',
      name: 'Running Landr in CI',
      type: 'article',
      content: contract.data.docs.tags[contract.data.docs.latest].tutorials[0]
    }
  ]

  result.push({
    title: 'Documentation',
    path: [ 'docs' ],
    context: {
      toc: docsToc.concat(guidesToc),
      versions: Object.keys(contract.data.docs.tags),
      latest: contract.data.docs.latest
    }
  })

  for (const element of docsToc.concat(guidesToc)) {
    result.push({
      title: element.name,
      path: [ 'docs', element.id ],
      context: {
        toc: docsToc.concat(guidesToc),
        article: element,
        versions: Object.keys(contract.data.docs.tags),
        latest: contract.data.docs.latest
      }
    })
  }

  result.push({
    title: 'Developers',
    path: [ 'developers' ],
    context: {
      toc: developersToc,
      versions: Object.keys(contract.data.docs.tags),
      latest: contract.data.docs.latest
    }
  })

  for (const element of developersToc) {
    result.push({
      title: element.name,
      path: [ 'developers', element.id ],
      context: {
        toc: developersToc,
        article: element,
        versions: Object.keys(contract.data.docs.tags),
        latest: contract.data.docs.latest
      }
    })
  }

  return result
}
