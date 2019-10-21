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
  Box, Container, Heading
} from 'rendition'
import {
  markdown
} from 'markdown'

export const name = 'HardwareRequired'

export const variants = (metadata) => {
  const combinations = []

  if (metadata.data.hardwareRequired) {
    combinations.push({
      hardwareRequired: metadata.data.hardwareRequired
    })
  }

  return combinations
}

export const render = (props) => {
  const html = markdown.renderJsonML(
    markdown.toHTMLTree([ 'markdown' ].concat(props.hardwareRequired))
  )

  return (
    <Box my={100}>
      <Container>
        <Heading.h2 mb={24}>Hardware Required</Heading.h2>
        <Box
          style={{
            maxWidth: 800
          }}
          dangerouslySetInnerHTML={{
            __html: html
          }}>
        </Box>
      </Container>
    </Box>
  )
}
