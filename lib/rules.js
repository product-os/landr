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

const _ = require('lodash')

/*
 * These are the rules that must hold for any generated website.
 * They are not optional, and combinations that don't adhere to
 * these rules are completely discarded, so don't use these
 * functions to describe preferences.
 */

module.exports = [
  (combination) => {
    return combination[0].component === 'Head'
  },

  (combination) => {
    return _.last(combination).component === 'Footer'
  },

  (combination) => {
    const index = _.findIndex(combination, {
      component: 'Jumbotron'
    })

    return index === -1 ||
      combination[index - 1].component === 'Navigation'
  },

  (combination) => {
    const index = _.findIndex(combination, {
      component: 'Highlights'
    })

    return index === -1 ||
      combination[index - 1].component === 'Jumbotron' ||
      combination[index - 1].component === 'Navigation'
  },

  // Don't render a combination of nothing, taking
  // Head into account.
  (combination) => {
    return combination.length > 1
  },

  {
    scope: [ 'Jumbotron' ],
    fn: (combination, routes, path) => {
      return path.length === 0 || !combination.some((element) => {
        return element.component === 'Jumbotron'
      })
    }
  },

  {
    scope: [ 'Users' ],
    fn: (combination, routes, path) => {
      return path.length === 0 || !combination.some((element) => {
        return element.component === 'Users'
      })
    }
  },

  {
    scope: [ 'Contributors' ],
    fn: (combination, routes, path) => {
      return path.length === 0 || !combination.some((element) => {
        return element.component === 'Contributors'
      })
    }
  },

  {
    scope: [ 'Highlights' ],
    fn: (combination, routes, path) => {
      return path.length === 0 || !combination.some((element) => {
        return element.component === 'Highlights'
      })
    }
  },

  {
    scope: [ 'Downloads' ],
    fn: (combination, routes, path) => {
      return path.length === 0 || !combination.some((element) => {
        return element.component === 'Downloads'
      })
    }
  },

  {
    scope: [ 'Faq' ],
    fn: (combination, routes, path) => {
      return path.length === 0 || !combination.some((element) => {
        return element.component === 'Faq'
      })
    }
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
    scope: [ 'Introduction' ],
    fn: (combination, routes, path) => {
      return path.length === 0 || !combination.some((element) => {
        return element.component === 'Introduction'
      })
    }
  },

  {
    scope: [ 'Motivation' ],
    fn: (combination, routes, path) => {
      return path.length === 0 || !combination.some((element) => {
        return element.component === 'Motivation'
      })
    }
  },

  {
    scope: [ 'HardwareRequired' ],
    fn: (combination, routes, path) => {
      return path.length === 0 || !combination.some((element) => {
        return element.component === 'HardwareRequired'
      })
    }
  },

  {
    scope: [ 'SoftwareRequired' ],
    fn: (combination, routes, path) => {
      return path.length === 0 || !combination.some((element) => {
        return element.component === 'SoftwareRequired'
      })
    }
  },

  {
    scope: [ 'Changelog' ],
    fn: (combination, routes, path) => {
      return path.includes('changelog') || !combination.some((element) => {
        return element.component === 'Changelog'
      })
    }
  },

  (combination) => {
    const navigationIndex = _.findIndex(combination, {
      component: 'Navigation'
    })

    const footerIndex = _.findIndex(combination, {
      component: 'Footer'
    })

    const viewerIndex = _.findIndex(combination, {
      component: 'DocViewer'
    })

    if (viewerIndex === -1) {
      return true
    }

    return viewerIndex > navigationIndex &&
      (viewerIndex < footerIndex || footerIndex === -1)
  },

  (combination) => {
    const navigationIndex = _.findIndex(combination, {
      component: 'Navigation'
    })

    const footerIndex = _.findIndex(combination, {
      component: 'Footer'
    })

    const listIndex = _.findIndex(combination, {
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
