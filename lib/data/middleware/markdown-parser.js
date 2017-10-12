const Promise = require('bluebird')
const Remark = Promise.promisifyAll(require('remark'))
const html = require('remark-html')
const remark = Remark().use(html)
const md = Promise.promisify(remark.process)

module.exports = (store, action, next) => {
  if (action.payload.markdown) {
    return md(action.payload.markdown)
    .then(vfile => {
      const payload = {
        ...action.payload,
        html: vfile.contents
      }
      return next({
        ...action,
        payload
      })
    })
  }
  return next(action)
}
