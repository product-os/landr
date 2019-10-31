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
const isArray = require('lodash/isArray')
const every = require('lodash/every')
const isEmpty = require('lodash/isEmpty')
const isFunction = require('lodash/isFunction')
const rules = require('../lib/rules')

ava('should be a list of functions', (test) => {
  test.true(isArray(rules))
  test.true(every(rules, (rule) => {
    return isFunction(rule) || isFunction(rule.fn)
  }))
})

ava('should not be empty', (test) => {
  test.false(isEmpty(rules))
})
