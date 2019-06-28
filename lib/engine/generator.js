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

const rfcd = require('rfdc')
const generatorics = require('generatorics')
const scoring = require('./scoring')
const ui = require('./ui')

/**
 * @summary Get all possible combinations of a set of components
 * @function
 * @public
 *
 * @param {Object[]} components - UI components
 * @param {Object} metadata - input metadata
 * @param {Object[]} routes - routes definitions
 * @param {String[]} path - route path
 * @param {Object} theme - theme definition
 */
exports.getCombinations = function *(components, metadata, routes, path, theme) {
  const products = components.map((component) => {
    return ui.getVariants(component, metadata, routes, path, theme)
  })

  // This clone instance is able to cache computation
  const cloner = rfcd({
    proto: false,
    circles: false
  })

  for (const product of generatorics.cartesian(...products)) {
    const filteredProduct = product.filter((element) => {
      return element.options && Object.keys(element.options).length > 0
    })

    const permutations = generatorics.permutation(filteredProduct)
    for (const permutation of permutations) {
      // We need to clone as the permutations module we use
      // mutates the arrays as it goes.
      yield cloner(permutation)
    }
  }
}

const passesRules = (combination, routes, path, rules) => {
  for (const rule of rules) {
    if (!rule(combination, routes, path)) {
      return false
    }
  }

  return true
}

/**
 * @summary Filter down invalid an redundant component combinations
 * @function
 * @public
 *
 * @param {Array[]} combinations - component combinations
 * @param {Function[]} rules - functional rules
 * @param {Object[]} routes - routes definitions
 * @param {String[]} path - route path
 * @returns {Array[]} filtered combinations
 */
exports.filterCombinations = (combinations, rules, routes, path) => {
  const accumulator = []
  for (const combination of combinations) {
    if (passesRules(combination, routes, path, rules)) {
      accumulator.push(combination)
    }
  }

  return accumulator.filter((combination, index) => {
    return !scoring.isExtraCombination(
      accumulator.slice(0, index), combination)
  })
}
