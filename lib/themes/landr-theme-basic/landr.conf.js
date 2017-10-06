module.exports = {
  createPages: (data) => {
    return Object.keys(data.docs).map((key) => {
      return {
        path: `/docs/${key}/`,
        component: 'Docs'
      }
    }).concat([
      {
        path: `/`,
        exact: true,
        component: 'Index'
      },
      {
        path: `/changelog`,
        component: 'Changelog'
      }
    ])
  }
}
