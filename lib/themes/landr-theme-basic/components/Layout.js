import React from 'react'
import Theme, { globalStyles } from 'theme'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'resin-components'
import { injectGlobal } from 'styled-components'
import { withRouter } from 'react-router-dom'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import deepmerge from 'deepmerge'
import Helmet from 'components/Helmet'
import images from 'images'
import Tracker from 'components/Tracker'

injectGlobal`${globalStyles}`

export default props => {
  return (
    <Tracker
      prefix={props.repository.name}
      analytics={props.config.settings.analytics}
    >
      <Provider theme={Theme}>
        <Helmet {...props} />
        <Nav {...props} />
        {renderRoutes(props.route.routes, props)}
        <Footer {...props} />
      </Provider>
    </Tracker>
  )
}
