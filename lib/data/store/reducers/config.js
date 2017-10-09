const intialState = {
  dev: process.env.NODE_ENV !== 'production'
}

module.exports = (state = intialState, action) => {
  switch (action.type) {
    case `ADD_CONFIG`: {
      return Object.assign({}, state, action.payload)
    }
    default:
      return state
  }
}
