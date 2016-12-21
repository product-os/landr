'use strict';

const version = require('json-loader!./package.json').version;
const logo = require('www/images/logo.png');
const README = require('readme!./README.md');

const features = [
  {
    title: 'Validated Burning',
    lead: 'No more writing images on corrupted cards and wondering why your device isn\'t booting.',
    image: require('www/images/validated-burning.png')
  },
  {
    title: 'Hard Drive Friendly',
    lead: 'Makes drive selection obvious to avoid wiping your entire hard-drive',
    image: require('www/images/hard-drive.png')
  },
  {
    title: 'Open Source',
    lead: 'Made with JS, HTML, node.js and Electron. Dive in and contribute!',
    image: require('www/images/open-source.png')
  },
  {
    title: 'Cross Platform',
    lead: 'Works for everyone,</br> no more complicated install instructions.',
    image: require('www/images/x-platform.png')
  },
  {
    title: 'Beautiful Interface',
    lead: 'Who said burning SD cards has to be an eyesore.',
    image: require('www/images/simple.png')
  },
  {
    title: 'More on the way',
    lead: '50% faster burns, simultaneous writing for multiple drives. View our <a href="https://github.com/resin-io/etcher/milestones">roadmap</a>',
    image: require('www/images/feature.png')
  }
];

const navLinks = [
  {
    text: 'Chat on gitter',
    href: 'https://gitter.im/resin-io/etcher'
  },
  {
    text: 'Repository',
    href: 'https://github.com/resin-io/etcher'
  }
];

const baseURL = 'https://resin-production-downloads.s3.amazonaws.com/etcher/';

const downloads = [
  {
    Release: `${baseURL}${version}/Etcher-${version}-darwin-x64.dmg`,
    OS: 'OS X',
    Architecture: 'x64 (64-bit)'
  },
  {
    Release: `${baseURL}${version}/Etcher-${version}-linux-x64.zip`,
    OS: 'Linux',
    Architecture: 'x64 (64-bit)'
  },
  {
    Release: `${baseURL}${version}/Etcher-${version}-linux-x86.zip`,
    OS: 'Linux',
    Architecture: 'x86 (32-bit)'
  },
  {
    Release: `${baseURL}${version}/Etcher-${version}-win32-x64.exe`,
    OS: 'Windows',
    Architecture: 'x64 (64-bit)'
  },
  {
    Release: `${baseURL}${version}/Etcher-${version}-win32-x64.zip`,
    OS: 'Windows',
    Architecture: 'x64 (64-bit)'
  },
  {
    Release: `${baseURL}${version}/Etcher-${version}-win32-x86.exe`,
    OS: 'Windows',
    Architecture: 'x86 (32-bit)'
  },
  {
    Release: `${baseURL}${version}/Etcher-${version}-win32-x86.zip`,
    OS: 'Windows',
    Architecture: 'x86 (32-bit)'
  }
];

const content = [ 'Here at <a href="https://resin.io" target="_blank">resin.io</a> we have thousands of users working through our getting started process and until recently we were embarassed about the steps that involved burning an SD card. There was a separate track for each Mac/Windows/Ubuntu and several manual and error prone steps along the way.', 'To our surprise there was nothing out there that fitted our needs. So we built Etcher, a SD card burner app that is simple for end users, extensible for developers, and works on any platform.' ];

// grab the handlebar templates
const head = require('head.handlebars');
const jumbotron = require('jumbotron.handlebars');
const grid = require('grid.handlebars');
const navbar = require('navbar.handlebars');
const story = require('story.handlebars');
const table = require('table.handlebars');
const footer = require('footer.handlebars');

const gaScript = require('scripts/ga.handlebars');
const go4SquaredScript = require('scripts/go4squared.handlebars');
const mixpanelScript = require('scripts/mixpanel.handlebars');
const typekitScript = require('scripts/typekit.handlebars');
// Add classes control spacing
// http://v4-alpha.getbootstrap.com/utilities/spacing/

const blocks = [
  head({
    title: README.title,
    url: 'http://etcher.io',
    lead: README.lead,
    image: require('www/images/interface.png')
  }),
  navbar({
    image: logo,
    items: navLinks,
    class: 'bg-grey'
  }),
  jumbotron({
    title: 'Burn. Better.',
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
  story({
    title: 'Why Etcher',
    items: content,
    class: 'py-3 bg-grey'
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
    lead: 'Etcher is an open source project by resin.io - Modern DevOps for the Industrial Internet of Things',
    description: 'Made with love by resin.io',
    items: navLinks,
    class: 'py-3 bg-grey'
  }),
  // gaScript({
  //   token: '1234'
  // }),
  // mixpanelScript({
  //   token: '1234'
  // }),
  // go4SquaredScript({
  //   token: '1234'
  // }),
  typekitScript({
    token: 'lzw7tre'
  })
];

module.exports = blocks.join('');
