import React from 'react'
import ReactDom from 'react-dom'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter, BrowserRouter } from 'react-router-dom'
import Routes from 'components/Routes.js'
import StaticRoot from 'components/StaticRoot.js'
import { ServerStyleSheet } from 'styled-components'
import { renderRoutes } from 'react-router-config'

if (typeof document !== 'undefined') {
  const initialProps = JSON.parse(document.getElementById('initial-props').innerHTML)
  const mount = document.getElementById('mount')
  const AppRouter = () => {
    return (
      <BrowserRouter>
        {renderRoutes(Routes, initialProps)}
      </BrowserRouter>
    )
  }
  ReactDom.render(<AppRouter />, mount)
}

const Entry = function render (path, assets, locals) {
  let context = {}
  const App = (
    <StaticRouter location={path} context={context}>
      {renderRoutes(Routes, locals)}
    </StaticRouter>
  )

  // this renders styles on the client
  const sheet = new ServerStyleSheet()
  const styleTags = sheet.getStyleElement()

  locals.styleTags = styleTags
  locals.scriptTags = assets
  return Promise.resolve(renderToStaticMarkup(
    React.createElement(
      StaticRoot,
      locals,
      renderToString(App)
    )
  ))
}

export default Entry
