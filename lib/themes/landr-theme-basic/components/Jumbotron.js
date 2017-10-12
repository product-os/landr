import React from 'react'
import styled, { withTheme } from 'styled-components'
import get from 'lodash/get'
import { Heading, Button, Text, Banner, Image, Box, Flex } from 'resin-components'
import Link from 'components/Link'
import images from 'images'
import DownloadButton from 'components/DownloadButton'
import Star from 'components/github-button'
import { Share } from 'react-twitter-widgets'

export default props => {
  const latestRelease = props.releases[0]
  const latestAssets = get(latestRelease, 'assets')
  const version = get(latestRelease, 'tag_name')
  return (
    <Banner bg={props.theme.colors.gray.dark} color="white">
      <Heading.h1 align='center' mt={5} mb={2}>
        {props.config.settings.lead || props.repository.name}
      </Heading.h1>
      <Heading.h4 align='center' weight={'100'} mb={3}>
        {props.repository.description}
      </Heading.h4>
      {latestAssets && <DownloadButton mb={3} assets={latestAssets} />}
      <Flex mb={3}>
        <Box mx={1}>
          <Star
            href={props.repository.html_url}
            data-size="small"
            data-show-count="true"
            >
            Star
          </Star>
        </Box>
        <Box mx={1}>
          <Share
            options={{
              text: `${props.repository.name} - ${props.repository.description}`,
            }}
            url={''}
            >
            Tweet
          </Share>
        </Box>
      </Flex>
      <Text mb={3}>
        {version && `${version} - `}
        <Link to="/changelog/">See whats new</Link>
      </Text>
      {images[`screenshot`] && <Image src={images[`screenshot`]} />}
    </Banner>
  )
}
