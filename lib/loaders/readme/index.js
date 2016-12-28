'use strict';

/**
 * @module loaders.readme
 */

const md = require('./md');
const helpers = require('./helpers');
const _ = require('lodash');

module.exports = function(source) {
  this.cacheable();
  const tree = md.parse(source, {});
  // console.log(tree);

  const obj = {
    title: helpers.filterByTag(tree, 'h1'),
    lead: helpers.filterByTag(tree, 'p')[0],
    description: helpers.filterByTag(tree, 'p')[1],
    logo: helpers.imageByAlt(tree, 'logo'),
    screenshot: helpers.imageByAlt(tree, 'screenshot'),
    sections: helpers.divideByTag(tree, 'h2')
  };

  return 'module.exports = ' + JSON.stringify(obj);
};
