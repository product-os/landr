import React from 'react'
import { Heading, Container, Flex, Box, Image, Text, Divider } from 'resin-components'
import Accordian from 'components/Accordian'
import { withTheme } from 'styled-components'

const FAQ = props => {
  const items = props.faqs.map(faq => {
    return {
      title: <Heading.h4 mb={2} align="center">
        {faq.title}
        <Divider w={'50%'} color={props.theme.colors.gray.light} />
      </Heading.h4>,
      body: <Box><Text.p
        align="center"
        dangerouslySetInnerHTML={{ __html: faq.html }}
      >{faq.html}</Text.p></Box>
    }
  })
  return (
    <Flex py={5}>
      <Container>
        <Heading.h2 mb={3} align="center">
          Frequently Asked Questions
        </Heading.h2>
        <Accordian items={items} />
      </Container>
    </Flex>
  )
}

export default withTheme(FAQ)
