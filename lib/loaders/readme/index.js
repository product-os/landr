// Cacheable identity loader
/* @flow weak */
'use strict';
/* eslint-disable */

/**
 * @module loaders.readme
 */

const _ = require('lodash')
const md = require('markdown-it')();
const helpers = require('./helpers')

module.exports = function(source) {
  this.cacheable()
  const tree = md.parse(source, {})
  // console.log(tree)

  const obj = {
    title: helpers.byType(tree, 'heading_open')[0],
    lead: helpers.byType(tree, 'paragraph_open')[0],
    description: helpers.byType(tree, 'paragraph_open')[1],
    logo: helpers.imageByAlt(tree, 'logo'),
    screenshot: helpers.imageByAlt(tree, 'screenshot')
  }

  return 'module.exports = ' + JSON.stringify(obj)
}
