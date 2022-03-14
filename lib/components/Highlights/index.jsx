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

import {
  Markdown
} from 'rendition/dist/extra/Markdown'

import hexToRgba from 'hex-to-rgba'
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'
import {
  faCheck
} from '@fortawesome/free-solid-svg-icons/faCheck'

const Wrapper = styled(Box) `
  background-color: ${({
    theme
  }) => {
    return hexToRgba(theme.colors.primary.main, 0.4)
  }};
`

export const render = (props) => {
  const boxes = props.highlights.map((highlight, index) => {
    return (
      <Box key={index} px={3} width={[ 1, 1, 1 / 3, 1 / 3 ]}>
        <Flex>
          <Flex alignItems="flex-start" mr={3} mt={1}>
            <Box
              bg="primary.main"
              width={24}
              height={24}
              style={{
                borderRadius: '50%'
              }}
              fontSize={0}
            >
              <Txt align="center" color="white" py="3px">
                <FontAwesomeIcon icon={faCheck} />
              </Txt>
            </Box>
          </Flex>
          <Flex flexDirection="column">
            <Heading.h3 mb={2}>
              <Markdown
                componentOverrides={{
                  // eslint-disable-next-line id-length
                  p: (componentProps) => {
                    return (
                      <Txt
                        {...componentProps}
                        fontSize="20px"
                        style={{
                          lineHeight: 1.5,
                          fontWeight: 600
                        }}
                      />
                    )
                  },
                  strong: 'div'
                }}
              >
                {highlight.title}
              </Markdown>
            </Heading.h3>
            <Markdown
              componentOverrides={{
                // eslint-disable-next-line id-length
                p: (componentProps) => {
                  return (
                    <Txt
                      {...componentProps}
                      fontSize="16px"
                      style={{
                        lineHeight: 1.63
                      }}
                    />
                  )
                },
                strong: 'div'
              }}
            >
              {highlight.description}
            </Markdown>
          </Flex>
        </Flex>
      </Box>
    )
  })

  return (
    <Wrapper py={45}>
      <Container maxWidth={998}>
        <Flex flexWrap="wrap" justifyContent="space-around" mx={-3}>
          {boxes}
        </Flex>
      </Container>
    </Wrapper>
  )
}

export default {
  render
}
