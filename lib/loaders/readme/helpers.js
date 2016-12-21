
'use strict'
const _ = require('lodash')
const reg = require('./regex')

const _extractContent = function *(tokens, index) {
  let content = _.find(tokens, 'content', index).content
  yield content
}

const byType = function(tokens, type) {
  let arr = []
  let index = 0
  while (index != -1) {
    index = _.findIndex(tokens, function(t) {
      if (t.type === type)
        return t
    }, index)
    if (index != -1) {
      arr.push(_extractContent(tokens, index).next().value)
      index = index+1
    }
  }
  return arr
}

const imageByAlt = function(tokens, alt) {
  const logo = _.find(tokens, function(t) {
    const regx = new RegExp(`\\!\\[(${alt})\\]`, 'gi');
    return t.content.match(regx)
  })
  if (logo) {
    return logo.content.toLowerCase().match(reg.href)[0]
  }
}

const getNav = function(tokens) {
  const links = _.find(tokens, function(t) {
    if (t.content.indexOf('nav-') > -1) {
      return t
    }
  })
  return byType(links.children, 'link_open')
}

module.exports = {
  byType: byType,
  imageByAlt: imageByAlt,
  getNav: getNav
}
