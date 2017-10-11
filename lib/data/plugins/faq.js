const fs = require('fs-jetpack')
const Promise = require('bluebird')
const path = require('path')

const Remark = Promise.promisifyAll(require('remark'))
const html = require('remark-html')
const remark = Remark().use(html)
const md = Promise.promisify(remark.process)
const parserByHeading = require('./utils/parseByHeading')

module.exports = async ({ dir, actions }) => {
  return fs
    .readAsync(`${dir}/FAQ.md`, 'utf8')
    .then(contents => {
      if (!contents) {
        return;
      }
      return parserByHeading(contents, 2).map(actions.addFAQ)
    })
    .catch((err) => {
      console.log(err)
    })
}
