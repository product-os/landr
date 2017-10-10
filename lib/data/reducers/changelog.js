module.exports = (state = {}, action) => {
  switch (action.type) {
    case `ADD_CHANGELOG`: {
      return Object.assign({}, state, action.payload)
    }
    default:
      return state
  }
}
