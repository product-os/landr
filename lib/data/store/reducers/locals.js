const findIndex = require('lodash/findIndex')

module.exports = (state = {}, action) => {
  switch (action.type) {
    case `ADD_LOCALS`: {
      return Object.assign({}, state, action.payload)
    }
    default:
      return state
  }
}
