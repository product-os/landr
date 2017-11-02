const Promise = require('bluebird')
const mapValues = require('lodash/mapValues')

module.exports = (store, action, next) => {
  mapValues(action.payload, v => {
    if (p instanceof Promise) {
      store.dispatch({
        type: 'ADD_PROMISE',
        payload: p
      })
    }
  })
  return next(action)
}
