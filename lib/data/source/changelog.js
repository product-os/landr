const fs = require('fs-jetpack')
const Promise = require('bluebird')
const path = require('path')

const Remark = Promise.promisifyAll(require('remark'))
const html = require('remark-html')
const remark = Remark()
  .use(html)
const md = Promise.promisify(remark.process)

module.exports = async (gitDir) => {
  return fs.readAsync(`${gitDir}/CHANGELOG.md`, 'utf8')
  .then(md)
  .then(vfile => vfile.contents)
}
