import React from 'react'
import ReactDom from 'react-dom'
import Router from 'react-router'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import Routes from 'components/Routes.js'
import StaticRoot from 'components/StaticRoot.js'

if (typeof document !== 'undefined') {
  const initialProps = JSON.parse(document.getElementById('initial-props').innerHTML)
  const mount = document.getElementById('mount')
  Router.run(Routes, Router.HistoryLocation, function (Handler) {
    ReactDom.render(
      React.createElement(
        Handler,
        initialProps
      )
    , mount)
  })
}

const Entry = function render (locals, callback) {
  Router.run(Routes, locals.path, function (Handler) {
    const ReactApp = renderToString(
        React.createElement(
          Handler,
          locals
        )
      )

    callback(null, '<!DOCTYPE html>' + renderToStaticMarkup(
        React.createElement(
          StaticRoot,
          locals,
          ReactApp
        )
      ))
  })
}

export default Entry
