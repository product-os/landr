import React from 'react'
import Theme, { globalStyles } from 'theme'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'resin-components'
import { injectGlobal } from 'styled-components'
import { withRouter } from 'react-router-dom'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Helmet from 'components/Helmet'
import images from 'images'
import Tracker from 'components/Tracker'

export default props => {
  const mergedTheme = Theme(props.config.settings.theme)
  injectGlobal`${globalStyles(mergedTheme)}`
  return (
    <Tracker
      prefix={props.repository.name}
      analytics={props.config.settings.analytics}
    >
      <Provider theme={mergedTheme}>
        <div>
          {
            // TODO:  weird need this div otherwise preact throws Failed to execute 'replaceChild' on 'Node': The new child element contains the parent.
          }
          <Helmet {...props} />
          <Nav {...props} />
        </div>
        {renderRoutes(props.route.routes, props)}
        <Footer {...props} />
      </Provider>
    </Tracker>
  )
}
