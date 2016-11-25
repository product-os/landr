/* eslint-disable */
const features = [
  {
    title: 'feature A',
    lead: 'New stuff',
    template: 'item',
    image: 'mmm'
  },
  {
    title: 'feature B',
    lead: 'New stuffs',
    template: 'item',
    image: 'mmm'
  }
]

const navLinks = [
  {
    text: 'Chat on gitter',
    href: 'https://gitter.im/resin-io/etcher',
    template: 'nav-bar-item'
  },
  {
    text: 'Repository',
    href: 'https://github.com/resin-io/etcher',
    template: 'nav-bar-item'
  }
]

module.exports = {
  global: {
    sitename: "Etcher",
    siteurl: "http://etcher.io",
    lead: "Flash OS images to SD cards & USB drives, safely and easily."
  },
  blocks: [
    {
      template: 'nav-bar',
      context: {
        items: navLinks,
        class: 'p-3'
      }
    },
    {
      template: 'jumbotron',
      context: {
        action: {
          text: 'Try Etcher',
          href: '/#downloads'
        },
        class: 'p-3'
      }
    },
    {
      template: 'grid',
      context: {
        title: 'Features',
        lead: 'We do all the things',
        items: features,
        class: 'p-3'
      }
    }
  ]
};
