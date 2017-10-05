import React from 'react'
import Theme, { globalStyles } from 'theme'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'resin-components'
import { injectGlobal } from 'styled-components'
import { withRouter } from 'react-router-dom'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import deepmerge from 'deepmerge'
import Helmet from 'react-helmet'
import capitalize from 'underscore.string/capitalize'
import humanize from 'underscore.string/humanize'
import images from 'images'
import Tracker from 'components/Tracker'

injectGlobal`${globalStyles}`

export default (props) => {
  return (
    <Tracker prefix={props.repository.name} analytics={props.landrConfig.settings.analytics}>
      <Provider theme={Theme}>
        <div>
          {
          // TODO:  wierd need this div otherwise preact throws Failed to execute 'replaceChild' on 'Node': The new child element contains the parent.
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
