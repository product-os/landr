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

const React = require('react')
const {
  Provider
} = require('rendition')
const {
  useRouteData
} = require('react-static')

const components = require('./components')
const LandrComponent = require('./landr-component')
const analytics = require('./analytics')

// Make it look like a valid ES6 module from outside,
// as this is required by React Static directly.
// eslint-disable-next-line no-underscore-dangle
exports.__esModule = {
  valid: true
}

const theme = {
  font: 'Nunito',
  button: {
    font: {
      weight: 'normal'
    }
  },
  colors: {
    primary: {
      main: '#fa8600',
      light: '#ffeecb',
      dark: '#e07800'
    },
    text: {
      main: '#2a506f',
      light: '#2a506f',
      dark: '#2a506f'
    }
  },
  breakpoints: [ 576, 768, 992, 1200 ],
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

exports.default = () => {
  const routeData = useRouteData()
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
