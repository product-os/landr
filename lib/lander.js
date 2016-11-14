/* eslint-disable */
'use strict';
const build = require('./build');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require("fs"))

module.exports.build = (config) => {
  return fs.writeFileAsync(__dirname + '/contents/index.html', parseBlocks(config.blocks)).then(() => {
    return build(config)
  })
}

const parseBlocks = (blocks) => {
  return blocks.reduce((accumulator, b) => {
    return `${accumulator} {{> ${b.template} ${parseContext(b.context)} }}`
  }, '')
}

const parseContext = (context) => {
  return Object.keys(context).reduce((accumulator, key) => {
    return `${accumulator} ${key}='${ typeof context[key] === 'string' ? context[key]: JSON.stringify(context[key]) }'`
  }, '')
}

module.exports.serve = (config) => {
  return 'serving'
}
