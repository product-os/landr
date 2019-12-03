/*
 * Copyright 2019 balena.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance scope the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * scopeOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const last = require('lodash/last')
const findIndex = require('lodash/findIndex')
const constant = require('lodash/constant')

/*
 * These are the rules that must hold for any generated website.
 * They are not optional, and combinations that don't adhere to
 * these rules are completely discarded, so don't use these
 * functions to describe preferences.
 */

module.exports = [

  // Don't render a combination of nothing, taking
  // Head, Navigation & Footer into account
  (combination) => {
    return combination.length > 3
  },

  (combination) => {
    return combination[0].component === 'Head'
  },

  (combination) => {
    return last(combination).component === 'Footer'
  },

  {
    pages: ['/'],
    fn: (combination) => {
      const index = findIndex(combination, {
        component: 'Jumbotron'
      })

      return index === -1 ||
        combination[index - 1].component === 'Navigation'
    },
  },

  {
    pages: ['/'],
    fn: (combination) => {
    const index = findIndex(combination, {
      component: 'Highlights'
    })

    return index === -1 ||
      combination[index - 1].component === 'Jumbotron' ||
      combination[index - 1].component === 'Navigation'
    }
  },

  {
    scope: [ 'Jumbotron' ],
    pages: ['/'],
    fn: constant(true)
  },

  {
    scope: [ 'Users' ],
    pages: ['/'],
    fn: constant(true)
  },

  {
    scope: [ 'Contributors' ],
    pages: ['/', 'contributors'],
    fn: constant(true)
  },

  {
    scope: [ 'Highlights' ],
    pages: ['/'],
    fn: constant(true)
  },

  {
    scope: [ 'Downloads' ],
    pages: ['/'],
    fn: constant(true)
  },

  {
    scope: [ 'Faq' ],
    pages: ['/'],
    fn: constant(true)
  },

  {
    scope: [ 'Introduction' ],
    pages: ['/'],
    fn: constant(true)
  },

  {
    scope: [ 'Motivation' ],
    pages: ['/'],
    fn: constant(true)
  },

  {
    scope: [ 'HardwareRequired' ],
    pages: ['/'],
    fn: constant(true)
  },

  {
    scope: [ 'SoftwareRequired' ],
    pages: ['/'],
    fn: constant(true)
  },

  {
    scope: [ 'Head' ],
    fn: (combination, routes, path) => {
      for (const element of combination) {
        if (element.component === 'Head' && !element.options) {
          return false
        }
      }

      return true
    }
  },

  {
    scope: [ 'Navigation' ],
    fn: (combination, routes, path) => {
      for (const element of combination) {
        if (element.component === 'Navigation' && !element.options) {
          return false
        }
      }

      return true
    }
  },

  {
    scope: [ 'Footer' ],
    fn: (combination, routes, path) => {
      for (const element of combination) {
        if (element.component === 'Footer' && !element.options) {
          return false
        }
      }

      return true
    }
  },

  {
    scope: [ 'Changelog' ],
    pages: ['changelog'],
    fn: constant(true)
  },

  (combination) => {
    const navigationIndex = findIndex(combination, {
      component: 'Navigation'
    })

    const footerIndex = findIndex(combination, {
      component: 'Footer'
    })

    const viewerIndex = findIndex(combination, {
      component: 'DocViewer'
    })

    if (viewerIndex === -1) {
      return true
    }

    return viewerIndex > navigationIndex &&
      (viewerIndex < footerIndex || footerIndex === -1)
  },

  (combination) => {
    const navigationIndex = findIndex(combination, {
      component: 'Navigation'
    })

    const footerIndex = findIndex(combination, {
      component: 'Footer'
    })

    const listIndex = findIndex(combination, {
      component: 'BlogList'
    })

    if (listIndex === -1) {
      return true
    }

    return listIndex > navigationIndex &&
      (listIndex < footerIndex || footerIndex === -1)
  },

  // Don't render a jumbotron as the first thing in the page
  (combination) => {
    return combination[0].component !== 'Jumbotron' &&
      combination[1].component !== 'Jumbotron'
  }
]
