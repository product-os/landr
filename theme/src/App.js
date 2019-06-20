import React from 'react';
import { Provider } from 'rendition';
import { Router } from 'react-static';
import { hot } from 'react-hot-loader';
import Routes from 'react-static-routes';
import { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';
import 'circular-std'

import Navigation from './components/Navigation'

const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  color: #514e58;
}
`;

const App = () => (
  <Router>
    <Provider>
      <Normalize />
      <GlobalStyle />
      <Navigation />
      <Routes />
    </Provider>
  </Router>
);

export default hot(module)(App);
