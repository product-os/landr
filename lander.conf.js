/* eslint-disable */
const version = require("json-loader!./package.json").version

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
    OS: 'Mac',
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

// // grab the handlebar templates
const head = require('head.handlebars')
const jumbotron = require('jumbotron.handlebars')
const grid = require('grid.handlebars')
const navbar = require('navbar.handlebars')
const table = require('table.handlebars')


// http://v4-alpha.getbootstrap.com/utilities/spacing/
const blocks = [
  head({
    title: "Etcher",
    url: "http://etcher.io",
    lead: "Flash OS images to SD cards & USB drives, safely and easily.",
    image: require('www/images/interface.png')
  }),
  navbar({
    image: require('www/images/logo.png'),
    items: navLinks,
    class: 'bg-grey'
  }),
  jumbotron({
    title: "Burn. Better.",
    lead: "Flash OS images to SD cards & USB drives, safely and easily.",
    image: require('www/images/product.gif'),
    meta: `Latest version: ${version}`,
    action: {
      text: 'Try Etcher',
      href: '#downloads'
    },
    class: 'py-3 m-0 text-xs-center bg-grey'
  }),
  grid({
    title: 'Features',
    lead: 'We are actively maintaining etcher to consistently debug & improve',
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
  })
]

module.exports = {
  blocks: blocks
}
