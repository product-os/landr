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
import _ from 'lodash'
import {
  Box, Button, Container, Flex, Link, Heading, Txt, Card
} from 'rendition'
import styled from 'styled-components'

export const name = 'Users'

export const variants = (metadata) => {
  const combinations = []

  if (_.size(metadata.data.github.usedBy) > 0) {
    combinations.push({
      users: _.map(metadata.data.github.usedBy, (user) => {
        return _.omit(user, [ 'screenshot' ])
      })
    })
  }

  return combinations
}

const ProjectCard = styled(Card) `
  padding: 0;
`

const Screenshot = styled(Box) `
  background-image: url(${(props) => { return props.bg }});
  background-position: top center;
  background-size: cover;
  height: 200px;
  width: 100%;
`

export const render = (props) => {
  const list = props.users.map(({
    name: projectName, website, description, screenshot
  }) => {
    return (
      <Box key={projectName} px={2} width={[ 1, 1 / 2, 1 / 2, 1 / 3 ]} mb={3}>
        <ProjectCard>
          <Screenshot bg={screenshot} />
          <Flex
            padding={30}
            justifyContent="center"
            flex={1}
            flexDirection="column"
            style={{
              height: '100%'
            }}
          >
            <Heading.h5 mb={16} fontSize={18} textAlign="center">
              {projectName}
            </Heading.h5>
            <Txt mb={20} fontSize={14} textAlign="center">
              {description}
            </Txt>
            <Link
              mt="auto"
              blank
              href={website}
              style={{
                textAlign: 'center'
              }}
            >
              <Button primary fontSize={14}>
                Visit
              </Button>
            </Link>
          </Flex>
        </ProjectCard>
      </Box>
    )
  })

  return (
    <Box my={130}>
      <Container style={{
        maxWidth: 1000
      }}>
        <Heading.h2 mb={4} align="center">
          Check out who's using this project
        </Heading.h2>
        <Flex mx={-2} flexWrap='wrap' justifyContent='center'>
          {list}
        </Flex>
      </Container>
    </Box>
  )
}
