const { bindActionCreators } = require(`redux`)
const store = require('../')

function addLocals(payload) {
  return {
    type: 'ADD_LOCALS',
    payload
  }
}

function addMiddlware(payload) {
  return {
    type: 'ADD_MIDDLEWARE',
    payload
  }
}

function addConfig(payload) {
  return {
    type: 'ADD_CONFIG',
    payload
  }
}

function addPage(payload) {
  return {
    type: 'ADD_PAGE',
    payload
  }
}

const actions = {
  addLocals,
  addMiddlware,
  addConfig,
  addPage
}

module.exports = bindActionCreators(actions, store.dispatch)
