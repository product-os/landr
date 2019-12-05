/*
 * Copyright 2019 balena.io
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const ava = require('ava')
const _ = require('lodash')
const generator = require('../../lib/engine/generator')
const TEST_THEME = require('../../default-theme.json')

const sortCallback = (combination) => {
  return _.flatten(combination.map((element) => {
    return [ element.component, element.rank ]
  })).join('|')
}

ava('.getCombinations() should generate combinations for a given input', (test) => {
  const components = [
    {
      name: 'Foo',
      variants: (metadata) => {
        const combinations = []

        combinations.push({
          license: metadata.data.license
        })

        return combinations
      }
    },
    {
      name: 'Bar',
      variants: (metadata) => {
        const combinations = []

        if (metadata.data.name && metadata.data.tagline) {
          combinations.push({
            title: metadata.data.name,
            subtitle: metadata.data.tagline
          })
        }

        if (metadata.data.name) {
          combinations.push({
            title: metadata.data.name
          })
        }

        if (metadata.data.tagline) {
          combinations.push({
            title: metadata.data.tagline
          })
        }

        return combinations
      }
    },
    {
      name: 'Baz',
      variants: (metadata) => {
        const combinations = []

        if (metadata.data.url) {
          combinations.push({
            link: metadata.data.url
          })
        }

        return combinations
      }
    }
  ]

  const metadata = {
    slug: 'repository-test',
    type: 'repository',
    version: '1.0.0',
    markers: [],
    tags: [],
    links: {},
    active: true,
    data: {
      license: 'Apache-2.0',
      name: 'landr',
      tagline: 'Repository + Landr = Website'
    }
  }

  const result = []

  for (const combination of generator.getCombinations(components, metadata, [
    {
      title: 'Homepage',
      path: [],
      context: {}
    },
    {
      title: 'Documentation',
      path: [ 'docs' ],
      context: {
        hello: 'world'
      }
    }
  ], [ 'docs' ], {
    theme: TEST_THEME
  }, [])) {
    result.push(combination)
  }

  test.deepEqual(_.sortBy(result, sortCallback), _.sortBy([
    [
      {
        component: 'Foo',
        rank: 1,
        options: {
          license: 'Apache-2.0'
        }
      },
      {
        component: 'Bar',
        rank: 1,
        options: {
          title: 'landr',
          subtitle: 'Repository + Landr = Website'
        }
      }
    ],
    [
      {
        component: 'Bar',
        rank: 1,
        options: {
          title: 'landr',
          subtitle: 'Repository + Landr = Website'
        }
      },
      {
        component: 'Foo',
        rank: 1,
        options: {
          license: 'Apache-2.0'
        }
      }
    ],
    [
      {
        component: 'Foo',
        rank: 1,
        options: {
          license: 'Apache-2.0'
        }
      },
      {
        component: 'Bar',
        rank: 2,
        options: {
          title: 'landr'
        }
      }
    ],
    [
      {
        component: 'Bar',
        rank: 2,
        options: {
          title: 'landr'
        }
      },
      {
        component: 'Foo',
        rank: 1,
        options: {
          license: 'Apache-2.0'
        }
      }
    ],
    [
      {
        component: 'Foo',
        rank: 1,
        options: {
          license: 'Apache-2.0'
        }
      },
      {
        component: 'Bar',
        rank: 3,
        options: {
          title: 'Repository + Landr = Website'
        }
      }
    ],
    [
      {
        component: 'Bar',
        rank: 3,
        options: {
          title: 'Repository + Landr = Website'
        }
      },
      {
        component: 'Foo',
        rank: 1,
        options: {
          license: 'Apache-2.0'
        }
      }
    ],
    [
      {
        component: 'Foo',
        rank: 1,
        options: {
          license: 'Apache-2.0'
        }
      }
    ],
    [
      {
        component: 'Bar',
        rank: 1,
        options: {
          title: 'landr',
          subtitle: 'Repository + Landr = Website'
        }
      }
    ],
    [
      {
        component: 'Bar',
        rank: 2,
        options: {
          title: 'landr'
        }
      }
    ],
    [
      {
        component: 'Bar',
        rank: 3,
        options: {
          title: 'Repository + Landr = Website'
        }
      }
    ],
    []
  ], sortCallback))
})

ava('.filterCombinations() should remove redundand combinations given no rules', (test) => {
  const result = []
  for (const combination of generator.filterCombinations([
    [
      {
        component: 'Foo',
        rank: 1,
        options: {
          license: 'Apache-2.0'
        }
      },
      {
        component: 'Bar',
        rank: 1,
        options: {
          title: 'landr',
          subtitle: 'Repository + Landr = Website'
        }
      }
    ],
    [
      {
        component: 'Bar',
        rank: 1,
        options: {
          title: 'landr',
          subtitle: 'Repository + Landr = Website'
        }
      },
      {
        component: 'Foo',
        rank: 1,
        options: {
          license: 'Apache-2.0'
        }
      }
    ],
    [
      {
        component: 'Foo',
        rank: 1,
        options: {
          license: 'Apache-2.0'
        }
      },
      {
        component: 'Bar',
        rank: 2,
        options: {
          title: 'landr'
        }
      }
    ]
  ], [], [
    {
      title: 'Homepage',
      path: [],
      context: {}
    },
    {
      title: 'Documentation',
      path: [ 'docs' ],
      context: {
        hello: 'world'
      }
    }
  ], [ 'docs' ])) {
    result.push(combination)
  }

  test.deepEqual(result, [
    [
      {
        component: 'Foo',
        rank: 1,
        options: {
          license: 'Apache-2.0'
        }
      },
      {
        component: 'Bar',
        rank: 1,
        options: {
          title: 'landr',
          subtitle: 'Repository + Landr = Website'
        }
      }
    ]
  ])
})

ava('.filterCombinations() should process a set of rules', (test) => {
  const result = []
  for (const validCombination of generator.filterCombinations([
    [
      {
        component: 'Foo',
        rank: 1,
        options: {
          license: 'Apache-2.0'
        }
      },
      {
        component: 'Bar',
        rank: 1,
        options: {
          title: 'landr',
          subtitle: 'Repository + Landr = Website'
        }
      }
    ],
    [
      {
        component: 'Bar',
        rank: 1,
        options: {
          title: 'landr',
          subtitle: 'Repository + Landr = Website'
        }
      },
      {
        component: 'Foo',
        rank: 1,
        options: {
          license: 'Apache-2.0'
        }
      }
    ],
    [
      {
        component: 'Foo',
        rank: 1,
        options: {
          license: 'Apache-2.0'
        }
      },
      {
        component: 'Bar',
        rank: 2,
        options: {
          title: 'landr'
        }
      }
    ]
  ], [
    (combination) => {
      return combination[0].component === 'Bar'
    }
  ], [
    {
      title: 'Homepage',
      path: [],
      context: {}
    },
    {
      title: 'Documentation',
      path: [ 'docs' ],
      context: {
        hello: 'world'
      }
    }
  ], [ 'docs' ])) {
    result.push(validCombination)
  }

  test.deepEqual(result, [
    [
      {
        component: 'Bar',
        rank: 1,
        options: {
          title: 'landr',
          subtitle: 'Repository + Landr = Website'
        }
      },
      {
        component: 'Foo',
        rank: 1,
        options: {
          license: 'Apache-2.0'
        }
      }
    ]
  ])
})

ava('.getCombinations() should filter out combinations given scoped rules', (test) => {
  const components = [
    {
      name: 'Foo',
      variants: (metadata) => {
        const combinations = []

        combinations.push({
          license: metadata.data.license
        })

        return combinations
      }
    },
    {
      name: 'Bar',
      variants: (metadata) => {
        const combinations = []

        if (metadata.data.name && metadata.data.tagline) {
          combinations.push({
            title: metadata.data.name,
            subtitle: metadata.data.tagline
          })
        }

        if (metadata.data.name) {
          combinations.push({
            title: metadata.data.name
          })
        }

        if (metadata.data.tagline) {
          combinations.push({
            title: metadata.data.tagline
          })
        }

        return combinations
      }
    },
    {
      name: 'Baz',
      variants: (metadata) => {
        const combinations = []

        if (metadata.data.url) {
          combinations.push({
            link: metadata.data.url
          })
        }

        return combinations
      }
    }
  ]

  const metadata = {
    slug: 'repository-test',
    type: 'repository',
    version: '1.0.0',
    markers: [],
    tags: [],
    links: {},
    active: true,
    data: {
      license: 'Apache-2.0',
      name: 'landr',
      tagline: 'Repository + Landr = Website'
    }
  }

  const result = []

  for (const combination of generator.getCombinations(components, metadata, [
    {
      title: 'Homepage',
      path: [],
      context: {}
    },
    {
      title: 'Documentation',
      path: [ 'docs' ],
      context: {
        hello: 'world'
      }
    }
  ], [ 'docs' ], {
    theme: TEST_THEME
  }, [
    // This one should not be evaluated
    (ruleCombination) => {
      return ruleCombination[0].component === 'Bar'
    },
    {
      scope: [ 'Foo' ],
      fn: (ruleCombination) => {
        return !ruleCombination.some((element) => {
          return element.component === 'Foo'
        })
      }
    }
  ])) {
    result.push(combination)
  }

  test.deepEqual(result, [
    [
      {
        component: 'Bar',
        rank: 1,
        options: {
          title: 'landr',
          subtitle: 'Repository + Landr = Website'
        }
      }
    ],
    [
      {
        component: 'Bar',
        rank: 2,
        options: {
          title: 'landr'
        }
      }
    ],
    [
      {
        component: 'Bar',
        rank: 3,
        options: {
          title: 'Repository + Landr = Website'
        }
      }
    ],
    []
  ])
})
