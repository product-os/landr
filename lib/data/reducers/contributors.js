module.exports = (state = [], action) => {
  switch (action.type) {
    case `ADD_CONTRIBUTOR`: {
      if (action.payload) {
        return [...state, action.payload]
      }
      return state
    }
    default:
      return state
  }
}
