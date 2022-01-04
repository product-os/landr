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
import {
  Provider
} from 'rendition'
import {
  useRouteData
} from 'react-static'
import LandrComponent from './landr-component'
import analytics from './analytics'
import defaultTheme from '../default-theme.json'
import '@fortawesome/fontawesome/styles.css'
import './components/global.css'
import 'react-typist/dist/Typist.css'

// Const isBrowser = typeof document !== 'undefined'
// const preset = require.resolve('react-static/babel-preset.js')

// // If we're running inside Webpack, then `require.resolve()`
// // returns a number that corresponds to the module id, rather
// // than a filename as in plain Node.js.
// // Notice that running in webpack doesn't necessarily mean
// // we are in a browser context, as we might be running Webpack
// // server side in Node.js.
// // See https://github.com/webpack/webpack/issues/1554
// const isWebpack = typeof preset === 'number'

// if (!isWebpack) {
//   require('@babel/register')({
//     babelrc: false,
//     presets: [
//       [
//         preset,
//         {
//           node: !isBrowser
//         }
//       ]
//     ],
//     only: [
//       (filename) => {
//         return filename.startsWith(__dirname)
//       }
//     ]
//   })
// }

// Only require CSS in the browser, so we can
// easily unit test this file with Ava without
// requiring a full-blown Webpack configuration
// that skips CSS files.

// Make it look like a valid ES6 module from outside,
// as this is required by React Static directly.
// eslint-disable-next-line no-underscore-dangle
// exports.__esModule = {
//   valid: true
// }

const landrTheme = process.env.LANDR_THEME
  ? JSON.parse(process.env.LANDR_THEME)
  : defaultTheme

export const theme = {
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
  global: {
    font: {
      family: 'Source Sans Pro'
    }
  },
  fontSizes: [ 12, 16, 18, 20, 24, 34, 48, 62, 74, 96 ],
  space: [ 0, 4, 8, 16, 36, 46, 80 ]
}

const Renderer = () => {
  const routeData = useRouteData()
  const combination = routeData.combination
  const analyticsOptions = routeData.analytics
  const elements = combination.map((definition, index) => {
    // The `key` attribute keeps React happy.
    // See https://reactjs.org/docs/lists-and-keys.html#keys
    return React.createElement(LandrComponent, {
      key: index,
      definition,
      analytics: analytics(routeData.site, analyticsOptions),
      config: routeData.landrConfig,
      directory: routeData.directory
    })
  })

  return React.createElement(
    Provider,
    {
      theme
    },
    elements
  )
}

export default Renderer
