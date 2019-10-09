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
  Box, Img, Container, Flex, Link, Heading, Txt, useTheme
} from 'rendition'
import styled from 'styled-components'

import ContributeIcon from './presentational/contribute-icon'
import heartIcon from './assets/heart.svg'

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
      repository: metadata.data.links.repository,
      contributing: `${metadata.data.links.repository}/blob/master/${
        metadata.data.contributing.guide.filename
      }`
    })
  }

  return combinations
}

const EXCLUDED_CONTRIBUTORS = [ 'balena-ci' ]

const GITHUB_PROFILE_PATH = 'https://github.com'

const PlaceholderPhoto = styled(Flex) `
  font-size: 12px;
  padding: 8px;
  height: 120px;
  width: 120px;
  border-radius: 20px;
  border: 1px dashed ${(props) => { return props.theme.colors.primary.main }};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const render = (props) => {
  const theme = useTheme()
  const list = sortBy(props.contributors, 'username')
    .filter((contributor) => { return !EXCLUDED_CONTRIBUTORS.includes(contributor.username) })
    .map((contributor) => {
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
                height: '120px',
                borderRadius: 8
              }}
            />
          </Link>
        </Box>
      )
    })

  const CTA = props.repository ? (
    <Box>
      <Txt fontSize={14}>
        Help Landr thrive, by reporting bugs, contributing code or improving the
        docs.
      </Txt>
      <Txt fontSize={14}>
        Jump in and get your hands dirty with some selected{' '}
        <Link blank href={`${props.repository.replace('.git', '')}/contribute`}>
          good first issues!
        </Link>
      </Txt>
    </Box>
  ) : null

  const ContributePlaceholder = <PlaceholderPhoto>
    <Box mb={18}>
      <ContributeIcon fill={theme.colors.primary.main} />
    </Box>
    <Txt>Reserved for you</Txt>
  </PlaceholderPhoto>

  return (
    <Box my={130}>
      <Container textAlign="center">
        <Heading.h2 fontSize={34} mb={30} align="center">
          <Flex alignItems="center" justifyContent='center'>
            Made with <Img src={heartIcon} width={32} mx={2} /> by
          </Flex>
        </Heading.h2>
        <Flex mx={-2} flexWrap="wrap" justifyContent="center" mb={24}>
          {list}
          <Box px={2}>
            {props.contributing ? (
              <Link href={props.contributing} blank>
                {ContributePlaceholder}
              </Link>
            ) : (
              {
                ContributePlaceholder
              }
            )}
          </Box>
        </Flex>
        {CTA}
      </Container>
    </Box>
  )
}
