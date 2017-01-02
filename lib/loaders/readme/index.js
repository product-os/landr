'use strict';

/**
 * @module loaders.readme
 */

const md = require('./md');
const helpers = require('./helpers');
const loaderUtils = require('loader-utils');

/**
* @summary Runs WebpackDevServer for supplied compiler
* @function
* @public
*
* @param {String} source - A README.markdown string
* @returns {Object} - Returns an object with extracted properties from the markdown
*
* @example
* const README = require('readme?delimiterTag=h2!./README.md');
* console.log(README)
*/

module.exports = function(source) {
  const query = loaderUtils.parseQuery(this.query);
  this.cacheable();
  const tree = md.parse(source, {});

  const obj = {
    title: helpers.filterByTag(tree, 'h1')[0],
    lead: helpers.filterByTag(tree, 'p')[0],
    description: helpers.filterByTag(tree, 'p')[1],
    logo: helpers.imageByAlt(tree, 'logo'),
    screenshot: helpers.imageByAlt(tree, 'screenshot'),
    sections: helpers.divideByTag(tree, query.delimiterTag)
  };

  return 'module.exports = ' + JSON.stringify(obj);
};
