/*
 * Copyright 2019 balena.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import * as _ from 'lodash'
import {
  Provider
} from 'rendition'

const components = require('../../lib/components')
const LandrComponent = require('../../lib/landr-component')

// Const analytics = require('../../lib/analytics')

const config = window.LANDR_CONFIG

// Make it look like a valid ES6 module from outside,
// as this is required by React Static directly.
// eslint-disable-next-line no-underscore-dangle
exports.__esModule = {
  valid: true
}

console.log(config)

const landrTheme = config.theme

const theme = {
  font: 'Nunito',
  button: {
    font: {
      weight: 'normal'
    }
  },
  colors: {
    primary: {
      main: landrTheme.vibrant.normal.color,
      light: landrTheme.vibrant.light.color,
      dark: landrTheme.vibrant.dark.color
    },
    text: {
      main: '#2a506f',
      light: '#2a506f',
      dark: '#2a506f'
    }
  },
  breakpoints: [ 576, 768, 992, 1268 ],
  fontSizes: [ 12, 14, 16, 20, 24, 34, 48, 62, 74, 96 ],
  space: [ 0, 4, 8, 16, 36, 46, 80 ],
  global: {
    font: {
      family: 'Nunito',
      size: '16px'
    }
  }
}

exports.theme = theme

const App = () => {
  return (
    <Router>
      <Provider theme={theme}>
        <Switch>
          {_.map(config.site, (combination, uri) => {
            return (
              <Route key={uri} exact path={uri}>
                {combination.map((definition, index) => {
                  return (
                    <LandrComponent
                      key={index}
                      definition={definition}
                      components={components}

                      // Analytics={analytics(routeData.site, analyticsOptions)}
                    />
                  )
                })}
              </Route>
            )
          })}
        </Switch>
      </Provider>
    </Router>
  )
}

function Home () {
  return <h2>Home</h2>
}

function About () {
  return <h2>About</h2>
}

function Users () {
  return <h2>Users</h2>
}

exports.default = () => {
  const routeData = {}
  const combination = routeData.combination
  const analyticsOptions = routeData.analytics
  const elements = combination.map((definition, index) => {
    // The `key` attribute keeps React happy.
    // See https://reactjs.org/docs/lists-and-keys.html#keys
    return React.createElement(LandrComponent, {
      key: index,
      definition,
      components,
      analytics: analytics(routeData.site, analyticsOptions)
    })
  })

  return React.createElement(Provider, {
    theme
  }, elements)
}

const rootElement = document.getElementById('root')
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
)
