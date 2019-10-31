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
const isEqual = require('lodash/isEqual')
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
 * @param {Object} options - variant options
 * @param {Function[]} rules - rules definitions
 */
exports.getCombinations = function *(components, metadata, routes, path, options, rules) {
  const products = components.reduce((accumulator, component) => {
    const variants = ui.getVariants(
      component, metadata, routes, path, options).filter((variant) => {
      /*
       * As an optimization, evaluate rules whose scope is just
       * the component we're dealing with, which could massively
       * reduce the cartesian product we need to do afterwards.
       */
      const matchingRules = rules.filter((rule) => {
        return rule.fn && isEqual(rule.scope, [ component.name ])
      })

      for (const matchingRule of matchingRules) {
        if (!matchingRule.fn([ variant ], routes, path)) {
          return false
        }
      }

      return true
    })

    if (variants.length === 1 && !variants[0].options) {
      return accumulator
    }

    if (variants.length > 0) {
      accumulator.push(variants)
    }

    return accumulator
  }, [])

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
    const fn = rule.fn || rule
    if (!fn(combination, routes, path)) {
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
