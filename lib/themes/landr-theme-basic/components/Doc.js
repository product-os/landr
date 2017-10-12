import React from 'react'
import Link from 'components/Link'
import { Container, Box } from 'resin-components'

function createMarkup(html) {
  return { __html: html }
}

export default ({ html }) => {
  return (
    <Container>
      <Box dangerouslySetInnerHTML={createMarkup(html)} />
    </Container>
  )
}
