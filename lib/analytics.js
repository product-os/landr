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

const noop = require('lodash/noop')
const typedErrors = require('typed-errors')

const INSTANCES = {}
const NOOP_INSTANCE = {
  track: noop
}

/*
 * The idea is that this file returns an object with certain functions
 *
 * such as ".track()" in order for components to perform analytics.
 * This could be a full-blown class, but passing class instances as
 * React props seems to be a problem.
 *
 * Most of the complexity here is because we want to "memoize" the
 * analytics object based on the provided options, so we don't
 * re-instantiate the library for every component in the page.
 */
module.exports = (site, options) => {
  if (!options) {
    return NOOP_INSTANCE
  }

  if (INSTANCES[options.type] &&
    INSTANCES[options.type][options.token]) {
    return INSTANCES[options.type][options.token]
  }

  if (options.type === 'mixpanel') {
    // Invalidate the "require" cache as the Mixpanel library
    // is stateful and would not allow us to have different
    // instances at the same time otherwise.
    Reflect.deleteProperty(require.cache,
      require.resolve('mixpanel-browser'))

    const mixpanel = require('mixpanel-browser')

    // See https://developer.mixpanel.com/docs/javascript-full-api-reference#section-mixpanel-init
    const mixpanelOptions = {}
    if (options.proxy) {
      mixpanelOptions.api_host = options.proxy
    }

    mixpanel.init(options.token, mixpanelOptions)
    INSTANCES[options.type] = INSTANCES[options.type] || {}
    INSTANCES[options.type][options.token] = {
      track: (event, data) => {
        data.site = site
        mixpanel.track(event, data)
      }
    }

    return module.exports(options)
  }

  throw new module.exports.InvalidAnalyticsProvider(
    `Unknown analytics provider: ${options.type}`)
}

module.exports.InvalidAnalyticsProvider =
  typedErrors.makeTypedError('InvalidAnalyticsProvider')
