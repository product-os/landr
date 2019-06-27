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
  Box,
  Img,
  Link,
  Container,
  Txt,
  Flex
} from 'rendition'

export const name = 'Navigation'

export const variants = (metadata) => {
  const combinations = []

  if (metadata.data.images.banner && metadata.data.links.repository) {
    combinations.push({
      logo: metadata.data.images.banner,
      githubUrl: metadata.data.links.repository
    })
  }

  if (metadata.data.images.banner) {
    combinations.push({
      logo: metadata.data.images.banner
    })
  }

  if (metadata.data.name && metadata.data.links.repository) {
    combinations.push({
      name: metadata.data.name,
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

  return (
    <Box p={3} bg={'#2a5070'} color="#fff">
      <Container>
        <Flex justifyContent="space-between" alignItems="center">
          <Link color='white' href={'/'}>{Brand}</Link>
          <Flex fontSize={'1.1em'}>
            <Link blank color="#fff"
              href={props.githubUrl} aria-labelledby='Github'>
              GitHub
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
