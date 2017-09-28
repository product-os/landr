import React from 'react'
import Theme, { globalStyles } from 'theme'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'rebass'
import { injectGlobal } from 'styled-components'
import Link from 'react-router-dom/Link'

injectGlobal`${globalStyles}`

export default (props) => {
  return (
    <Provider theme={Theme}>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      {renderRoutes(props.route.routes, props)}
    </Provider>
  )
}
