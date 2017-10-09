const clone = require('lodash/clone')

const defaultMiddleware = [
  require('../../source/git'),
  require('../../source/distDir'),
  require('../../source/changelog'),
  require('../../source/docs'),
  require('../../github')
]

module.exports = (state = defaultMiddleware, action) => {
  switch (action.type) {
    case `ADD_MIDDLEWARE`: {
      if (action.payload) {
        return [...state, action.payload]
      }
      return state
    }
    default:
      return state
  }
}
