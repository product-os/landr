import React from 'react'
import { Heading, Banner, Text, Link } from 'rebass'
import styled from 'styled-components'
import get from 'lodash/get'
import StarIcon from 'react-icons/lib/go/star'
import TweetIcon from 'react-icons/lib/ti/social-twitter-circular'
import { Button } from 'resin-components'

console.log(Button)

const Span = styled(Text)`
  display: inline-block;
`
export default (props) => {
  const latestRelease = props.releases[0]
  return (
    <Banner bg='gray6' color='white'>
      <Heading>{props.landrConfig.lead || props.repository.name}</Heading>
      <Button primary>hii</Button>
      <Text>{props.repository.description}</Text>
      <Text my={2}>{get(latestRelease, 'tag_name')} - <Link href='/changelog'>See whats new</Link></Text>
      <div>
        <Link href={props.repository.html_url}><Span mr={2}>Star <StarIcon /></Span></Link>
        <Link><Span>Tweet <TweetIcon /></Span></Link>
      </div>
    </Banner>
  )
}
