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
  Box, Container, Flex, Img, Txt
} from 'rendition'
import styled from 'styled-components'
import Link from './presentational/link'
import {
  Map
} from './presentational/map'

const getNameImage = (name) => {
  if (!name) return ''
  const [ firstName, lastName ] = name.split(' ')

  const firstChar = firstName.charAt(0)
  let lastChar = ''

  if (lastName) {
    lastChar = lastName.charAt(0)
  }
  return `${firstChar.toUpperCase()}${lastChar}`
}

const NameAvatar = styled(Txt) `
  width: 56px;
  height: 56px;
  font-size: 30px;
  text-align: center;
  background: #dde1f0;
`

export const variants = (metadata, context, route) => {
  const combinations = []

  const homepageLink = metadata.data.links.homepage

  const teamMembers =
    metadata.data.teamMembers &&
    metadata.data.teamMembers.map((item) => {
      return {
        handle: item.data.balena.yml.handle || item.slug,
        link: item.data.links.homepage
          ? item.data.links.homepage.replace(homepageLink, '')
          : `/team/${item.slug}/`,
        name: item.data.balena.yml.data.name,
        avatar:
          item.data.balena.yml.data.profile_photo &&
          item.data.balena.yml.data.profile_photo.base64,
        lat: item.data.balena.yml.data.lat,
        lng: item.data.balena.yml.data.lng,
        city: item.data.balena.yml.data.city,
        country: item.data.balena.yml.data.country
      }
    })

  if (teamMembers) {
    combinations.push({
      teamMembers
    })
  }

  return combinations
}
export const name = 'Team'

export const render = (props, _analytics, config) => {
  const {
    envVars: {
      googleMapsKey: apiKey
    }
  } = config

  return (
    <Box bg="gray.light">
      <Container py={3}>
        <Flex width="100%">
          <Box
            height="100%"
            maxHeight={'100vh'}
            style={{
              overflowY: 'scroll',
              borderRadius: 16
            }}
            maxWidth="100%"
            width={1 / 3}
            mr={4}
          >
            <Flex flexDirection="column" bg="#fff">
              <Box
                style={{
                  borderBottom: '1px solid #dde1f0',
                  textAlign: 'center'
                }}
                py={1}
              >
                Team Members ({props.teamMembers.length})
              </Box>
              {props.teamMembers.map((item) => {
                return (
                  <Flex
                    key={item.handle}
                    style={{
                      borderBottom: '1px solid #dde1f0'
                    }}
                    p={3}
                  >
                    <Box bg="gray.light" height={56} mr={2}>
                      {item.avatar ? (
                        <Img
                          src={item.avatar}
                          style={{
                            width: 56,
                            height: 56
                          }}
                        />
                      ) : (
                        <NameAvatar>
                          {getNameImage(item.name || item.handle)}
                        </NameAvatar>
                      )}
                    </Box>
                    <Link url={item.link}>
                      <Flex flexDirection="column">
                        <Txt bold fontSize="16px" py={2}>
                          {item.name || item.handle}
                        </Txt>
                        <Txt fontSize="14px" pb={2} color="text.light">
                          {item.city
                            ? `${item.city} ${
                              item.country ? `, ${item.country || ''}` : ''
                            }`
                            : item.country || ''}
                        </Txt>
                      </Flex>
                    </Link>
                  </Flex>
                )
              })}
            </Flex>
          </Box>
          <Box
            bg="primary.main"
            maxHeight={'100vh'}
            height="800px"
            maxWidth="100%"
            width={2 / 3}
            style={{
              borderRadius: 16,
              overflow: 'hidden'
            }}
          >
            <Map
              apiKey={apiKey}
              markers={props.teamMembers.map((member) => {
                return {
                  id: member.handle,
                  lat: member.lat,
                  lng: member.lng
                }
              })}
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default {
  name,
  render,
  variants
}
