const Promise = require('bluebird')
const redux = require('redux')
const debug = require('debug')('store')
const defaultPlugins = require('./plugins')
const isObject = require('lodash/isObject')
const path = require('path')
const GitInfo = require('gitinfo')
/**
 * Seperate plugins into objects redux cares about like actions, reducers, middleware
 * @param {Array} fns - Array of async functions to execute
 * @returns {Object} - Object contains ingredients for the redux store
 */
const registerPlugins = (plugins) => {
  return plugins.reduce((acc, plugin) => {
    if (isObject(plugin.actions)) {
      Object.keys(plugin.actions).map(key => {
        acc.actions[key] = plugin.actions[key]
      })
    }

    if (isObject(plugin.reducers)) {
      Object.keys(plugin.reducers).map(key => {
        acc.reducers[key] = plugin.reducers[key]
      })
    }

    plugin.middleware && acc.middleware.push(plugin.middleware)
    plugin.init && acc.init.push(plugin.init)
    return acc
  }, {
    actions: {},
    middleware: [],
    reducers: {},
    init: []
  })
}

/**
 * Run all plugin.init functions
 * @param {Array<Function>} fns - Array of async functions to execute
 * @returns {Array<Promise>}
 */
const pluginRunner = (fns, dir, gitInfo, actions) => {
  return Promise.map(fns, fn => {
    return fn({ dir, gitInfo, actions })
  })
}

/**
 * Prepare middleware with an async wrapper
 * so one can determine when all middleware has executed.
 * @param {Function} fn - middlware function to execute
 */
const middlewareCreate = fn => store => next => action => {
  // wrap each action creator so they can return a promise,
  // then store each promise, so we can wait until all middleware is resolved before returning
  if (action.type !== 'ADD_PROMISE') {
    store.dispatch({
      type: 'ADD_PROMISE',
      payload: Promise.resolve(fn(store, action, next))
    })
  }
}

/**
 * @namespace
 * @property {String}  gitPath        - Path to the .git directory the collector should run against.
 * @property {Array<Object>} plugins  - The plugins the collector should run.
*/
/**
 * Run the collector
 * @param {string} dir
 * @param {string} plugins
 */
module.exports = async (gitPath, plugins = []) => {
  // 1. init Store with options
  // 2. run plugins
  // 3. return store
  const gitInfo = GitInfo({
    gitPath: gitPath,
    defaultBranchName: 'master'
  })

  const rootDir = path.resolve(`../${gitPath}`)

  const {
    actions,
    reducers,
    middleware,
    init
  } = registerPlugins([
    ...defaultPlugins,
    ...plugins
  ])

  try {
    const middlewares = redux.applyMiddleware(
      ...middleware.map(middlewareCreate)
    )

    const store = redux.createStore(
      redux.combineReducers(reducers),
      {},
      middlewares
    )

    const boundActions = redux.bindActionCreators(
      actions,
      store.dispatch
    )
    // run all plugin.init functions
    await pluginRunner(init, rootDir, gitInfo, boundActions)
    // wait for all middleware to resolve
    await Promise.all(store.getState().promises)
    return store.getState()
  } catch (error) {
    throw error
  }
}
