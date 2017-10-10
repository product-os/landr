module.exports = (state = {}, action) => {
  switch (action.type) {
    case `ADD_REPOSITORY`: {
      return Object.assign({}, state, action.payload)
    }
    default:
      return state
  }
}
