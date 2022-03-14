/*
 * Copyright 2021 balena.io
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

import {
  Markdown
} from 'rendition/dist/extra/Markdown'

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'
import {
  faCheck
} from '@fortawesome/free-solid-svg-icons/faCheck'

export const render = (props) => {
  const boxes = props.leftoverSections.map((section, index) => {
    return (
      <Box key={index} px={3} mb={45} width={[ 1, 1, 1 / 2, 1 / 2 ]}>
        <Flex>
          <Flex alignItems="flex-start" mt={1} mr={3}>
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
            <Markdown
              componentOverrides={{
                strong: 'div',
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
                h1: (componentProps) => {
                  return (
                    <Heading.h3
                      {...componentProps}
                      fontSize="20px"
                      style={{
                        fontWeight: 600
                      }}
                    />
                  )
                },
                h2: (componentProps) => {
                  return (
                    <Heading.h2
                      {...componentProps}
                      fontSize="20px"
                      style={{
                        fontWeight: 600
                      }}
                    />
                  )
                },
                h3: (componentProps) => {
                  return (
                    <Heading.h3
                      {...componentProps}
                      fontSize="20px"
                      style={{
                        fontWeight: 600
                      }}
                    />
                  )
                }
              }}
            >
              {section.title}
            </Markdown>
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
              {section.description}
            </Markdown>
          </Flex>
        </Flex>
      </Box>
    )
  })

  return (
    <Box pt={45}>
      <Container maxWidth={998}>
        <Flex flexWrap="wrap" py={65} justifyContent="space-around" mx={-3}>
          {boxes}
        </Flex>
      </Container>
    </Box>
  )
}

export default {
  render
}
