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
import isEmpty from 'lodash/isEmpty'
import {
  Box,
  Img,
  Container,
  Flex,
  Link,
  Heading,
  Txt,
  useTheme
} from 'rendition'
import {
  getStructuredRoutes
} from './utils'
import styled from 'styled-components'

export const name = 'Footer'

const Divider = styled(Box).attrs({
  mx: 2
}) `
  border-left: 1px solid;
  height: 11px;
`

export const variants = (metadata, context, route, routes) => {
  const combinations = []

  let githubUrl =
    (metadata.data.links && metadata.data.links.repository) || null

  const {
    topLevelRoutes, secondaryRoutes
  } = getStructuredRoutes(
    routes,
    route
  )

  const teamMember =
    metadata.data.teamMembers &&
    metadata.data.teamMembers.find((item) => {
      return item.slug === route.base.slice().reverse()[0]
    })

  if (metadata.data.isHumanRepo || teamMember) {
    githubUrl = null
  }

  if (githubUrl && !teamMember) {
    topLevelRoutes.push({
      name: 'GitHub',
      url: githubUrl.replace('.git', '')
    })
  }

  if (metadata.data.github.owner && metadata.data.images.banner) {
    combinations.push({
      name: metadata.data.name,
      owner: metadata.data.github.owner,
      logo: metadata.data.images.banner,
      routes: topLevelRoutes,
      secondaryRoutes,
      toc: context.toc,
      docsTableOfContent: context.docsTableOfContent
    })
  }

  if (metadata.data.github.owner) {
    combinations.push({
      name: metadata.data.name,
      owner: metadata.data.github.owner,
      routes: topLevelRoutes,
      secondaryRoutes,
      toc: context.toc,
      docsTableOfContent: context.docsTableOfContent
    })
  }

  return combinations
}

const Footer = (props) => {
  const theme = useTheme()
  const toc = (props.docsTableOfContent || props.toc).map((page, index) => {
    const url = `/${page.path.join('/')}`
    return (
      <Box key={index} mb={1}>
        <Link color="#527699" fontSize={13} href={url}>
          {page.title}
        </Link>
      </Box>
    )
  })

  const links = props.routes.map((route, index) => {
    return (
      <Box key={index} mb={1}>
        <Link color="#527699" fontSize={13} href={route.url}>
          {route.name}
        </Link>
      </Box>
    )
  })

  const brand = props.logo ? (
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

  const owner = isEmpty(props.owner) ? null : (
    <Flex alignItems="center" mt={3}>
      <Txt fontSize={12}>Brought to you by</Txt>{' '}
      <Link
        color={theme.colors.text.main}
        href={props.owner.url}
        tooltip={props.owner.name}
      >
        <Flex>
          <Img
            src={props.owner.avatar}
            alt={props.owner.name}
            ml={2}
            style={{
              height: 26
            }}
          />
          <Txt.span>{props.owner.name}</Txt.span>
        </Flex>
      </Link>
    </Flex>
  )

  return (
    <>
      <Box
        px={3}
        py={5}
        mt={5}
        style={{
          position: 'relative',
          zIndex: 3
        }}
        bg="#f8f9fd"
      >
        <Container>
          <Flex justifyContent="center">
            <Flex
              width={[ 1, 1, 1, 5 / 6 ]}
              mx={-16}
              justifyContent={[ 'flex-start', 'flex-start', 'space-between' ]}
              flexWrap="wrap"
            >
              <Box px={16} width={[ 1, 1, 1 / 2 ]} mb={3}>
                {brand}
                {owner}
              </Box>
              <Box px={16} pt={14}>
                <Heading.h4 mb={2} fontSize={14}>
                  Navigation
                </Heading.h4>
                {links}
              </Box>
              {!isEmpty(toc) && (
                <Box px={16} pt={14}>
                  <Heading.h4 mb={2} fontSize={14}>
                    Docs
                  </Heading.h4>
                  {toc}
                </Box>
              )}
            </Flex>
          </Flex>
        </Container>
      </Box>
      {props.secondaryRoutes && props.secondaryRoutes.length > 0 && (
        <Container>
          <Flex
            justifyContent="center"
            alignItems="center"
            p={15}
            flexWrap="wrap"
          >
            {props.secondaryRoutes.map((route, index) => {
              return (
                <React.Fragment key={index}>
                  <Link color="gray.dark" fontSize={13} href={route.url}>
                    {route.name}
                  </Link>
                  {index + 1 === props.secondaryRoutes.length ? null : (
                    <Divider />
                  )}
                </React.Fragment>
              )
            })}
          </Flex>
        </Container>
      )}
    </>
  )
}

export const render = (props) => {
  return <Footer {...props} />
}

export default {
  name,
  render,
  variants
}
