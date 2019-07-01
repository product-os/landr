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
  Box, Container, Heading, Txt, Flex
} from 'rendition'

export const name = 'Highlights'

export const variants = (metadata) => {
  const combinations = []

  if (metadata.data.highlights && metadata.data.highlights.length > 0) {
    combinations.push({
      highlights: metadata.data.highlights
    })
  }

  return combinations
}

export const render = (props) => {
  const boxes = props.highlights.map((highlight, index) => {
    return (<Box key={index} style={{
      marginLeft: 10,
      marginRight: 10
    }}>
      <Heading.h3>{highlight.title}</Heading.h3>
      <Txt>{highlight.description}</Txt>
    </Box>)
  })

  return (
    <Box p={3} my={3}>
      <Container>
        <Box>
          <Flex justifyContent='space-around' alignItems='baseline'>{boxes}</Flex>
        </Box>
      </Container>
    </Box>
  )
}
