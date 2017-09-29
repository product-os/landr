import React from 'react'
import styled, { withTheme } from 'styled-components'
import get from 'lodash/get'
import StarIcon from 'react-icons/lib/go/star'
import TweetIcon from 'react-icons/lib/ti/social-twitter-circular'
import { Heading, Button, DropDownButton, Text, Banner, Image } from 'resin-components'
import Link from 'components/Link'
const Span = styled(Text)`
  display: inline-block;
`

const Asset = (asset, color) => {
  return <Link color={color} p={2} to={asset.browser_download_url}>{asset.name}</Link>
}

export default (props) => {
  const latestRelease = props.releases[0]
  return (
    <Banner bg={props.theme.colors.gray.dark} color='white'>
      <Heading.h1>{props.landrConfig.settings.lead || props.repository.name}</Heading.h1>
      <Heading.h4 weight={'100'} mb={3}>{props.repository.description}</Heading.h4>
      <DropDownButton
        primary
        label={Asset(latestRelease.assets[0], 'white')}
      >
        {
          latestRelease.assets.map(asset => {
            return (Asset(asset, props.theme.colors.gray.dark))
          })
        }
      </DropDownButton>
      <Text my={2}>{get(latestRelease, 'tag_name')} - <Link to='/changelog/'>See whats new</Link></Text>
      <div>
        <Link to={props.repository.html_url}><Span mr={2}>Star <StarIcon /></Span></Link>
        <Link to={'https://twitter.com'}><Span>Tweet <TweetIcon /></Span></Link>
      </div>
    </Banner>
  )
}
