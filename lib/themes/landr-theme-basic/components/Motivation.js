import React from 'react'
import { Flex, Box, Container, Text, Heading } from 'resin-components'

function createMarkup(html) {
  return { __html: html }
}

const Wrapper = Box.extend`
  max-width: 450px;
  color: white;
`

export default props => {
  return (
    <Flex bg={props.theme.colors.gray.dark} py={5}>
      <Container>
        <Heading.h2 mb={5} color="white" align="center">
          Why {props.repository.name}?
        </Heading.h2>
        <Flex wrap justify='center'>
          <Wrapper>
            <Text.p
              align="left"
              dangerouslySetInnerHTML={createMarkup(props.config.settings.motivation)}
            >
            </Text.p>
          </Wrapper>
        </Flex>
      </Container>
    </Flex>
  )
}
