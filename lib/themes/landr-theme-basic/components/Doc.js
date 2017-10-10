import React from 'react'
import Link from 'components/Link'
import { Container } from 'resin-components'

function createMarkup(html) {
  return { __html: html }
}

export default ({ html }) => {
  return (
    <Container>
      <div dangerouslySetInnerHTML={createMarkup(html)} />
    </Container>
  )
}
