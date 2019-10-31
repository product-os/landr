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

const isEqual = require('lodash/isEqual')
const util = require('util')

/**
 * @summary Get the path array corresponding to a route
 * @function
 * @public
 *
 * @param {Object} route - route definition
 * @returns {String[]} route path
 */
exports.getPath = (route) => {
  return route.path
}

/**
 * @summary Get the context object corresponding to a route
 * @function
 * @public
 *
 * @param {Object} route - route definition
 * @returns {Object} route context
 */
exports.getContext = (route) => {
  return route.context || {}
}

/**
 * @summary Find a route object by path in an array of routes
 * @function
 * @public
 *
 * @param {Object[]} routes - routes array
 * @param {String[]} path - route path
 * @returns {(Null|Object)} route definition
 */
exports.findRouteByPath = (routes, path) => {
  // The former seems to be faster, if available
  const deepEqual = util.isDeepStrictEqual || isEqual

  for (const route of routes) {
    if (deepEqual(exports.getPath(route), path)) {
      return route
    }
  }

  return null
}

/**
 * @summary Get the URI version of a route path
 * @function
 * @public
 *
 * @param {String[]} path - route path
 * @returns {String} URI path
 */
exports.getUriPath = (path) => {
  return `/${path.join('/')}`
}
