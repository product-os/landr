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
  Box, Container, Heading, Txt
} from 'rendition'

export const name = 'Motivation'

export const variants = (metadata) => {
  const combinations = []

  if (metadata.data.motivation) {
    combinations.push({
      motivation: metadata.data.motivation,
      name: metadata.data.name
    })
  }

  return combinations
}

export const render = (props) => {
  return (
    <Box my={130}>
      <Container>
        <Heading.h2 mb={24}>Why {props.name}</Heading.h2>
        <Txt
          width={[ 1, 1, 1 / 2, 1 / 2 ]}
          fontSize={14}
          dangerouslySetInnerHTML={{
            __html: props.motivation[1]
          }}
        />
      </Container>
    </Box>
  )
}
