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
import {
  Box,
  Img,
  Container,
  Heading,
  Flex,
  useTheme,
  Link as RLink
} from 'rendition'
import GithubBanner from './presentational/github-banner'
import Link from './presentational/link'
import {
  getStructuredRoutes
} from '../utils'

export const name = 'Navigation'

export const variants = (metadata, context, route, routes) => {
  const combinations = []

  let brandLink = '/'
  let githubUrl =
    (metadata.data.links && metadata.data.links.repository) || null

  const {
    topLevelRoutes
  } = getStructuredRoutes(routes, route)

  const teamMember =
    metadata.data.teamMembers &&
    metadata.data.teamMembers.find((item) => {
      return item.slug === route.base.slice().reverse()[0]
    })

  if (teamMember) {
    brandLink = `/${teamMember.slug}`
  }

  if (metadata.data.isHumanRepo || teamMember) {
    githubUrl = null
  }

  if (githubUrl) {
    githubUrl = githubUrl.replace('.git', '')
  }

  if (githubUrl && !teamMember) {
    if (metadata.data.version) {
      topLevelRoutes.push({
        name: `v${metadata.data.version}`,
        url: githubUrl.replace('.git', '')
      })
    }
  }

  if (
    metadata.data.images.banner ||
    (metadata.data.github.owner.logo && metadata.data.github.owner.logo.base64)
  ) {
    combinations.push({
      name: metadata.data.name,
      logo:
        metadata.data.images.banner ||
        (metadata.data.github.owner.logo &&
          metadata.data.github.owner.logo.base64),
      routes: topLevelRoutes,
      brandLink,
      githubUrl
    })
  }

  if (githubUrl) {
    combinations.push({
      name: metadata.data.name,
      routes: topLevelRoutes,
      brandLink,
      githubUrl
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

const GithubRedirect = styled(RLink) `
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
    return (
      <Link mx={2} key={route.name} url={route.url} text={route.name}></Link>
    )
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
          <Link color="white" url={props.brandLink || '/'}>
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

export default {
  name,
  render,
  variants
}
