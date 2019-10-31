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

const React = require('react')
const {
  Provider
} = require('rendition')
const ava = require('ava')
const path = require('path')
const toPairs = require('lodash/toPairs')
const isFunction = require('lodash/isFunction')
const sortBy = require('lodash/sortBy')
const keys = require('lodash/keys')
const startCase = require('lodash/startCase')
const fs = require('fs')
const enzyme = require('enzyme')
const JSDOM = require('jsdom').JSDOM
const Adapter = require('enzyme-adapter-react-16')
const components = require('../lib/components')
const analytics = require('../lib/analytics')
const routes = require('../lib/routes')
const CONTRACT = require('../meta.json')
const COMPONENTS_PATH = path.resolve(__dirname, '..', 'lib', 'components')
const THEME = require('../default-theme.json')

enzyme.configure({
  adapter: new Adapter()
})

for (const component of toPairs(components)) {
  ava(`${component[0]} should have a ${component[0]} name property`, (test) => {
    test.is(component[0], component[1].name)
  })

  ava(`${component[0]} should have variants function`, (test) => {
    test.true(isFunction(component[1].variants))
  })

  ava(`${component[0]} should have render function`, (test) => {
    test.true(isFunction(component[1].render))
  })

  ava(`${component[0]} should not export anything else`, (test) => {
    const expected = [ 'name', 'variants', 'render' ]
    test.deepEqual(sortBy(keys(component[1])), sortBy(expected))
  })
}

for (const file of fs.readdirSync(COMPONENTS_PATH)) {
  const extension = path.extname(file)
  if ([ '.css', '' ].includes(extension) || file === 'index.js') {
    continue
  }

  const name = startCase(path.basename(file, extension))
    .replace(/\s/g, '')

  ava(`${file} should be exported as ${name}`, (test) => {
    test.truthy(components[name])
    test.is(components[name].name, name)
  })
}

// See https://airbnb.io/enzyme/docs/guides/jsdom.html
const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const {
  window
} = jsdom

const copyProps = (src, target) => {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target)
  })
}

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}

global.requestAnimationFrame = (callback) => {
  return setTimeout(callback, 0)
}

global.cancelAnimationFrame = (id) => {
  clearTimeout(id)
}

copyProps(window, global)

const ROUTES = routes(CONTRACT)

for (const route of ROUTES) {
  for (const [ name, definition ] of Object.entries(components)) {
    const variants = definition.variants(CONTRACT, route.context, route, ROUTES, {
      theme: THEME
    })

    variants.forEach((variant, index) => {
      ava(`${name} should render for variant ${index} in /${route.path.join('/')}`, (test) => {
        test.notThrows(() => {
          const element = definition.render(variant, analytics('test'))
          enzyme.mount(<Provider>{element}</Provider>)
        })
      })
    })
  }
}
