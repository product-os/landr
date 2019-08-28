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
  Box, Button, Container, Flex, Link, Heading, Txt
} from 'rendition'
import styled from 'styled-components'

export const name = 'Users'

export const variants = (metadata) => {
  const combinations = []

  if (metadata.data.github.usedBy) {
    combinations.push({
      users: metadata.data.github.usedBy
    })
  }

  return combinations
}

const GITHUB_PROFILE_PATH = 'https://github.com'

const ProjectCard = styled(Flex) `
  height: 100%;
  flex-direction: column;
  flex: 1;

  border-radius: 10px;
  box-shadow: -10px 9px 21px 0 rgba(152, 173, 227, 0.08);
  border: solid 1px #e8ebf2;
  background-color: #ffffff;
`

const Screenshot = styled(Box) `
  background-image: url(${(props) => { return props.bg }});
  background-position: center;
  background-size: cover;
  height: 200px;
  width: 100%;
`

export const render = (props) => {
  const list = props.users.map(({
    repo, owner, description, screenshot
  }) => {
    return (
      <Box key={repo} px={3} width={[ 1, 1 / 2, 1 / 2, 1 / 4 ]}>
        <ProjectCard>
          <Screenshot bg={screenshot} />
          <Flex
            padding={30}
            justifyContent="center"
            flex={1}
            flexDirection="column"
          >
            <Heading.h5 mb={16} fontSize={18} textAlign="center">
              {repo}
            </Heading.h5>
            <Txt mb={20} fontSize={14} textAlign="center">
              {description}
            </Txt>
            <Link
              mt="auto"
              blank
              href={`${GITHUB_PROFILE_PATH}/${owner}/${repo}`}
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
      <Container>
        <Heading.h2 mb={4} align="center">
          Check out who's using this project
        </Heading.h2>
        <Flex mx={-3}>{list}</Flex>
      </Container>
    </Box>
  )
}
