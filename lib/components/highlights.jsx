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
import styled from 'styled-components'
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

const Wrapper = styled(Box) `
  background-color: ${({
    theme
  }) => {
    return theme.colors.primary.light
  }};
`

const Header = styled(Heading.h3) `
  color: ${({
    theme
  }) => {
    return theme.colors.primary.main
  }};
`

export const render = (props) => {
  const boxes = props.highlights.map((highlight, index) => {
    return (
      <Txt
        key={index}
        px={3}
        mb={2}
        width={[ 1, 1, 1 / 3, 1 / 3 ]}
        align="center"
      >
        <Header fontSize={22} mb={3}>
          {highlight.title}
        </Header>
        <Txt fontSize={14}>{highlight.description}</Txt>
      </Txt>
    )
  })

  return (
    <Wrapper pt={45} pb={100}>
      <Container>
        <Flex flexWrap='wrap' justifyContent="space-around" my={-3}>
          {boxes}
        </Flex>
      </Container>
    </Wrapper>
  )
}
