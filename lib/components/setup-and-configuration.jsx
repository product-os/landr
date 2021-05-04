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
  Box, Container, Txt, Flex, Heading, Link
} from 'rendition'

import {
  Markdown
} from 'rendition/dist/extra/Markdown'
import styled from 'styled-components'
import hexToRgba from 'hex-to-rgba'
import {
  DeployWithBalena
} from './presentational/deploy-with-balena'

export const name = 'SetupAndConfiguration'

export const variants = (metadata) => {
  const combinations = []

  if (metadata.data.setup) {
    combinations.push({
      setup: metadata.data.setup,
      deployWithBalenaUrl: metadata.data.deployWithBalenaUrl
    })
  }

  return combinations
}

const Wrapper = styled(Box) `
  background-color: ${({
    theme
  }) => {
    return hexToRgba(theme.colors.primary.main, 0.4)
  }};
`

export const render = (props) => {
  return (
    <Wrapper py={75}>
      <Container maxWidth={998}>
        <Flex flexDirection="column">
          <Heading.h2
            mb={18}
            fontSize="38px"
            style={{
              fontWeight: 400,
              lineHeight: 1.18
            }}
            id="setup"
          >
            Setup and configuration
          </Heading.h2>
          <Flex>
            <Markdown
              componentOverrides={{
                // eslint-disable-next-line id-length
                p: (componentProps) => {
                  return (
                    <Txt
                      mt={1}
                      color="text.main"
                      {...componentProps}
                      fontSize="16px"
                      style={{
                        lineHeight: 1.5
                      }}
                    />
                  )
                },
                // eslint-disable-next-line id-length
                a: (componentProps) => {
                  const deployRoot =
                    props.deployWithBalenaUrl &&
                    props.deployWithBalenaUrl.split('?')[0]
                  if (
                    deployRoot &&
                    componentProps.href &&
                    componentProps.href.includes(deployRoot)
                  ) {
                    return (
                      <DeployWithBalena deployUrl={props.deployWithBalenaUrl} />
                    )
                  }
                  return <Link {...componentProps} />
                },
                strong: 'div'
              }}
            >
              {props.setup}
            </Markdown>
          </Flex>
        </Flex>
      </Container>
    </Wrapper>
  )
}
