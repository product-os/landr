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
  format, parseISO
} from 'date-fns'
import {
  Box,
  Card,
  Divider,
  Tag,
  Container,
  Flex,
  List,
  Heading,
  Txt
} from 'rendition'

export const name = 'Changelog'

export const variants = (metadata) => {
  const combinations = []

  if (metadata.data.changelog) {
    combinations.push({
      changelog: metadata.data.changelog
    })
  }

  return combinations
}

export const render = ({
  changelog
}) => {
  return (
    <Box my={5}>
      <Container style={{
        maxWidth: 800
      }}>
        <Heading.h2 mb={4} align="center">
          Changelog
        </Heading.h2>
        <Card>
          {changelog.map((entry) => {
            return (
              <Box key={entry.version} mb={4}>
                <Flex justifyContent="space-between" alignItems="flex-end">
                  <Tag value={entry.version}></Tag>
                  <Txt fontSize={0}>{format(parseISO(entry.date), 'yyyy/MM/dd')}</Txt>
                </Flex>
                <Divider my={2} />
                <List px={3} py={2}>
                  {entry.commits.map((commit) => {
                    return (
                      <Box key={commit.hash}>
                        <Txt.span bold mr={1} fontSize={2}>
                          {commit.subject}
                        </Txt.span>
                        <Txt.span fontSize={0}>by {commit.author}</Txt.span>
                      </Box>
                    )
                  })}
                </List>
              </Box>
            )
          })}
        </Card>
      </Container>
    </Box>
  )
}
