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
module.exports = {
  global: {
    sitename: "Etcher",
    siteurl: "http://etcher.io",
    lead: "Flash OS images to SD cards & USB drives, safely and easily."
  },
  blocks: [
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
    },
    {
      template: 'test',
      context: {
        title: 'hpmmrf'
      }
    },
  ]
};
