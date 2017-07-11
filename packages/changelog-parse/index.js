'use strict';

/**
 * @module loaders.readme
 */

const parserUtils = require('md-parser-utils');

const { md, helpers } = parserUtils;

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

  // console.log({entries, depth})

  const entries = helpers.contentByDepth(tree, depth);

  return helpers.renderToHtml(entries);
};
