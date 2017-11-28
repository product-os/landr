import path from 'path'

const containers = path.resolve(`${__dirname}/pages`)

export default {
  getRoutes: ({ siteProps }) => {
    return [
      {
        path: '/',
        title: 'Home',
        component: `${containers}/Home`
      },
      {
        path: '/changelog',
        title: 'Changelog',
        component: `${containers}/Changelog`
      },
      {
        component: `${containers}/Docs`,
        title: 'Docs',
        path: '/docs',
        children: siteProps.docs.map(doc => {
          return {
            component: `${containers}/Doc`,
            title: doc.title,
            path: `/${doc.slug}`
          }
        })
      },
      {
        is404: true,
        path: '',
        component: `${containers}/404`
      }
    ]
  }
}
