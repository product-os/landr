import React from 'react'
import { Heading, Button, Banner, Text, Link } from 'rebass'
import styled from 'styled-components'
import get from 'lodash/get'
import StarIcon from 'react-icons/lib/go/star'
import TweetIcon from 'react-icons/lib/ti/social-twitter-circular'

const Span = styled(Text)`
  display: inline-block;
`
export default (props) => {
  const latestRelease = props.repository.releases.edges[0].node
  return(
    <Banner bg="gray6" color="white">
      <Heading>{props.landrConfig.lead || props.repository.name}</Heading>
      <Button my={2}>Download</Button>
      <Text>{props.repository.description}</Text>
      <Text my={2}>{get(latestRelease, 'tag.name')} - <Link>See whats new</Link></Text>
      <div>
        <Link href={props.repository.url}><Span mr={2}>Star <StarIcon /></Span></Link>
        <Link><Span>Tweet <TweetIcon /></Span></Link>
      </div>
    </Banner>
  )
}
