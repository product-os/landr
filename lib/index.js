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
const path = require('path')
const ReactDOM = require('react-dom/server')
const {
  AppContainer
} = require('react-hot-loader')
const App = require('./app')

// Dynamically require the contract from the path
// that the Landr CLI passed to us.
// const DATA = require(process.env.LANDR_CONTRACT_PATH)

// Make it look like a valid ES6 module from outside,
// as this is required by React Static directly.
// eslint-disable-next-line no-underscore-dangle
exports.__esModule = {
  valid: true
}

/*
 * This is the server side entry point. We
 * have to make sure to inject the repository
 * contract as parts of the props as otherwise
 * React Static will not do it for us.
 */
exports.default = (props) => {
  return App(props)
}

/*
 * This is the client side entry point. We
 * must make sure to pass the repository
 * contract to the React component in the same
 * way we did for the server side rendering.
 */
if (typeof document !== 'undefined') {
  const target = document.getElementById('root')

  const renderMethod = target.hasChildNodes()
    ? ReactDOM.hydrate
    : ReactDOM.renderToString

  const render = (Comp) => {
    const element = React.createElement(
      AppContainer,
      null,
      React.createElement(Comp)
    )

    renderMethod(element, target)
  }

  // Render!
  render(App)

  /*
   * Setup hot reloading for when running Landr
   * in test mode.
   */
  if (module && module.hot) {
    module.hot.accept(path.resolve(__dirname, 'app'), () => {
      render(App)
    })
  }
}
