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

const router = require('./router')

/**
 * @summary Instantiate all the variants of a component
 * @function
 * @public
 *
 * @param {Object} component - component definition
 * @param {Object} metadata - input metadata
 * @param {Object[]} routes - routes definition
 * @param {String[]} path - current route path
 * @param {Object} [options] - options
 * @returns {Object[]} variants
 */
exports.getVariants = (component, metadata, routes, path, options = {}) => {
  const route = router.findRouteByPath(routes, path)
  if (!route) {
    return []
  }

  const context = router.getContext(route)
  const variants = component.variants(
    metadata,
    context,
    route,
    routes,
    options
  )

  // Always consider "no options", which is semantically
  // the same as omitting the component

  return [
    ...variants.filter((variant) => {
      return Object.keys(variant).length > 0
    }),
    null
  ].map((variant, index) => {
    return {
      component: component.name,
      rank: index + 1,
      options: variant
    }
  })
}
