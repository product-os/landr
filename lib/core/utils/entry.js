import React from 'react'
import ReactDom from 'react-dom'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter, BrowserRouter } from 'react-router-dom'
import createRoutes from './createRoutes.js'
import StaticRoot from './StaticRoot.js'
import { ServerStyleSheet } from 'styled-components'
import { renderRoutes } from 'react-router-config'

if (typeof document !== 'undefined') {
  const locals = JSON.parse(document.getElementById('__LANDR__LOCALS').innerHTML)
  const routes = JSON.parse(document.getElementById('__LANDR__ROUTES').innerHTML)
  const mount = document.getElementById('mount')
  const AppRouter = () => {
    return (
      <BrowserRouter>
        {renderRoutes(createRoutes(routes), locals)}
      </BrowserRouter>
    )
  }
  ReactDom.render(<AppRouter />, mount)
}

const Entry = function render ({
  path,
  assets,
  locals,
  pages
}) {
  let context = {}
  const App = (
    <StaticRouter location={path} context={context}>
      {renderRoutes(createRoutes(pages), locals)}
    </StaticRouter>
  )

  // this renders styles on the client
  const sheet = new ServerStyleSheet()
  const body = renderToString(App)
  sheet.collectStyles(body)
  const styleTags = sheet.getStyleElement()
  const scriptTags = assets.filter(ass => ass.endsWith('.js'))
  return Promise.resolve(renderToStaticMarkup(
    React.createElement(
      StaticRoot,
      {
        locals,
        styleTags,
        scriptTags,
        pages
      },
      body
    )
  ))
}

export default Entry
