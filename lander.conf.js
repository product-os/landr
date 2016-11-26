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

// grab the handlebar templates
const jumbotron = require('lander/jumbotron.handlebars')
const grid = require('lander/grid.handlebars')
const navbar = require('lander/navbar.handlebars')

// test custom
const custom = require('landerCustom/custom.handlebars')

// define some globals
const site = {
  sitename: "Etcher",
  siteurl: "http://etcher.io",
  lead: "Flash OS images to SD cards & USB drives, safely and easily."
}

const blocks = [
  navbar({
    global: site,
    local: {
      items: navLinks
    }
  }),
  jumbotron({
    global: site,
    local: {
      action: {
        text: 'Try Etcher',
        href: '/#downloads'
      },
      class: 'p-3'
    }
  }),
  grid({
    global: site,
    local: {
      title: 'Features',
      lead: "We do all the stuff",
      items: features,
      class: 'p-3'
    }
  }),
  custom()
]

module.exports = blocks
