import React from 'react'
import styled, { withTheme } from 'styled-components'
import get from 'lodash/get'
import StarIcon from 'react-icons/lib/go/star'
import TweetIcon from 'react-icons/lib/ti/social-twitter-circular'
import { Heading, Button, Text, Banner } from 'resin-components'
import Link from 'components/Link'
const Span = styled(Text)`
  display: inline-block;
`

export default (props) => {
  const latestRelease = props.releases[0]
  return (
    <Banner bg={props.theme.colors.gray.dark} color='white'>
      <Heading.h1>{props.landrConfig.lead || props.repository.name}</Heading.h1>
      <Heading.h4>{props.repository.description}</Heading.h4>
      <Text my={2}>{get(latestRelease, 'tag_name')} - <Link to='/changelog/'>See whats new</Link></Text>
      <div>
        <Link to={props.repository.html_url}><Span mr={2}>Star <StarIcon /></Span></Link>
        <Link to={'https://twitter.com'}><Span>Tweet <TweetIcon /></Span></Link>
      </div>
    </Banner>
  )
}
