module.exports = {
  createPages: ({
    store,
    actions
  }) => {
    const pages = Object.keys(store.getState().locals.docs).map((key) => {
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

    pages.map(actions.addPage)
  }
}
