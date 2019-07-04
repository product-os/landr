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
const ui = require('../../lib/engine/ui')
const TEST_THEME = require('../../default-theme.json')

ava('.getVariants() should get all variants of a component', (test) => {
  const variants = ui.getVariants({
    name: 'MyComponent',
    variants: (metadata, context, route, routes) => {
      return [
        {
          hello: context.hello,
          routes: routes.length,
          metadata: metadata.foo,
          path: route.path
        },
        {
          hello: context.hello,
          routes: routes.length,
          metadata: metadata.foo
        },
        {
          hello: context.hello,
          routes: routes.length
        },
        {
          hello: context.hello
        }
      ]
    }
  }, {
    foo: 'bar',
    bar: 'baz'
  }, [
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
  })

  test.deepEqual(variants, [
    {
      component: 'MyComponent',
      rank: 1,
      options: {
        hello: 'world',
        metadata: 'bar',
        routes: 2,
        path: [ 'docs' ]
      }
    },
    {
      component: 'MyComponent',
      rank: 2,
      options: {
        hello: 'world',
        metadata: 'bar',
        routes: 2
      }
    },
    {
      component: 'MyComponent',
      rank: 3,
      options: {
        hello: 'world',
        routes: 2
      }
    },
    {
      component: 'MyComponent',
      rank: 4,
      options: {
        hello: 'world'
      }
    },
    {
      component: 'MyComponent',
      rank: 5,
      options: null
    }
  ])
})

ava('.getVariants() should return no variants given an invalid path', (test) => {
  const variants = ui.getVariants({
    name: 'MyComponent',
    variants: (metadata, context, path, routes) => {
      return [
        {
          hello: context.hello,
          routes: routes.length,
          metadata: metadata.foo,
          path
        },
        {
          hello: context.hello,
          routes: routes.length,
          metadata: metadata.foo
        },
        {
          hello: context.hello,
          routes: routes.length
        },
        {
          hello: context.hello
        }
      ]
    }
  }, {
    foo: 'bar',
    bar: 'baz'
  }, [
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
  ], [ 'test' ], {
    theme: TEST_THEME
  })

  test.deepEqual(variants, [])
})
