import React from 'react'
import { Flex, Container, Box } from 'resin-components'
import Link from 'components/Link'

export default props => {
  return (
    <Container>
      <Flex justify="center">
        <Box my="30vh">
          <h1>Oops, Nothing to see here.</h1>
          <Link to="/">Take me home</Link>
        </Box>
      </Flex>
    </Container>
  )
}
