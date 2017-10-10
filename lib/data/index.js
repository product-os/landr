const path = require('path')
const Promise = require('bluebird')
const redux = require('redux')
const lodash = require('lodash')
const debug = require('debug')('store')

const defaultReducers = require('./reducers')
const defaultActions = require('./actions')
const LANDR_DIR = path.resolve(`${__dirname}/..`)

const defaultPlugins = [
  require('./plugins/changelog'),
  require('./plugins/docs'),
  require('./plugins/github')
]

const apiRunner = (plugins, dir, actions) => {
  return Promise.map(plugins, fn => {
    return fn({ dir, actions })
  })
}

const middlewareCreate = fn => store => next => action => {
  return fn(store, action, next)
}

/**
 * @namespace
 * @property {object}  options                - The default values for parties.
 * @property {array}   options.reducers       - Array of custom redux reducers.
 * @property {array}   options.middleware     - Array of custom redux middleware in order of execution.
 * @property {array}   options.plugins        - Array of collector plugins that dispatch actions to store.
 * @property {array}   options.actions        - Object of action creators to be bound to store.dispatch
*/
/**
 * Run the collector
 * @param {string} dir
 * @param {string} options
 */
module.exports = async (dir, { reducers, middleware, actions, plugins }) => {
  // 1. get git dir
  // 2. get configs + add middleware functions
  // 3. run middleware functions
  // 4. run create pages
  // 5. return locals

  // 1. init Store with options
  // 2. run plugins
  // 3. return store

  try {
    const middlewares = redux.applyMiddleware(
      ...middleware.map(middlewareCreate)
    )
    const store = redux.createStore(
      redux.combineReducers({
        ...defaultReducers,
        ...reducers
      }),
      {},
      middlewares
    )

    const boundActions = redux.bindActionCreators(
      {
        ...defaultActions,
        ...actions
      },
      store.dispatch
    )

    await apiRunner(defaultPlugins, dir, boundActions)

    return store.getState()
  } catch (error) {
    throw error
  }
}
