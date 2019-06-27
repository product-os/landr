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
const components = require('../lib/components')

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
