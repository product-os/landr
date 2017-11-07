const fs = require('fs-jetpack')
const Promise = require('bluebird')
const path = require('path')
const parserByHeading = require('./utils/parseByHeading')

module.exports = {
  init: async ({ dir, actions }) => {
    return fs
      .readAsync(`${dir}/FAQ.md`, 'utf8')
      .then(contents => {
        if (!contents) {
          return
        }
        return parserByHeading(contents, 2).map(actions.addFAQ)
      })
      .catch(err => {
        console.log(err)
      })
  },
  reducers: {
    faqs: (state = [], action) => {
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
  },
  actions: {
    addFAQ: (payload) => {
      return {
        type: 'ADD_FAQ',
        payload
      }
    }
  }
}
