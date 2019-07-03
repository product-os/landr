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
  AppContainer
} from 'react-hot-loader'

// Your top level component
import App from './app'

// Dynamically require the contract from the path
// that the Landr CLI passed to us.
const DATA = require(process.env.LANDR_CONTRACT_PATH)

/*
 * This is the server side entry point. We
 * have to make sure to inject the repository
 * contract as parts of the props as otherwise
 * React Static will not do it for us.
 */
export default (props) => {
  props.contract = DATA
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
    : ReactDOM.render

  const render = (Comp) => {
    renderMethod(
      <AppContainer>
        <Comp contract={DATA} />
      </AppContainer>,
      target
    )
  }

  // Render!
  render(App)

  /*
   * Setup hot reloading for when running Landr
   * in test mode.
   */
  if (module && module.hot) {
    module.hot.accept('./app', () => {
      render(App)
    })
  }
}
