import React from 'react'
import { Flex, Box, Container, Heading, Text, Link } from 'rebass'
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
    <Container bg="gray6" color="white">
      <Heading>{props.lead || props.repository.name}</Heading>
      <Text>{props.repository.description}</Text>
      <Text my={2}>{get(latestRelease, 'tag.name')} - <Link color="white">See whats new</Link></Text>
      <div>
        <Span mr={2}>Star <StarIcon /></Span>
        <Span>Tweet <TweetIcon /></Span>
      </div>
    </Container>
  )
}
