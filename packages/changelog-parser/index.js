'use strict';

/**
 * @module loaders.readme
 */

const md = require('md-parser-utils').md;
const helpers = require('md-parser-utils').helpers;
const _ = require('md-parser-utils').lodash

/**
* @summary Parses a readme source into object
* @function
* @public
*
* @param {String} source - A README.markdown string
* @example
* const README = require('readme-parser')(source);
* console.log(README)
*/

module.exports = function(source, depth) {
  const tree = md.parse(source, {});

  const entries = helpers.contentByDepth(tree, depth)

  return helpers.renderToHtml(entries)
};
