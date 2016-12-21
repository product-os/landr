/* eslint-disable */
'use strict'

const version = require("json-loader!./package.json").version
const logo = require('www/images/logo.png');
const README = require('readme!./README.md');

const features = [
  {
    title: 'Validated Burning',
    lead: "No more writing images on corrupted cards and wondering why your device isn't booting.",
    image: require('www/images/validated-burning.png')
  },
  {
    title: 'Hard Drive Friendly',
    lead: "Makes drive selection obvious to avoid wiping your entire hard-drive",
    image: require('www/images/hard-drive.png')
  },
  {
    title: 'Open Source',
    lead: "Made with JS, HTML, node.js and Electron. Dive in and contribute!",
    image: require('www/images/open-source.png')
  },
  {
    title: 'Cross Platform',
    lead: "Works for everyone,</br> no more complicated install instructions.",
    image: require('www/images/x-platform.png')
  },
  {
    title: 'Beautiful Interface',
    lead: "Who said burning SD cards has to be an eyesore.",
    image: require('www/images/simple.png')
  },
  {
    title: 'More on the way',
    lead: "50% faster burns, simultaneous writing for multiple drives. View our <a href='https://github.com/resin-io/etcher/milestones'>roadmap</a>",
    image: require('www/images/feature.png')
  },
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

const baseURL = 'https://resin-production-downloads.s3.amazonaws.com/etcher/'

const downloads = [
  {
    Release: `${baseURL}${version}/Etcher-${version}-darwin-x64.dmg`,
    OS: 'OS X',
    Architecture: 'x64 (64-bit)',
  },
  {
    Release: `${baseURL}${version}/Etcher-${version}-linux-x64.zip`,
    OS: 'Linux',
    Architecture: 'x64 (64-bit)',
  },
  {
    Release: `${baseURL}${version}/Etcher-${version}-linux-x86.zip`,
    OS: 'Linux',
    Architecture: 'x86 (32-bit)',
  },
  {
    Release: `${baseURL}${version}/Etcher-${version}-win32-x64.exe`,
    OS: 'Windows',
    Architecture: 'x64 (64-bit)',
  },
  {
    Release: `${baseURL}${version}/Etcher-${version}-win32-x64.zip`,
    OS: 'Windows',
    Architecture: 'x64 (64-bit)',
  },
  {
    Release: `${baseURL}${version}/Etcher-${version}-win32-x86.exe`,
    OS: 'Windows',
    Architecture: 'x86 (32-bit)',
  },
  {
    Release: `${baseURL}${version}/Etcher-${version}-win32-x86.zip`,
    OS: 'Windows',
    Architecture: 'x86 (32-bit)',
  }
]

// grab the handlebar templates
const head = require('head.handlebars')
const jumbotron = require('jumbotron.handlebars')
const grid = require('grid.handlebars')
const navbar = require('navbar.handlebars')
const table = require('table.handlebars')
const footer = require('footer.handlebars')

const gaScript = require('scripts/ga.handlebars')
const go4SquaredScript = require('scripts/go4squared.handlebars')
const mixpanelScript = require('scripts/mixpanel.handlebars')

// Add classes control spacing
// http://v4-alpha.getbootstrap.com/utilities/spacing/

const blocks = [
  head({
    title: README.title,
    url: "http://etcher.io",
    lead: README.lead,
    image: require('www/images/interface.png')
  }),
  navbar({
    image: logo,
    items: navLinks,
    class: 'bg-grey'
  }),
  jumbotron({
    title: "Burn. Better.",
    lead: README.lead,
    image: README.logo,
    meta: `Latest version: ${version}`,
    action: {
      text: `Try ${README.title}`,
      href: '#downloads'
    },
    class: 'py-3 m-0 text-xs-center bg-grey'
  }),
  grid({
    title: 'Features',
    lead: README.description,
    items: features,
    itemsPerRow: 3,
    class: 'py-3 bg-blue'
  }),
  table({
    id: 'downloads',
    title: 'Downloads',
    lead: `Latest version: ${version}`,
    data: downloads,
    class: 'py-3'
  }),
  footer({
    image: logo,
    lead: `Latest version: ${version}`,
    items: navLinks,
    class: 'py-3 bg-grey'
  }),
  gaScript({
    token: '1234'
  })
]

module.exports = blocks.join('')
