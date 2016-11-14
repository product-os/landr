/* eslint-disable */
const features = [
  'test1',
  'test2'
]
module.exports = {
  globals: {
    sitename: "Etcher",
    siteurl: "http://etcher.io",
    description: "Flash OS images to SD cards & USB drives, safely and easily."
  },
  blocks: [
    {
      template: 'jumbotron',
      context: {
        title: 'hey',
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
