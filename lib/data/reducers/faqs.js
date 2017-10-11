module.exports = (state = [], action) => {
  switch (action.type) {
    case `ADD_FAQ`: {
      if (action.payload) {
        return [...state, action.payload]
      }
      return state
    }
    default:
      return state
  }
}
