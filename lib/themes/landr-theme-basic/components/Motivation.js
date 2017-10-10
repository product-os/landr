import React from 'react'
import { Flex, Box, Container, Text } from 'resin-components'

function createMarkup(html) {
  return { __html: html }
}

export default props => {
  return (
    <Flex bg={props.theme.colors.gray.dark} py={5}>
      <Container>
        <Flex wrap>
          {props.config.settings.motivation.map(motive => {
            return (
              <Box p={2} width={[1, 1 / 2]}>
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
