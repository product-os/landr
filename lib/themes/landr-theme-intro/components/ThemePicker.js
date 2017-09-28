import React from 'react'
import { Container, Subhead, Flex, Box, Text, Link } from 'rebass'
import styled from 'styled-components'
import ForkIcon from 'react-icons/lib/go/repo-forked'
import WandIcon from 'react-icons/lib/fa/magic'

const Span = styled(Text)`
  display: inline-block;
  color: ${(props) => props.color}
`

// TODO inject this via props
const THEMES = [
  {
    name: 'landr-theme-welcome',
    description: 'The landr welcome docs'
  },
  {
    name: 'landr-theme-basic',
    description: 'A beautiful basic theme for small projects'
  },
  {
    name: 'landr-theme-etcher',
    description: 'A personalized theme for etcher.io'
  }
]

export default ({ children }) => {
  return (
    <Container mb={5}>
      <Flex justify={'space-between'}>
        <Box>
          <Subhead>Pick a theme</Subhead>
        </Box>
        <Box>
          <Link><Span mr={2}>Fork a theme<ForkIcon /></Span></Link>
          <Link><Span>Create a custom theme<WandIcon /></Span></Link>
        </Box>
      </Flex>
      <Flex>
        {
          THEMES.map(theme => {
            return (
              <Box key={theme.name} pr={1} width={[ 1, 1, 1 / 3 ]}>
                <Box bg='black' mb={3} p={5} />
                <Text caps bold>{theme.name}</Text>
                <Text>{theme.description}</Text>
              </Box>
            )
          })
        }
      </Flex>
    </Container>
  )
}
