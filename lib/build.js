/* eslint-disable */
'use strict';
const Metalsmith  = require('metalsmith');
const markdown    = require('metalsmith-markdown');
const layouts     = require('metalsmith-layouts');
const permalinks  = require('metalsmith-permalinks');
const inplace     = require('metalsmith-in-place');
const handlebars = require('handlebars');
const serve = require('metalsmith-serve');

handlebars.registerHelper('eachJson', function(context, options) {
  context = JSON.parse(context)
  var ret = "";

  for(var i=0, j=context.length; i<j; i++) {
    ret = ret + options.fn(context[i]);
  }

  return ret;
});

module.exports = (config) => {
  return Metalsmith(__dirname)
  .metadata(config.globals)
  .source('contents')
  .destination('../build')
  .clean(false)
  .use(inplace({
    engine: 'handlebars',
    pattern: '**/*.html',
    partials: 'partials'
  }))
  .use(markdown())
  .use(permalinks())
  .use(layouts({
    engine: 'handlebars',
    default: 'layout.html',
    partials: 'partials'
  }))
  .use(serve())
  .build(function(err, files) {
    if (err) { throw err; }
  });
}
