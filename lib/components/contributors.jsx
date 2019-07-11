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
import sortBy from 'lodash/sortBy'
import {
  Alert,
  Box,
  Img,
  Container,
  Flex,
  Link,
  Heading,
  Txt
} from 'rendition'
import styled from 'styled-components'

export const name = 'Contributors'

export const variants = (metadata) => {
  const combinations = []

  if (
    metadata.data.contributors &&
    metadata.data.links.repository &&
    metadata.data.contributing.guide &&
    metadata.data.maintainers
  ) {
    combinations.push({
      contributors: metadata.data.contributors,
      maintainers: metadata.data.maintainers,
      redirect: `${metadata.data.links.repository}/blob/master/${
        metadata.data.contributing.guide.filename
      }`
    })
  }

  if (
    metadata.data.contributors &&
    metadata.data.links.repository &&
    metadata.data.contributing.guide &&
    metadata.data.maintainers
  ) {
    combinations.push({
      contributors: metadata.data.contributors,
      maintainers: metadata.data.maintainers,
      redirect: `${metadata.data.links.repository}/blob/master/${
        metadata.data.contributing.guide.filename
      }`
    })
  }

  if (
    metadata.data.contributors &&
    metadata.data.links.repository &&
    metadata.data.maintainers
  ) {
    combinations.push({
      contributors: metadata.data.contributors,
      maintainers: metadata.data.maintainers,
      redirect: metadata.data.links.repository
    })
  }

  // If there isn't any repo link, it's safe to say we don't have codeowners
  if (metadata.data.contributors) {
    combinations.push({
      contributors: metadata.data.contributors
    })
  }

  return combinations
}

const GITHUB_PROFILE_PATH = 'https://github.com'

const PlaceholderPhoto = styled(Flex) `
  font-size: 12px;
  padding: 8px;
  height: 65px;
  width: 65px;
  border-radius: 8px;
  border: 1px dashed #c1c7dd;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 3px #5f5f5f;
`

export const render = (props) => {
  const list = sortBy(props.contributors, 'username').map((contributor) => {
    return (
      <Box key={contributor.username} px={2}>
        <Link
          href={`${GITHUB_PROFILE_PATH}/${contributor.username}`}
          tooltip={contributor.username}
          blank
        >
          <Img
            src={contributor.avatar}
            style={{
              height: '65px',
              borderRadius: 8,
              boxShadow: '0px 2px 3px #5f5f5f;'
            }}
          />
        </Link>
      </Box>
    )
  })

  const CTA = (
    <Box mt={3}>
      <Txt fontSize={16}>
        Help Landr thrive, by reporting bugs, contributing code or improving the
        docs.
      </Txt>
      <Txt fontSize={16}>
        Jump in and get your hands dirty with some selected{' '}
        <Link
          blank
          href="https://github.com/balena-io/landr/labels/good%20first%20issue"
        >
          good first issues!
        </Link>
      </Txt>
    </Box>
  )

  const maintainers = props.maintainers ? (
    <Alert mt={3} info style={{
      display: 'inline-flex'
    }}>
      If you need any help, please ping{' '}
      {props.maintainers.map((maintainer, index) => {
        return (
        <>
        {index === props.maintainers.length - 1 && index > 0 && 'or '}
        <Link href={`${GITHUB_PROFILE_PATH}/${maintainer}`} blank>
          @{maintainer}
        </Link>
        {index < props.maintainers.length - 1 && ', '}
        </>
        )
      })}
    </Alert>
  ) : null

  return (
    <Box p={3} my={3}>
      <Container textAlign="center">
        <Box mb={4}>
          <Heading.h2 mb={1}>Made possible by</Heading.h2>
        </Box>
        <Flex mx={-2} flexWrap="wrap" justifyContent="center">
          {list}
          <Box px={2}>
            {props.redirect ? (
              <Link href={props.redirect} blank>
                <PlaceholderPhoto>Reserved for you</PlaceholderPhoto>
              </Link>
            ) : (
              <PlaceholderPhoto>Reserved for you</PlaceholderPhoto>
            )}
          </Box>
        </Flex>
        {CTA}
        {maintainers}
      </Container>
    </Box>
  )
}

// TODO: If there are more that X contributors -> link to a new page
