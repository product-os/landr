import PageComponents from './pages'
import Layout from 'components/Layout'

export default (pages) => {
  return [
    { component: Layout,
      routes: pages.map(p => {
        return {
          path: p.path,
          exact: Boolean(p.exact),
          component: PageComponents[p.component].default
        }
      })
    }
  ]
}
