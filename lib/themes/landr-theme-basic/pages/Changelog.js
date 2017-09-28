import React from 'react'
import { Container, Subhead, Text, Box, Link } from 'rebass'

export default (props) => {
  return (
    <Container>
      {
        props.releases.map((release, i) => {
          return (
            <Box my={4} key={i}>
              <Text center>
                <Subhead is={Link} href={release.html_url}>{release.tag_name}</Subhead>
              </Text>
            </Box>
          )
        })
      }
    </Container>
  )
}
