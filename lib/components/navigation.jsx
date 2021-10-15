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
import styled from 'styled-components'
import {
  Box, Img, Container, Heading, Flex, useTheme
} from 'rendition'
import GithubBanner from './presentational/github-banner'
import Link from './presentational/link'

export const name = 'Navigation'

export const variants = (metadata, _context, _route, routes) => {
  const combinations = []

  const toplevelRoutes = routes
    .filter((definition) => {
      return definition.path.length === 1
    })
    .map((definition) => {
      return {
        name: _.capitalize(definition.path[0]),
        url: `/${definition.path[0]}`
      }
    })

  if (metadata.data.links.repository) {
    if (metadata.data.version) {
      toplevelRoutes.push({
        name: `v${metadata.data.version}`,
        url: metadata.data.links.repository.replace('.git', '')
      })
    }
  }

  if (
    (metadata.data.images.banner ||
      (metadata.data.github.owner.logo &&
        metadata.data.github.owner.logo.base64)) &&
    metadata.data.links.repository
  ) {
    combinations.push({
      name: metadata.data.name,
      logo:
        metadata.data.images.banner ||
        (metadata.data.github.owner.logo &&
          metadata.data.github.owner.logo.base64),
      routes: toplevelRoutes,
      githubUrl: metadata.data.isHumanRepo
        ? null
        : metadata.data.links.repository
    })
  }

  if (metadata.data.links.repository) {
    combinations.push({
      name: metadata.data.name,
      routes: toplevelRoutes,
      githubUrl: metadata.data.isHumanRepo
        ? null
        : metadata.data.links.repository
    })
  }

  return combinations
}

const Wrapper = styled(Box) `
  color: ${({
    theme
  }) => {
    return theme.colors.text.main
  }};
`

const GithubRedirect = styled(Link) `
  position: absolute;
  right: 0;
  top: -30px;
`

const Navigation = (props) => {
  const theme = useTheme()

  const Brand = props.logo ? (
    <Img
      style={{
        height: '50px'
      }}
      src={props.logo}
    />
  ) : (
    <Heading.h1 color="#527699" fontSize={26}>
      {props.name}
    </Heading.h1>
  )

  const links = props.routes.map((route) => {
    return <Link key={route.name} url={route.url} text={route.name}></Link>
  })

  return (
    <Wrapper px={16} py={30}>
      <Container>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          style={{
            position: 'relative'
          }}
        >
          <Link color="white" url={'/'}>
            {Brand}
          </Link>
          <Flex fontSize={2} mx={-2}>
            {links}
          </Flex>
          {props.githubUrl && (
            <GithubRedirect href={props.githubUrl} blank>
              <GithubBanner fill={theme.colors.primary.main} />
            </GithubRedirect>
          )}
        </Flex>
      </Container>
    </Wrapper>
  )
}

export const render = (props) => {
  return <Navigation {...props} />
}
