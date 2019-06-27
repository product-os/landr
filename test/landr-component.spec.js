/*
 * Copyright 2019 balena.io
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as ava from 'ava'
import React from 'react'
import * as enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import LandrComponent from '../lib/landr-component'

enzyme.configure({
  adapter: new Adapter()
})

ava('should render a component', (test) => {
  const components = {
    Test: {
      render: (props) => {
        return (<p>Foo</p>)
      }
    },
    Greeting: {
      render: (props) => {
        return (<p>Hello {props.name}!</p>)
      }
    }
  }

  const definition = {
    component: 'Greeting',
    rank: 1,
    options: {
      name: 'John Doe'
    }
  }

  const wrapper = enzyme.shallow(<LandrComponent
    components={components}
    definition={definition} />)

  test.true(wrapper.equals(<p>Hello John Doe!</p>))
})
