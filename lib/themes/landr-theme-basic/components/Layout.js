import React from 'react'
import Theme, { globalStyles } from 'theme'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'resin-components'
import { injectGlobal } from 'styled-components'
import { withRouter } from 'react-router-dom'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import deepmerge from 'deepmerge'

injectGlobal`${globalStyles}`

export default (props) => {
  return (
    <Provider theme={Theme}>
      <Nav {...props} />
      {renderRoutes(props.route.routes, props)}
      <Footer {...props} />
    </Provider>
  )
}
