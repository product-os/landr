const fs = require('fs-jetpack')
const Promise = require('bluebird')
const path = require('path')

const Remark = Promise.promisifyAll(require('remark'))
const html = require('remark-html')
const remark = Remark().use(html)
const md = Promise.promisify(remark.process)

module.exports = async ({ store, actions }) => {
  const docsDir = `${store.getState().config.dir}/docs`
  const fileList = await fs.list(docsDir)
  const mdFiles = fileList.filter(fileName => fileName.includes('.md'))

  const docs = await Promise.reduce(
    mdFiles,
    (acc, fileName) => {
      return fs
        .readAsync(`${docsDir}/${fileName}`, 'utf8')
        .then(md)
        .then(vFile => {
          acc[path.parse(fileName).name.toLowerCase()] = vFile.contents
          return acc
        })
    },
    {}
  )

  actions.addLocals({ docs })
}
