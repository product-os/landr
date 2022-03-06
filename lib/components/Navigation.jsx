/* eslint-disable no-inline-comments */
/* eslint-disable react/jsx-no-bind */
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
import styled, {
  css
} from 'styled-components'
import {
  Box,
  Img,
  Container,
  Heading,
  Flex,
  useTheme,
  Link as RenditionLink,
  Txt,
  Button,
  Fixed
} from 'rendition'
import GithubBanner from './presentational/github-banner'
import Link from './presentational/link'
import {
  getStructuredRoutes
} from './utils'
import NavDropDown from './presentational/NavDropDown'

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'

import {
  faBars
} from '@fortawesome/free-solid-svg-icons/faBars'
import {
  faTimes
} from '@fortawesome/free-solid-svg-icons/faTimes'

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

const GithubRedirect = styled(RenditionLink) `
  position: absolute;
  right: 0;
  top: -30px;
`

export const invertBreakpoint = (breakpoint) => {
  return breakpoint - 0.01
}

export const Wrapper = styled.nav `
  position: relative;
  width: 100%;
  background: white;
  z-index: 5;
  color: ${({
    theme
  }) => {
    return theme.colors.text.main
  }};

  @media (max-width: ${(props) => {
    return invertBreakpoint(props.theme.breakpoints[1])
  }}px) {
    position: sticky;
    background: white;
    top: 0;
    box-shadow: 0px 0px 21px 5px rgba(152, 173, 227, 0.2);

    & + div:first-of-type {
      margin-top: 80px;
    }
  }
`

export const Navbar = styled(Flex) `
  min-height: 80px;
  position: relative;
  flex-direction: column;
  justify-content: center;

  @media (max-width: ${(props) => {
    return invertBreakpoint(props.theme.breakpoints[1])
  }}px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-height: auto;
    padding-top: 16px;
    padding-bottom: 16px;
  }
`

const Actions = styled(Box) `
  justify-content: flex-end;
  align-items: center;
`

const MobileActions = styled(Flex) `
  display: none;
  min-height: 84px;

  @media (max-width: ${(props) => {
    return invertBreakpoint(props.theme.breakpoints[1])
  }}px) {
    display: flex;
  }
`

const NavigationItem = styled(Box) `
  margin: 0;

  a {
    margin: 0 !important;
    color: ${(props) => {
    return props.theme.colors.text.main
  }};
    display: block !important;
    padding-top: 12px !important;
    padding-bottom: 10px !important;
    font-size: initial;

    &:hover:before {
      border: none;
    }
  }

  svg {
    float: right;
    transform: translateY(4px);

    path {
      fill: ${(props) => {
    return props.theme.colors.text.main
  }};
    }
  }
`
const NavigationItems = styled(Flex) `
  @media (max-width: ${(props) => {
    return invertBreakpoint(props.theme.breakpoints[1])
  }}px) {
    position: fixed;
    background: white;
    top: 0;
    right: 0;
    width: 300px;
    bottom: 0;
    justify-content: flex-start;
    transform: translateX(100%);
    transition: transform 200ms ease-in-out;
    padding: 16px;
    overflow: auto;
    flex-wrap: nowrap;

    ${(props) => {
    return props.menuOpen
      ? css `
            position: fixed;
            transform: translateX(0%);
          `
      : ''
  }}
  }
`

const getNavigationRoutes = (routes) => {
  return routes.map((route, index) => {
    if (route.routes) {
      return (
        <NavigationItem pl={[ 0, 0, 3, 3 ]} key={index} mx={15}>
          <NavDropDown title={route.name} showDividers={route.showDividers}>
            {getNavigationRoutes(route.routes)}
          </NavDropDown>
        </NavigationItem>
      )
    }

    return (
      <NavigationItem pl={[ 0, 0, 3, 3 ]} key={index} mx={[ 2, 2, 15 ]}>
        <Link url={route.url} py={1} px={0} display="auto" color="text.main">
          <Txt.span bold>{route.name}</Txt.span>
        </Link>
      </NavigationItem>
    )
  })
}

const Navigation = (props) => {
  const theme = useTheme()
  const [ mobileMenuOpen, setMobileMenuOpen ] = React.useState(false)

  const closeMenu = () => {
    setMobileMenuOpen(false)
  }
  const openMenu = () => {
    setMobileMenuOpen(true)
  }
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

  return (
    <Wrapper role="navigation" aria-label="main-navigation">
      <Container>
        <Navbar>
          <Flex justifyContent="space-between" alignItems="center" width="100%">
            <Flex alignItems="center">
              <Link
                color="white"
                url={props.brandLink || '/'}
                style={{
                  lineHeight: 1
                }}
              >
                {Brand}
              </Link>
            </Flex>
            {mobileMenuOpen && (
              <Fixed
                top
                left
                bottom
                display={[ 'block', 'block', 'none', 'none' ]}
                right
                bg="rgba(0, 0, 0, 0.25)"
                onClick={closeMenu}
              />
            )}
            <Flex>
              <NavigationItems
                menuOpen={mobileMenuOpen}
                flexDirection={[ 'column', 'column', 'row', 'row' ]}
                flexWrap="wrap"
                alignItems={[ 'flex-start', 'flex-start', 'center', 'center' ]}
              >
                {mobileMenuOpen && (
                  <Flex
                    display={[ 'block', 'block', 'none', 'none' ]}
                    justifyContent="flex-end"
                  >
                    <Button
                      plain
                      underline={false}
                      p={1}
                      quaternary
                      icon={<FontAwesomeIcon icon={faTimes} />}
                      onClick={closeMenu}
                    />
                  </Flex>
                )}
                {getNavigationRoutes(props.routes)}

                {props.actions && (
                  <MobileActions
                    mt="auto"
                    pt={5}
                    alignItems="center"
                    justifyContent="center"
                  >
                    {props.actions}
                  </MobileActions>
                )}
              </NavigationItems>
              {props.actions && (
                <Actions display={[ 'none', 'none', 'flex', 'flex' ]} ml={3}>
                  {props.actions}
                </Actions>
              )}
            </Flex>
            {props.githubUrl && (
              <GithubRedirect href={props.githubUrl} blank>
                <GithubBanner fill={theme.colors.primary.main} />
              </GithubRedirect>
            )}
            <Box display={[ 'block', 'block', 'none', 'none' ]}>
              <Button
                style={{
                  fontSize: 20
                }}
                icon={<FontAwesomeIcon icon={faBars} />}
                plain
                onClick={openMenu}
              />
            </Box>
          </Flex>
        </Navbar>
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
