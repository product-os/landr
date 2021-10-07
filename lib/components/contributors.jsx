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
import size from 'lodash/size'
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
import styled from 'styled-components'

import ContributeIcon from './presentational/contribute-icon'
import HeartIcon from './presentational/heart-icon'

export const name = 'Contributors'

export const variants = (metadata, _context, route) => {
  const combinations = []

  if (metadata.data.isHumanRepo) {
    return []
  }

  if (
    size(metadata.data.contributors) > 36 &&
    route.path.length === 0 &&
    metadata.data.links.repository
  ) {
    combinations.push({
      minimalView: true
    })
  }

  if (metadata.data.contributors && metadata.data.links.repository) {
    combinations.push({
      name: metadata.data.name,
      contributors: metadata.data.contributors,
      repository: metadata.data.links.repository,
      contributing: metadata.data.contributing.guide
        ? `${metadata.data.links.repository.replace('.git', '')}/blob/master/${
          metadata.data.contributing.guide.filename
        }`
        : null
    })
  }

  return combinations
}

const GITHUB_PROFILE_PATH = 'https://github.com'

const ContributorsPageRedirect = () => {
  return (
    <Link ml={2} href="/contributors">
      many awesome people!
    </Link>
  )
}

const PlaceholderPhoto = styled(Flex) `
  font-size: 11px;
  padding: 6px;
  height: 80px;
  width: 80px;
  border-radius: 12px;
  border: 1px dashed
    ${(props) => {
    return props.theme.colors.primary.main
  }};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Contributors = (props) => {
  const theme = useTheme()
  let {
    contributors
  } = props
  if (!props.minimalView) {
    contributors = contributors.slice(0, 10)
  }
  const list = contributors.map((contributor) => {
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
              height: '80px',
              borderRadius: 6
            }}
          />
        </Link>
      </Box>
    )
  })

  const CTA = props.repository ? (
    <Box>
      <Txt>
        Help {props.name} thrive, by reporting bugs, contributing code or
        improving the docs.
      </Txt>
      <Txt>
        Jump in and get your hands dirty with some selected{' '}
        <Link blank href={`${props.repository.replace('.git', '')}/contribute`}>
          good first issues!
        </Link>
      </Txt>
    </Box>
  ) : null

  const ContributePlaceholder = (
    <PlaceholderPhoto>
      <Box my={1}>
        <ContributeIcon size={28} fill={theme.colors.primary.main} />
      </Box>
      <Txt>Reserved for you</Txt>
    </PlaceholderPhoto>
  )

  return (
    <Box my={100}>
      <Container textAlign="center">
        <Heading.h2 fontSize={34} mb={30} align="center">
          <Flex alignItems="center" justifyContent="center">
            Made with{' '}
            <Txt mx={2}>
              <HeartIcon />
            </Txt>{' '}
            by {props.minimalView && <ContributorsPageRedirect />}
          </Flex>
        </Heading.h2>
        {!props.minimalView && (
          <>
            <Flex mx={-2} flexWrap="wrap" justifyContent="center" mb={24}>
              {list}
              <Box px={2}>
                {props.contributing ? (
                  <Link href={props.contributing} blank>
                    {ContributePlaceholder}
                  </Link>
                ) : (
                  ContributePlaceholder
                )}
              </Box>
            </Flex>
            {CTA}
          </>
        )}
      </Container>
    </Box>
  )
}

export const render = (props) => {
  return <Contributors {...props} />
}
