const Promise = require('bluebird')
const find = Promise.promisifyAll(require('find'))
const changeLogEntries = async (gitDir) => {
  try {
    const files = await find.fileAsync(/CHANGELOG.md/, gitDir)
    console.log(files)
  } catch (error) {
    console.log(error)
  }
}

changeLogEntries(`/Users/gaudi/work/landr`)
