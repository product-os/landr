const debug = require('debug')('store')
const reducers = require('./reducers')
const redux = require('redux')

module.exports = redux.createStore(redux.combineReducers(reducers), {})
