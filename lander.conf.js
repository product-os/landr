'use strict';
const version = require('json-loader!./package.json').version;
const logo = require('www/images/logo.png');
const README = require('readme!./README.md');

// grab the handlebar templates
const head = require('head.handlebars');
const jumbotron = require('jumbotron.handlebars');
const grid = require('grid.handlebars');
const navbar = require('navbar.handlebars');
const story = require('story.handlebars');
const table = require('table.handlebars');
const footer = require('footer.handlebars');
const info = require('info.handlebars');

// partials
const ghStarBtn = require('partials/github-star.handlebars');
const btn = require('partials/button.handlebars');
const link = require('partials/link.handlebars');
const tweet = require('partials/btn-tweet.handlebars');

// scripts
const gaScript = require('scripts/ga.handlebars');
const go4SquaredScript = require('scripts/go4squared.handlebars');
const mixpanelScript = require('scripts/mixpanel.handlebars');
const typekitScript = require('scripts/typekit.handlebars');
const githubButtonScript = require('scripts/github-buttons.handlebars');

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
    lead: `50% faster burns, simultaneous writing for multiple drives. View our ${link({
      text: 'roadmap',
      href: 'https://github.com/resin-io/etcher/milestones',
      class: 'text-white',
      target: '_blank'
    })}`,
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
  navbar({
    image: logo,
    items: navLinks,
    class: 'py-1 bg-inverse navbar-dark'
  }),
  jumbotron({
    title: 'Burn. Better.',
    lead: README.lead,
    image: README.screenshot,
    meta: `Latest version: ${version}`,
    button: btn({
      title: `Try ${README.title}`,
      href: '#downloads',
      class: 'btn-primary btn-lg'
    }),
    class: 'py-3 m-0 text-xs-center bg-inverse text-white'
  }),
  grid({
    title: 'Features',
    lead: README.description,
    items: features,
    itemsPerRow: 3,
    class: 'py-3 bg-blue'
  }),
  info({
    title: `Version ${version} is out, spread the good news!&nbsp;&nbsp;${tweet({
      text: 'Meet Etcher by @resin_io an awesome new way to write SD cards. Give it a shot and you\'ll never go back!',
      url: 'https://etcher.io',
      size: 'small'
    })}`,
    class: 'pt-1 text-xs-center bg-faded'
  }),
  story({
    title: 'Why Etcher',
    items: content,
    class: 'py-3 bg-inverse text-white'
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
  mixpanelScript({
    token: '9d6bc43e4d64eb3bd64922c969e2955f'
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
