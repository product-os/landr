/* eslint-disable */
const async = require('async')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs-extra'))
const hbsHelpers = require('handlebars-helpers')

module.exports = (hbs) => {
  const cwd = process.cwd()
  const customPartials = fs.readdirSync(`${cwd}/.lander/partials`)
  const partials = fs.readdirSync(`${__dirname}/partials`)
  const fileNames = partials.concat(customPartials)

  // register helpers
  hbsHelpers({
    handlebars: hbs
  })

  // custom helpers
  // fallback allows you two pass two lets if the first is null it will
  // return the fallback reduces need for conditionals
  hbs.registerHelper('fallback', function(target, fallback) {
    if (target)
      return target
    else
      return fallback
  });

  hbs.registerHelper('let',function(name, value, context, fallback){
    this[name] = value || fallback
  });

  const getTemplate = (filename, cwd) => {
    return fs.readFileAsync(`${cwd}/partials/${filename}`, 'utf8').then(content => {
      resolve(contents)
    }).catch(err => {
      console.log(`no custom ${filename}`)
      return fs.readFileAsync(`${__dirname}/partials/${filename}`, 'utf8')
    }).then(content => {
      return content
    })
  }

  const ps = fileNames.map((fileName) => {
    return getTemplate(fileName, cwd).then(template => {
      return hbs.registerPartial(fileName.split('.')[0], template);
    })
  })

  return Promise.all(ps).then(function() {
    return hbs
  }).value();
}
