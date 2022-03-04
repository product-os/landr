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

const isBrowser = typeof document !== 'undefined'
const preset = require.resolve('react-static/babel-preset.js')

// If we're running inside Webpack, then `require.resolve()`
// returns a number that corresponds to the module id, rather
// than a filename as in plain Node.js.
// Notice that running in webpack doesn't necessarily mean
// we are in a browser context, as we might be running Webpack
// server side in Node.js.
// See https://github.com/webpack/webpack/issues/1554
const isWebpack = typeof preset === 'number'

if (!isWebpack) {
  require('@babel/register')({
    babelrc: false,
    presets: [
      [
        preset,
        {
          node: !isBrowser
        }
      ]
    ],
    only: [
      (filename) => {
        return filename.startsWith(__dirname)
      }
    ]
  })
}

module.exports = {
  Head: require('./Head'),
  Navigation: require('./Navigation'),
  UserInfo: require('./UserInfo'),
  Jumbotron: require('./Jumbotron'),
  Highlights: require('./Highlights'),
  Introduction: require('./Introduction'),
  Users: require('./Users'),
  Motivation: require('./Motivation'),
  SetupAndConfiguration: require('./SetupAndConfiguration'),
  ReadmeSections: require('./ReadmeSections'),
  ReadmeLeftover: require('./ReadmeLeftover'),
  HardwareRequired: require('./HardwareRequired'),
  SoftwareRequired: require('./SoftwareRequired'),
  LegalDocs: require('./LegalDocs'),
  Downloads: require('./Downloads'),
  Team: require('./Team'),
  Faq: require('./Faq'),
  Contributors: require('./Contributors'),
  BlogList: require('./BlogList'),
  DocViewer: require('./DocViewer'),
  Changelog: require('./Changelog'),
  Footer: require('./Footer')
}
