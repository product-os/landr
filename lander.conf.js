/* eslint-disable */
const features = [
  {
    title: 'feature A',
    lead: 'New stuff'
  },
  {
    title: 'feature B',
    lead: 'Old stuff'
  }
]

const navLinks = [
  {
    text: 'Chat on gitter',
    href: 'https://gitter.im/resin-io/etcher'
  },
  {
    text: 'Repository',
    href: 'https://github.com/resin-io/etcher'
  }
]

// // grab the handlebar templates
const head = require('head.handlebars')
const jumbotron = require('jumbotron.handlebars')
const grid = require('grid.handlebars')
const navbar = require('navbar.handlebars')
const custom = require('custom.handlebars')

// define some globals
const settings = {
  title: "Etcher",
  url: "http://etcher.io",
  lead: "Flash OS images to SD cards & USB drives, safely and easily.",
  logo: require('www/images/logo.png')
}

const blocks = [
  head(settings),
  navbar({
    global: settings,
    image: require('www/images/logo.png'),
    items: navLinks,
  }),
  jumbotron({
    global: settings,
    image: require('www/images/feature.png'),
    action: {
      text: 'Try Etcher',
      href: '#downloads'
    },
    class: 'p-3'
  }),
  grid({
    global: settings,
    title: 'Features',
    lead: "We do all the stuff",
    items: features,
    class: 'p-3'
  }),
  custom()
]

module.exports = {
  blocks: blocks
}
