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
  Root,
  Routes
} from 'react-static'
import {
  Router
} from '@reach/router'

import './global.css'

import 'typeface-nunito'
import 'circular-std'
import 'react-typist/dist/Typist.css'

const App = ({
  contract
}) => {
  return (
    <Root>
      <React.Suspense fallback={<em>Loading...</em>}>
        <Router>
          <Routes path="*" contract={contract} />
        </Router>
      </React.Suspense>
    </Root>
  )
}

export default App
