import React from 'react'
import styled, { withTheme } from 'styled-components'
import get from 'lodash/get'
import { Heading, Button, Text, Banner, Image, Box, Flex } from 'resin-components'
import Link from 'components/Link'
import images from 'images'
import DownloadButton from 'components/DownloadButton'
import Code from 'components/Code'
import Star from 'components/github-button'
import { Share } from 'react-twitter-widgets'

export default props => {
  const latestRelease = props.releases[0]
  const latestAssets = get(latestRelease, 'assets')
  const version = get(latestRelease, 'tag_name')
  const callToActionCommand =  get(props, 'config.settings.callToActionCommand')
  return (
    <Banner bg={props.theme.colors.gray.dark} color="white">
      <Image
        align='center'
        style={{ height: '100px' }}
        mb={3}
        src={images[`${props.repository.name}`]}
      />
      <Heading.h2 align='center' mb={3}>
        {props.config.settings.lead || props.repository.description || props.repository.name}
      </Heading.h2>
      {
        callToActionCommand ?
        <Box>
          <Code>{props.config.settings.callToActionCommand}</Code>
          {
            // TODO use Link component for #downloads
          }
          <Text.p align="center">Or <a href="#downloads">download</a></Text.p>
        </Box>
        : latestAssets && <DownloadButton mb={3} assets={latestAssets} />
      }
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
