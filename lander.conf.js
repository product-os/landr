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
const jumbotron = require('lander/templates/jumbotron.handlebars')
const grid = require('lander/templates/grid.handlebars')
const navbar = require('lander/templates/navbar.handlebars')

// test custom
const custom = require('www/templates/custom.handlebars')

// define some globals
const site = {
  sitename: "Etcher",
  siteurl: "http://etcher.io",
  lead: "Flash OS images to SD cards & USB drives, safely and easily."
}

const echo = (string) => {
  return string
}

const blocks = [
  navbar({
    global: site,
    local: {
      image: require('www/images/logo.png'),
      items: navLinks
    }
  }),
  jumbotron({
    global: site,
    local: {
      image: require('www/images/feature.png'),
      action: {
        text: echo('Try Etcher'),
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
