import React from 'react'
import Link from 'components/Link'
import { Container, Box, Heading, Text } from 'resin-components'

function createMarkup(html) {
  return {__html: html};
}

export default ({ changelog }) => {
  return (
    <Container>
      <div dangerouslySetInnerHTML={createMarkup(changelog)} />
    </Container>
  )
}
