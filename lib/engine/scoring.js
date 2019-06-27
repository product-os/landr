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

/**
 * @summary Convert a combination into a data structure
 * optimized for score comparisons.
 * @function
 * @public
 *
 * @param {Object[]} combination - component combination
 * @returns {Object} score map
 */
exports.getScoreMap = (combination) => {
  const map = {}

  for (const element of combination) {
    if (typeof map[element.component] === 'number' &&
      element.rank <= map[element.component]) {
      continue
    }

    map[element.component] = element.rank
  }

  return map
}

/**
 * @summary Check if a score map is a subset of another
 * @function
 * @public
 *
 * @param {Object} map - score map
 * @param {Object} submap - potential score map
 * @returns {Boolean} whether `submap` is a submap of `map`
 */
exports.isScoreSubMap = (map, submap) => {
  for (const key of Object.keys(submap)) {
    if (!map[key]) {
      return false
    }

    if (map[key] > submap[key]) {
      return false
    }
  }

  return true
}

/**
 * @summary Check if a combination is "extra" given a set of combinations
 * @function
 * @public
 *
 * @param {Array[]} combinations - combinations
 * @param {Object[]} combination - combination
 * @returns {Boolean} whether `combination` is unnecessary in `combinations`
 */
exports.isExtraCombination = (combinations, combination) => {
  const scoreSubMap = exports.getScoreMap(combination)

  for (const element of combinations) {
    const scoreMap = exports.getScoreMap(element)
    if (exports.isScoreSubMap(scoreMap, scoreSubMap)) {
      return true
    }
  }

  return false
}
