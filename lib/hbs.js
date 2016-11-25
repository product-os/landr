/* eslint-disable */
const async = require('async')
const hbsHelpers = require('handlebars-helpers')
const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const registerHelpers = require('./helpers')

registerPartials = (dir, engine) => {
  files = fs.readdirSync(dir);
  _.map(files, (file) => {
    var fullPath = path.join(dir, file);
    stat = fs.statSync(fullPath);

    if(stat.isFile()) {
      var template = fs.readFileSync(fullPath, 'utf8');

      console.log('Loading Partial into Handlebars engine.');
      console.log('\tPartial Name Space: ' + path.basename(file, '.html'));
      console.log('\tFull Path to NameSpace: ' + fullPath);
      console.log('-----------------------------------------');
      engine.registerPartial(path.basename(file, '.html'), template);
    }
  })
}

module.exports = (hbs) => {
  const cwd = process.cwd()

  // register helpers
  hbsHelpers({
    handlebars: hbs
  })

  // register partials
  registerPartials(`${__dirname}/templates`, hbs)

  // custom helpers
  registerHelpers(hbs)

  return hbs
}
