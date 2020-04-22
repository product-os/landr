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
  Box,
  Container,
  Heading,
  useTheme,
  Link,
  Button,
  Flex,
  Card
} from 'rendition'

export const name = 'Downloads'

export const variants = (metadata) => {
  const combinations = []

  if (
    !_.isEmpty(
      _.get(metadata, [ 'data', 'releases', 'latestRelease', 'asssets' ])
    )
  ) {
    combinations.push({
      assets: metadata.data.releases.latestRelease.asssets,
      tag: metadata.data.releases.latestRelease.tagName,
      name: metadata.data.name
    })
  }

  return combinations
}

const Table = styled.table `
  width: 100%;
  thead,
  tbody {
    > tr {
      > th,
      td {
        text-align: left;
      }
      > th {
        padding: 14px 20px 14px 0;
        border-top: 1px solid transparent;
        border-right: 1px solid transparent;
        border-left: 1px solid transparent;
      }
      > td {
        padding: 20px 20px 20px 0;
        border-top: 1px solid rgba(214, 221, 242, 0.5);
        border-right: 1px solid transparent;
        border-left: 1px solid transparent;
        &:last-child {
          padding-left: 0;
          padding-right: 0;
        }
      }
    }
  }
`

const Downloads = (props) => {
  const theme = useTheme()
  return (
    <Box my={100}>
      <Container>
        <Flex justifyContent="center">
          <Box width={(1, 1, 1, 10 / 12)}>
            <Heading.h2 mb={4} center>
              Downloads
            </Heading.h2>
            <Card>
              <Table>
                <thead>
                  <tr>
                    <th>
                      <Heading.h6
                        fontSize={12}
                        color={theme.colors.primary.main}
                      >
                        ASSET
                      </Heading.h6>
                    </th>
                    <th>
                      <Heading.h6
                        fontSize={12}
                        color={theme.colors.primary.main}
                      >
                        OS
                      </Heading.h6>
                    </th>
                    <th>
                      <Heading.h6 fontSize={12} color={theme.colors.primary.main}>
                      ARCH
                      </Heading.h6>
                    </th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {props.assets.map((asset, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {_.capitalize(props.name)} for {asset.os}{' '}
                          {asset.installerType ? (
                            <span>{asset.installerType}</span>
                          ) : null}
                        </td>
                        <td>{asset.os}</td>
                        <td>{asset.arch}</td>
                        <td>
                          <Flex justifyContent="flex-end">
                            <Link ext mx={3} blank href={asset.downloadUrl}>
                              <Button primary mt="auto">
                                Download
                              </Button>
                            </Link>
                          </Flex>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Card>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export const render = (props) => {
  return <Downloads {...props} />
}
