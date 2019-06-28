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
  Box,
  Badge,
  Container,
  Flex,
  Link,
  Heading,
  Txt,
  Divider
} from 'rendition'

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

export const render = (props) => {
  const list = props.users.map(({
    repo, owner, description
  }) => {
    return (
      <>
        <Flex py={3} alignItems="center">
          <Flex alignItems="center">
            <Badge px={3}>{repo}</Badge>
            <Txt px={3} align="left">
              {description}
            </Txt>
          </Flex>
          <Link
            ml="auto"
            px={3}
            fontSize={20}
            blank
            href={`${GITHUB_PROFILE_PATH}/${owner}/${repo}`}
          >
            ↗
          </Link>
        </Flex>
        <Divider m={0} height={1} color={'#c1c7dd'} />
      </>
    )
  })

  return (
    <Box p={3} my={3}>
      <Container textAlign="center">
        <Box mb={4}>
          <Heading.h2 mb={1}>Used by</Heading.h2>
        </Box>
        <Divider m={0} height={1} color={'#c1c7dd'} />
        {list}
      </Container>
    </Box>
  )
}
