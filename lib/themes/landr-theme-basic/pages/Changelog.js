import React from 'react'
import Link from 'components/Link'
import { Container, Box, Heading, Text } from 'resin-components'

function createMarkup(html) {
  return {__html: html};
}

export default (props) => {
  console.log(props.changelog)
  return (
    <Container>
      <div dangerouslySetInnerHTML={createMarkup(props.changelog)} />
    </Container>
  )
}
