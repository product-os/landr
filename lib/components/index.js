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

require('@babel/register')({
  babelrc: false,
  presets: [
    [
      require.resolve('react-static/babel-preset.js'),
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

// Only require CSS in the browser, so we can
// easily unit test this file with Ava without
// requiring a full-blown Webpack configuration
// that skips CSS files.
if (isBrowser) {
  require('./global.css')
  require('typeface-nunito')
  require('circular-std')
  require('react-typist/dist/Typist.css')
}

module.exports = {
  Jumbotron: require('./jumbotron'),
  Navigation: require('./navigation'),
  Contributors: require('./contributors'),
  Highlights: require('./highlights'),
  DocViewer: require('./doc-viewer'),
  Footer: require('./footer'),
  Head: require('./head'),
  Faq: require('./faq'),
  Users: require('./users')
}
