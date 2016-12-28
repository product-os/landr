'use strict';
const version = require('json-loader!./package.json').version;
const README = require('readme!./README.md');
console.log(README)
// grab the handlebar templates
const head = require('head');
const jumbotron = require('jumbotron');
const grid = require('grid');
const navbar = require('navbar');
const story = require('story');
const footer = require('footer');
const info = require('info');
const test = require('test');

// partials
const ghStarBtn = require('partials/github-star');
const btn = require('partials/button');
const link = require('partials/link');
const tweet = require('partials/btn-tweet');

// scripts
const gaScript = require('scripts/ga');
const go4SquaredScript = require('scripts/go4squared');
const typekitScript = require('scripts/typekit');
const githubButtonScript = require('scripts/github-buttons');

const features = [
  {
    title: 'Validated Burning',
    lead: 'No more writing images on corrupted cards and wondering why your device isn\'t booting.',
    image: require('www/images/feature.png')
  },
  {
    title: 'Hard Drive Friendly',
    lead: 'Makes drive selection obvious to avoid wiping your entire hard-drive',
    image: require('www/images/feature.png')
  },
  {
    title: 'Open Source',
    lead: 'Made with JS, HTML, node.js and Electron. Dive in and contribute!',
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
  },
  ghStarBtn({
    user: 'resin-io',
    repo: 'etcher'
  })
];

const content = [ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' ];

// Util classes
// http://v4-alpha.getbootstrap.com/utilities/spacing/

const blocks = [
  head({
    title: README.title,
    url: 'http://etcher.io',
    lead: README.lead,
    image: README.screenshot,
    favicon: require('www/images/etcher.ico')
  }),
  test(),
  navbar({
    // image: logo,
    title: README.title,
    items: navLinks,
    class: 'py-1 bg-inverse navbar-dark'
  }),
  jumbotron({
    title: 'easy peasy',
    lead: README.lead,
    image: README.screenshot,
    meta: `Latest version: ${version}`,
    description: btn({
      title: `Try ${README.title}`,
      href: '#downloads',
      class: 'btn-danger btn-lg'
    }),
    class: 'py-3 m-0 text-xs-center bg-inverse text-white'
  }),
  grid({
    title: 'Features',
    lead: README.description,
    items: features,
    itemsPerRow: 3,
    class: 'py-3 bg-faded'
  }),
  info({
    title: `Version <code>${version}</code> is out, spread the good news!&nbsp;&nbsp;${tweet({
      text: 'Landr! ',
      url: 'https://landr.io',
      size: 'small'
    })}`,
    class: 'pt-1 text-xs-center bg-faded'
  }),
  story({
    title: 'Why landr?',
    items: content,
    class: 'py-3 bg-inverse text-white'
  }),
  footer({
    // image: logo,
    meta: `Etcher is an open source project by ${link({
      text: 'resin.io',
      href: 'https://resin.io',
      class: 'text-white',
      target: '_blank'
    })} - Modern DevOps for the Industrial Internet of Things`,
    items: navLinks,
    class: 'py-3 bg-inverse text-white'
  }),
  gaScript({
    token: '1234'
  }),
  go4SquaredScript({
    token: '1234'
  }),
  typekitScript({
    token: 'lzw7tre'
  }),
  githubButtonScript()
];

module.exports = blocks.join('');
