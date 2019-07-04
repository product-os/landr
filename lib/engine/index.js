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
const generator = require('./generator')

module.exports = (metadata, routes, components, options, rules) => {
  const site = {}

  for (const route of routes) {
    const path = router.getPath(route)
    const combinations = generator.getCombinations(
      components, metadata, routes, path, options, rules)
    const validCombinations = generator.filterCombinations(
      combinations, rules, routes, path)

    // TODO: Be smarter when choosing between the
    // final valid combinations
    site[router.getUriPath(path)] = validCombinations[0]
  }

  return site
}
