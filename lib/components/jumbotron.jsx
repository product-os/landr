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
  Box, Container, Txt, Flex, Heading
} from 'rendition'

import Terminal from './presentational/terminal'

export const name = 'Jumbotron'

export const variants = (metadata) => {
  const combinations = []

  if (metadata.data.tagline && metadata.data.description) {
    combinations.push({
      title: metadata.data.tagline,
      description: metadata.data.description,
      packageName: metadata.data.name,
      type: metadata.data.type,
      repositoryUrl: metadata.data.links.repository
    })
  }

  if (metadata.data.tagline) {
    combinations.push({
      title: metadata.data.tagline,
      packageName: metadata.data.name,
      type: metadata.data.type,
      repositoryUrl: metadata.data.links.repository
    })
  }

  return combinations
}

export const render = (props) => {
  const [ user, repo ] = props.repositoryUrl
    .split('/')
    .slice(
      props.repositoryUrl.split('/').length - 2,
      props.repositoryUrl.split('/').length
    )

  const commands = props.type === 'npm'
    ? [
      {
        command: `npm install ${props.packageName}`,
        comment: false
      },
      {
        command: '// Alternatively ...',
        comment: true
      },
      {
        command: `yarn add ${props.packageName}`,
        comment: false
      }
    ]
    : []

  return (
    <Box bg={'#6997c3'} color="#fff" mb={5} py={6}>
      <Container>
        <Flex flexDirection="column" alignItems="center">
          <Heading.h1>{props.title}</Heading.h1>
          {props.description && <Txt fontSize={3}>{props.description}</Txt>}
        </Flex>
        {commands.length > 0 && <Terminal commands={commands} />}
        {props.repositoryUrl && (
          <Txt align="center" mt={2}>
            <iframe
              src={`https://ghbtns.com/github-btn.html?user=${user}&repo=${repo}&type=star&count=true&size=large`}
              frameBorder="0"
              scrolling="0"
              width="160px"
              height="30px"
            />
          </Txt>
        )}
      </Container>
    </Box>
  )
}
