module.exports = (state = {}, action) => {
  switch (action.type) {
    case `ADD_CONFIG`: {
      return Object.assign({}, state, action.payload)
    }
    default:
      return state
  }
}
