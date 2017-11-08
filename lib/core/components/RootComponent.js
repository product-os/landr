import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Head } from 'landr'
import { ServerStyleSheet } from 'styled-components'
// Your top level component
import App from '@theme'

// Export your top level component as JSX (for static rendering)
export default App

// we have to do this for the static builds
// as these modules are stateful and there can't use multiple instances
export { ServerStyleSheet, Head }

// Render your app
if (typeof document !== 'undefined') {
  const render = Comp => {
    ReactDOM.render(
      <AppContainer>
        <Comp />
      </AppContainer>,
      document.getElementById('root')
    )
  }

  // Render!
  render(App)

  // Hot Module Replacement
  if (module.hot) {
    module.hot.accept('@theme', () => {
      render(require('@theme').default)
    })
  }
}
