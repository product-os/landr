import React from 'react'
import { Router, Routes, getSiteProps, Tracker } from 'landr'
import { Provider } from 'resin-components'
import { injectGlobal } from 'styled-components'
import get from 'lodash/get'

import Nav from './components/Nav'
import Footer from './components/Footer'
import Helmet from './components/Helmet'
import ThemeStyles, { globalStyles } from './theme'

export default getSiteProps(props => {
  const getProp = key => get(props, key)
  const mergedTheme = ThemeStyles(getProp('settings.theme'))
  injectGlobal`${globalStyles(mergedTheme)}`

  return (
    <Router>
      <Tracker
        prefix={getProp('repository.name')}
        analytics={getProp('settings.analytics')}
      >
        <Provider theme={mergedTheme}>
          <Helmet {...props} />
          <Nav {...props} />
          <Routes />
          <Footer {...props} />
        </Provider>
      </Tracker>
    </Router>
  )
})
