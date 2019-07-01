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
import {
  Box,
  Img,
  Link,
  Container,
  Txt,
  Flex
} from 'rendition'

export const name = 'Navigation'

export const variants = (metadata, context, route, routes) => {
  const combinations = []

  const toplevelRoutes = routes.filter((definition) => {
    return definition.path.length === 1
  }).map((definition) => {
    return {
      name: _.capitalize(definition.path[0]),
      url: `/${definition.path[0]}`
    }
  })

  if (metadata.data.links.repository) {
    toplevelRoutes.push({
      name: 'GitHub',
      url: metadata.data.links.repository
    })
  }

  if (metadata.data.images.banner && metadata.data.links.repository) {
    combinations.push({
      logo: metadata.data.images.banner,
      routes: toplevelRoutes,
      githubUrl: metadata.data.links.repository
    })
  }

  if (metadata.data.images.banner) {
    combinations.push({
      routes: toplevelRoutes,
      logo: metadata.data.images.banner
    })
  }

  if (metadata.data.name && metadata.data.links.repository) {
    combinations.push({
      name: metadata.data.name,
      routes: toplevelRoutes,
      githubUrl: metadata.data.links.repository
    })
  }

  return combinations
}

export const render = (props) => {
  const Brand = props.logo
    ? (<Img style={{
      height: '50px'
    }} src={props.logo} />)
    : (<Txt>{props.name}</Txt>)

  const links = props.routes.map((route, index) => {
    return (<Link key={index} style={{
      marginLeft: 15
    }} color="#fff" href={route.url} aria-labelledby={route.name}>
      {route.name}
    </Link>)
  })

  return (
    <Box p={3} bg={'#6997c3'} color="#fff">
      <Container>
        <Flex justifyContent="space-between" alignItems="center">
          <Link color='white' href={'/'}>{Brand}</Link>
          <Flex fontSize={'1.1em'}>
            {links}
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
