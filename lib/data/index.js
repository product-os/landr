const Promise = require('bluebird')
const redux = require('redux')
const debug = require('debug')('store')
const defaultPlugins = require('./plugins')
const isObject = require('lodash/isObject')

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

const pluginRunner = (fns, dir, actions) => {
  return Promise.map(fns, fn => {
    return fn({ dir, actions })
  })
}

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
module.exports = async (dir, plugins) => {
  // 1. init Store with options
  // 2. run plugins
  // 3. return store
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

    await pluginRunner(init, dir, boundActions)
    await Promise.all(store.getState().promises)
    return store.getState()
  } catch (error) {
    throw error
  }
}
