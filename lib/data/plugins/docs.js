const fs = require('fs-jetpack')
const Promise = require('bluebird')
const path = require('path')

const upperFirst = require('lodash/upperFirst')
const humanize = require('underscore.string/humanize')

const init = async ({ dir, actions }) => {
  const docsDir = `${dir}/docs`
  const fileList = await fs.list(docsDir)
  const mdFiles = fileList.filter(fileName => fileName.includes('.md'))
  const docs = await Promise.reduce(
    mdFiles,
    (acc, fileName) => {
      return fs.readAsync(`${docsDir}/${fileName}`, 'utf8').then(markdown => {
        acc.push({
          slug: path.parse(fileName).name.toLowerCase(),
          title: upperFirst(humanize(path.parse(fileName).name)),
          markdown
        })
        return acc
      })
    },
    []
  )

  docs.map(actions.addDoc)
}

function addDoc(payload) {
  return {
    type: 'ADD_DOC',
    payload
  }
}

module.exports = {
  init,
  reducers: {
    docs: (state = [], action) => {
      switch (action.type) {
        case `ADD_DOC`: {
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
    addDoc
  }
}
