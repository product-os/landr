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
const path = require('path')
const _ = require('lodash')
const fs = require('fs')
const components = require('../lib/components')
const COMPONENTS_PATH = path.resolve(__dirname, '..', 'lib', 'components')

for (const component of _.toPairs(components)) {
  ava(`${component[0]} should have a ${component[0]} name property`, (test) => {
    test.is(component[0], component[1].name)
  })

  ava(`${component[0]} should have variants function`, (test) => {
    test.true(_.isFunction(component[1].variants))
  })

  ava(`${component[0]} should have render function`, (test) => {
    test.true(_.isFunction(component[1].render))
  })

  ava(`${component[0]} should not export anything else`, (test) => {
    const expected = [ 'name', 'variants', 'render' ]
    test.deepEqual(_.sortBy(_.keys(component[1])), _.sortBy(expected))
  })
}

for (const file of fs.readdirSync(COMPONENTS_PATH)) {
  const extension = path.extname(file)
  if ([ '.css', '' ].includes(extension) || file === 'index.js') {
    continue
  }

  const name = _.startCase(path.basename(file, extension))
    .replace(/\s/g, '')

  ava(`${file} should be exported as ${name}`, (test) => {
    test.truthy(components[name])
    test.is(components[name].name, name)
  })
}
