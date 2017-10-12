const fs = require('fs-jetpack')
const Promise = require('bluebird')
const path = require('path')

module.exports = async ({ dir, actions }) => {
  return fs
    .readAsync(`${dir}/CHANGELOG.md`, 'utf8')
    .then(markdown => {
      actions.addChangelog({
        markdown
      })
    })
}
