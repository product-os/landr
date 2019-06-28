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
const generator = require('../lib/generator')
const CONTRACT = require('../meta.json')
const THEME = require('../default-theme.json')

ava('should generate at least one route for the current repo', (test) => {
  const result = generator(CONTRACT, THEME)
  test.false(_.isEmpty(result))
})

ava('should generate non blank pages for the current repo', (test) => {
  const result = generator(CONTRACT, THEME)
  for (const combination of _.values(result)) {
    test.true(_.isArray(combination))
    test.true(combination.length > 0)
  }
})

ava('should generate unique combinations for the current repo routes', (test) => {
  const result = generator(CONTRACT, THEME)
  for (const combination of _.values(result)) {
    const components = _.map(combination, 'component')
    test.is(components.length, _.uniq(components).length)
  }
})

ava('should generate combinations with non blank options for the current repo', (test) => {
  const result = generator(CONTRACT, THEME)
  for (const combination of _.values(result)) {
    for (const element of combination) {
      test.false(_.isEmpty(element.options))
    }
  }
})
