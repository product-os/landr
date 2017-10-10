const fs = require('fs-jetpack')
const Promise = require('bluebird')
const path = require('path')

const Remark = Promise.promisifyAll(require('remark'))
const html = require('remark-html')
const remark = Remark().use(html)
const md = Promise.promisify(remark.process)

module.exports = async ({ dir, actions }) => {
  return fs
    .readAsync(`${dir}/CHANGELOG.md`, 'utf8')
    .then(md)
    .then(vfile => vfile.contents)
    .then(html => {
      actions.addChangelog({
        html
      })
    })
}
