import React from 'react'
import ReactDom from 'react-dom'
import Router from 'react-router'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter, BrowserRouter } from 'react-router-dom';
import Routes from 'components/Routes.js'
import StaticRoot from 'components/StaticRoot.js'
import { ServerStyleSheet } from 'styled-components'
import Index from 'pages/Index'
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

const Entry = function render (locals, callback) {
  let context = {};
  const App = (
    <StaticRouter location={locals.path} context={context}>
      {renderRoutes(Routes, locals)}
    </StaticRouter>
  )

  const sheet = new ServerStyleSheet()
  const html = renderToString(sheet.collectStyles(App))
  const styleTags = sheet.getStyleElement()

  locals.styleTags = styleTags
  callback(null, renderToStaticMarkup(
    React.createElement(
      StaticRoot,
      locals,
      renderToString(App)
    )
  ))
}

export default Entry
