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
const routes = require('../lib/routes')
const CONTRACT = require('../meta.json')

ava('should generate valid routes for the current repo', (test) => {
  const result = routes(CONTRACT)
  test.true(_.isArray(result))
  test.true(result.length > 0)

  for (const route of result) {
    test.deepEqual(_.sortBy(_.keys(route)),
      _.sortBy([ 'title', 'path', 'context' ]))
    test.true(_.isString(route.title))
    test.not(route.title.trim(), '')
    test.true(_.isArray(route.path))
    test.true(_.every(route.path, _.isString))
    test.true(_.isPlainObject(route.context))
  }
})

ava('should generate not generate duplicate routes for the current repo', (test) => {
  const result = routes(CONTRACT)
  const groups = _.groupBy(_.map(result, (route) => {
    route.path = route.path.join('/')
    return route
  }), 'path')

  for (const route of _.values(groups)) {
    test.is(route.length, 1)
  }
})
