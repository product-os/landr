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

const _ = require('lodash')

/*
 * These are the rules that must hold for any generated website.
 * They are not optional, and combinations that don't adhere to
 * these rules are completely discarded, so don't use these
 * functions to describe preferences.
 */

module.exports = [
  // Don't render a combination of nothing, taking
  // Head into account.
  (combination) => {
    return combination.length > 1
  },

  // No jumbotron on pages other than the main one
  (combination, routes, path) => {
    return path.length === 0 || !combination.some((element) => {
      return element.component === 'Jumbotron'
    })
  },

  (combination) => {
    return combination[0].component === 'Head'
  },

  (combination) => {
    return Boolean(_.find(combination, {
      component: 'Navigation'
    }))
  },

  (combination) => {
    const index = _.findIndex(combination, {
      component: 'Jumbotron'
    })

    return index === -1 ||
      combination[index - 1].component === 'Navigation'
  },

  // Don't render a jumbotron as the first thing in the page
  (combination) => {
    return combination[0].component !== 'Jumbotron' &&
      combination[1].component !== 'Jumbotron'
  }
]
