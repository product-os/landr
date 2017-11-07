const fs = require('fs-jetpack')
const Promise = require('bluebird')
const path = require('path')

module.exports = {
  init: async ({ dir, actions }) => {
    return fs.readAsync(`${dir}/CHANGELOG.md`, 'utf8').then(markdown => {
      if (markdown) {
        actions.addChangelog({
          markdown
        })
      }
    })
  },
  reducers: {
    changelog: (state = {}, action) => {
      switch (action.type) {
        case `ADD_CHANGELOG`: {
          return Object.assign({}, state, action.payload)
        }
        default:
          return state
      }
    }
  },
  actions: {
    addChangelog: (payload) => {
      return {
        type: 'ADD_CHANGELOG',
        payload
      }
    }
  }
}
