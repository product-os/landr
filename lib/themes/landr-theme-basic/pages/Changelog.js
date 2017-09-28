import React from 'react'
import { Container, Subhead, Text, Box, Link } from 'rebass'

export default (props) =>  {
  return (
    <Container>
      {
        props.repository.releases.edges.map((release, i) => {
          return (
            <Box my={4} key={i}>
              <Text center>
                <Subhead is={Link} href={release.node.url}>{release.node.tag.name}</Subhead>
              </Text>
            </Box>
          )
        })
      }
    </Container>
  )
}
