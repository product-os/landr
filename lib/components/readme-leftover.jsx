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

import {
  trim
} from 'lodash'
import React from 'react'
import {
  Container
} from 'rendition'
import {
  Markdown
} from 'rendition/dist/extra/Markdown'
export const name = 'ReadmeLeftover'

export const variants = (metadata) => {
  const combinations = []

  if (trim(metadata.data.readmeLeftover)) {
    combinations.push({
      readmeLeftover: metadata.data.readmeLeftover
    })
  }

  return combinations
}

export const render = (props) => {
  return (
    <Container my={45} maxWidth={998}>
      <Markdown>{props.readmeLeftover}</Markdown>
    </Container>
  )
}
