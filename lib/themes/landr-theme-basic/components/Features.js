import React from 'react'
import { Heading, Container, Flex, Box, Image, Text } from 'resin-components'

export default (props) => {
  return (
    <Flex color={'white'} bg={props.theme.colors.primary.main} py={5}>
      <Container>
        <Heading mb={3} align='center'>Features</Heading>
        <Flex wrap>
          {
            props.landrConfig.settings.features.map((feature) => {
              return (
                <Box my={5} align='center' px={2} width={[1, 1/3]}>
                  <Image m='auto' mb={2} w={['50px', '70px']} src={feature.image} />
                  <Heading.h4 mb={2} align='center'>{feature.title}</Heading.h4>
                  <Text align='center' dangerouslySetInnerHTML={{ __html: feature.description }} />
                </Box>
              )
            })
          }

        </Flex>
      </Container>
    </Flex>
  )
}
