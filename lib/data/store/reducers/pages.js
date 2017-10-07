const findIndex = require('lodash/findIndex')

module.exports = (state = [], action) => {
  switch (action.type) {
    case `ADD_PAGE`: {
      const index = findIndex(state, p => p.path === action.payload.path)
      if (index !== -1) {
        return [
          ...state
            .slice(0, index)
            .concat(action.payload)
            .concat(state.slice(index + 1)),
        ]
      } else {
        return [...state.concat(action.payload)]
      }
    }
    default:
      return state
  }
}
