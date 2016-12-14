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
const jumbotron = require('jumbotron.handlebars')
const grid = require('grid.handlebars')
const navbar = require('navbar.handlebars')

// test custom
const custom = require('custom.handlebars')

// define some globals
const settings = {
  sitename: "Etcher",
  siteurl: "http://etcher.io",
  lead: "Flash OS images to SD cards & USB drives, safely and easily."
}

const blocks = [
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
      href: '/#downloads'
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
  settings: 'asdf',
  blocks: blocks,
  settings: settings
}
