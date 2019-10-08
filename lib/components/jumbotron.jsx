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
import _ from 'lodash'
import {
  Box, Button, Container, Txt, Flex, Heading, useTheme
} from 'rendition'

import Terminal from './presentational/terminal'

export const name = 'Jumbotron'

export const variants = (metadata, _context, _route, routes) => {
  const combinations = []

  const latestDocsVersion = metadata.data.docs.latest
  const entrypoint = _.get(metadata, [ 'data', 'docs', 'tags', latestDocsVersion, '0' ])

  const entryUrl = entrypoint && _.find(routes, (definition) => {
    return (
      definition.context.article &&
      definition.context.article.content.filename === entrypoint.filename
    )
  })

  const steps = metadata.data.installation && metadata.data.installation.steps.reduce((accumulator, step) => {
    accumulator.push({
      command: _.last(step[0]).replace(/\n/g, ''),
      comment: true
    })

    accumulator.push({
      command: _.last(_.last(_.last(step))).replace(/\n/g, ''),
      comment: false
    })

    return accumulator
  }, [])

  if (metadata.data.name && metadata.data.description && entryUrl) {
    combinations.push({
      title: metadata.data.name,
      description: metadata.data.description,
      packageName: metadata.data.name,
      action: `/${entryUrl.path.join('/')}`,
      steps,
      type: metadata.data.type,
      repositoryUrl: metadata.data.links.repository
    })
  }

  if (metadata.data.name && metadata.data.description) {
    combinations.push({
      title: metadata.data.name,
      description: metadata.data.description,
      packageName: metadata.data.name,
      steps,
      type: metadata.data.type,
      repositoryUrl: metadata.data.links.repository
    })
  }

  if (metadata.data.name) {
    combinations.push({
      title: metadata.data.name,
      packageName: metadata.data.name,
      steps,
      type: metadata.data.type,
      repositoryUrl: metadata.data.links.repository
    })
  }

  return combinations
}

export const render = (props) => {
  const theme = useTheme()
  const commands = props.steps || []
  return (
    <Box py={5} bg={theme.colors.primary.light}>
      <Container>
        <Flex flexDirection="column" alignItems="center" mb={40}>
          <Heading.h1 color={theme.colors.primary.main} fontSize={62}>{props.title}</Heading.h1>
          {props.description && (
            <Heading.h2 fontSize={24}>{props.description}</Heading.h2>
          )}
        </Flex>
        {commands.length > 0 && <Terminal commands={commands} />}
        {props.action && (
          <Txt align="center" mt={40}>
            <Button m={2} href={props.action} primary>
              Get started
            </Button>
          </Txt>
        )}
      </Container>
    </Box>
  )
}
