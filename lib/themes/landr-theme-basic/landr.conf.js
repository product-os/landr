module.exports = {
  plugins: [
    {
      middleware: (store, action, next) => {
        if (action.type === 'ADD_DOC') {
          // create page for every doc
          store.dispatch({
            type: 'ADD_PAGE',
            payload: {
              path: `/docs/${action.payload.slug}`,
              component: 'Docs'
            }
          })
        }

        if (action.type === 'ADD_CHANGELOG') {
          store.dispatch({
            type: 'ADD_PAGE',
            payload: {
              path: `/changelog`,
              component: 'Changelog'
            }
          })
        }

        return next(action)
      }
    }
  ]
}
