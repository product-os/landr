'use strict';
const version = require('./package.json').version;
const README = require('readme?delimiterTag=h2!./README.md');

// templates
const head = require('head');
const jumbotron = require('jumbotron');
const grid = require('grid');
const navbar = require('navbar');
const footer = require('footer');
const info = require('info');
const section = require('section');

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
    title: 'Feature 1',
    lead: 'Lorem ipsum dolor sit amet, cum erat audire te, at qui harum timeam. Dicat repudiandae ad cum. Cum ei libris volutpat, iisque mediocrem ea pri, delicata dissentiet te usu.',
    image: require('www/images/feature.png')
  },
  {
    title: 'Feature 2',
    lead: 'Lorem ipsum dolor sit amet, cum erat audire te, at qui harum timeam. Dicat repudiandae ad cum. Cum ei libris volutpat, iisque mediocrem ea pri, delicata dissentiet te usu.',
    image: require('www/images/feature.png')
  },
  {
    title: 'Feature 3',
    lead: 'Lorem ipsum dolor sit amet, cum erat audire te, at qui harum timeam. Dicat repudiandae ad cum. Cum ei libris volutpat, iisque mediocrem ea pri, delicata dissentiet te usu.',
    image: require('www/images/feature.png')
  }
];

const navLinks = [
  {
    text: 'Chat on gitter',
    href: 'https://gitter.im/resin-io/landr'
  },
  {
    text: 'Repository',
    href: 'https://github.com/resin-io/landr'
  },
  ghStarBtn({
    user: 'resin-io-playground',
    repo: README.title
  })
];

// Util classes
// http://v4-alpha.getbootstrap.com/utilities/spacing/

const blocks = [
  head({
    title: README.title,
    url: 'https://landr.io',
    lead: README.lead,
    image: README.screenshot,
    favicon: require('www/images/favicon.ico')
  }),
  navbar({
    title: README.title,
    items: navLinks,
    class: 'py-1 bg-faded navbar-light'
  }),
  jumbotron({
    title: README.lead,
    lead: README.description,
    image: README.logo,
    meta: `Latest version: ${version}`,
    description: btn({
      title: `Try ${README.title}`,
      href: `#${README.sections[0].title}`,
      class: 'btn-primary btn-lg'
    }),
    class: 'py-3 m-0 bg-faded text-xs-center'
  }),
  section({
    title: README.sections[0].title,
    content: README.sections[0].content,
    id: README.sections[0].title,
    class: 'py-3 text-xs-center'
  }),
  grid({
    title: 'Features',
    items: features,
    itemsPerRow: 3,
    class: 'py-3 bg-inverse text-white'
  }),
  info({
    title: `Version <code>${version}</code> is out, spread the good news!&nbsp;&nbsp;${tweet({
      text: README.title + ' - ' + README.lead,
      url: 'https://landr.io',
      size: 'small'
    })}`,
    class: 'pt-1 text-xs-center text-white bg-inverse'
  }),
  section({
    title: README.sections[3].title,
    content: README.sections[3].content,
    class: 'py-3 bg-faded text-xs-center'
  }),
  footer({
    meta: `${README.title} is an open source project by ${link({
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
