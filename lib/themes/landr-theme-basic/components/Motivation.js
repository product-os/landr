import React from 'react'
import { Flex, Box, Container, Text, Heading } from 'resin-components'

function createMarkup(html) {
  return { __html: html }
}

export default props => {
  return (
    <Flex bg={props.theme.colors.gray.dark} py={5}>
      <Container>
        <Heading.h2 mb={5} color="white" align="center">
          Why {props.repository.name}?
        </Heading.h2>
        <Flex wrap>
          {props.config.settings.motivation.map(motive => {
            return (
              <Box px={2} width={[1/2]}>
                <Text.p
                  color={'white'}
                  dangerouslySetInnerHTML={createMarkup(motive)}
                />
              </Box>
            )
          })}
        </Flex>
      </Container>
    </Flex>
  )
}
