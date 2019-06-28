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
const router = require('../../lib/engine/router')
const TEST_THEME = require('../../default-theme.json')

ava('.getPath() should get the path of a root route', (test) => {
  const path = router.getPath({
    title: 'Homepage',
    path: [],
    context: {}
  })

  test.deepEqual(path, [])
})

ava('.getPath() should get the path of a child route', (test) => {
  const path = router.getPath({
    title: 'Getting Started',
    path: [ 'docs', 'getting-started' ],
    context: {}
  })

  test.deepEqual(path, [ 'docs', 'getting-started' ])
})

ava('.getContext() should get an empty object context', (test) => {
  const context = router.getContext({
    title: 'Homepage',
    path: [],
    context: {}
  }, TEST_THEME)

  test.deepEqual(context, {
    theme: TEST_THEME
  })
})

ava('.getContext() should get an null object context', (test) => {
  const context = router.getContext({
    title: 'Homepage',
    path: [],
    context: null
  }, TEST_THEME)

  test.deepEqual(context, {
    theme: TEST_THEME
  })
})

ava('.getContext() should get a non empty object context', (test) => {
  const context = router.getContext({
    title: 'Getting Started',
    path: [ 'docs', 'getting-started' ],
    context: {
      foo: 'bar',
      bar: 'baz'
    }
  }, TEST_THEME)

  test.deepEqual(context, {
    foo: 'bar',
    bar: 'baz',
    theme: TEST_THEME
  })
})

ava('.getContext() should override a route theme object', (test) => {
  const context = router.getContext({
    title: 'Homepage',
    path: [],
    context: {
      theme: {
        foo: 'bar'
      }
    }
  }, TEST_THEME)

  test.deepEqual(context, {
    theme: TEST_THEME
  })
})

ava('.findRouteByPath() should find a route by path', (test) => {
  const route = router.findRouteByPath([
    {
      title: 'Homepage',
      path: [],
      context: {}
    },
    {
      title: 'Documentation',
      path: [ 'docs' ],
      context: {}
    },
    {
      title: 'Getting Started',
      path: [ 'docs', 'getting-started' ],
      context: {}
    }
  ], [ 'docs' ])

  test.deepEqual(route, {
    title: 'Documentation',
    path: [ 'docs' ],
    context: {}
  })
})

ava('.findRouteByPath() should find the root route', (test) => {
  const route = router.findRouteByPath([
    {
      title: 'Homepage',
      path: [],
      context: {}
    },
    {
      title: 'Documentation',
      path: [ 'docs' ],
      context: {}
    },
    {
      title: 'Getting Started',
      path: [ 'docs', 'getting-started' ],
      context: {}
    }
  ], [])

  test.deepEqual(route, {
    title: 'Homepage',
    path: [],
    context: {}
  })
})

ava('.findRouteByPath() should find a child route ignoring its parent', (test) => {
  const route = router.findRouteByPath([
    {
      title: 'Homepage',
      path: [],
      context: {}
    },
    {
      title: 'Documentation',
      path: [ 'docs' ],
      context: {}
    },
    {
      title: 'Getting Started',
      path: [ 'docs', 'getting-started' ],
      context: {}
    }
  ], [ 'docs', 'getting-started' ])

  test.deepEqual(route, {
    title: 'Getting Started',
    path: [ 'docs', 'getting-started' ],
    context: {}
  })
})

ava('.findRouteByPath() should fail to find a child route', (test) => {
  const route = router.findRouteByPath([
    {
      title: 'Homepage',
      path: [],
      context: {}
    },
    {
      title: 'Documentation',
      path: [ 'docs' ],
      context: {}
    },
    {
      title: 'Getting Started',
      path: [ 'docs', 'getting-started' ],
      context: {}
    }
  ], [ 'docs', 'foobar' ])

  test.falsy(route)
})

ava('.findRouteByPath() should fail a top level route', (test) => {
  const route = router.findRouteByPath([
    {
      title: 'Homepage',
      path: [],
      context: {}
    },
    {
      title: 'Documentation',
      path: [ 'docs' ],
      context: {}
    },
    {
      title: 'Getting Started',
      path: [ 'docs', 'getting-started' ],
      context: {}
    }
  ], [ 'test' ])

  test.falsy(route)
})

ava('.getUriPath() should return the path of the root route', (test) => {
  const uri = router.getUriPath([])
  test.deepEqual(uri, '/')
})

ava('.getUriPath() should return the path of a top level route', (test) => {
  const uri = router.getUriPath([ 'docs' ])
  test.deepEqual(uri, '/docs')
})

ava('.getUriPath() should return the path of a child route', (test) => {
  const uri = router.getUriPath([ 'developer', 'contributing' ])
  test.deepEqual(uri, '/developer/contributing')
})
