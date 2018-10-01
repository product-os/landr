const Promise = require('bluebird')
const Remark = Promise.promisifyAll(require('remark'))

const markdown = require('remark-parse');
const html = require('remark-html')
const slug = require('remark-slug');
const highlight = require('remark-highlight.js')
const headings = require('remark-autolink-headings');

const remark = Remark()
  .use(markdown)
  .use(slug)
  .use(headings)
  .use(highlight)
  .use(html)

const md = Promise.promisify(remark.process)

module.exports = {
  middleware: (store, action, next) => {
    if (action.payload.markdown) {
      return md(action.payload.markdown).then(vfile => {
        const payload = {
          ...action.payload,
          html: vfile.contents
        }
        delete payload.markdown
        return next({
          ...action,
          payload
        })
      })
    }
    return next(action)
  }
}
