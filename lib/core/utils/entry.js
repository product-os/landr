import React from 'react'
import ReactDom from 'react-dom'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter, BrowserRouter } from 'react-router-dom'
import createRoutes from './createRoutes.js'
import StaticRoot from './StaticRoot.js'
import { ServerStyleSheet } from 'styled-components'
import { renderRoutes } from 'react-router-config'

if (typeof document !== 'undefined') {
  const initialProps = JSON.parse(document.getElementById('initial-props').innerHTML)
  const mount = document.getElementById('mount')
  const AppRouter = () => {
    return (
      <BrowserRouter>
        {renderRoutes(createRoutes(initialProps.pages), initialProps)}
      </BrowserRouter>
    )
  }
  ReactDom.render(<AppRouter />, mount)
}

const Entry = function render (path, assets, locals) {
  let context = {}
  const App = (
    <StaticRouter location={path} context={context}>
      {renderRoutes(createRoutes(locals.pages), locals)}
    </StaticRouter>
  )

  // this renders styles on the client
  const sheet = new ServerStyleSheet()
  const body = renderToString(App)
  sheet.collectStyles(body)
  const styleTags = sheet.getStyleElement()

  locals.styleTags = styleTags
  locals.scriptTags = assets.filter(ass => ass.endsWith('.js'))
  return Promise.resolve(renderToStaticMarkup(
    React.createElement(
      StaticRoot,
      locals,
      body
    )
  ))
}

export default Entry
