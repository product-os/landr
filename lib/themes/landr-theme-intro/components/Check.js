import React from 'react'
import { Lead, Subhead, Text, Container, Flex, Box } from 'rebass'
import CheckIcon from 'react-icons/lib/md/check'
import includes from 'lodash/includes'
import styled from 'styled-components'

const Span = styled(Text)`
  display: inline-block;
  color: ${(props) => props.color}
`

const TextLabel = styled(Text)`
  color:
`

const CHECKLIST = [
  'name',
  'owner',
  'logo',
  'Installation instructions',
  'licenseInfo',
  'releases',
  'documentation',
  'contributing guide',
  'codeOfConduct',
  'Github stats',
  'languages',
  'Gitter channel'
]

const getLangs = (langs) => {
  return langs.map(edge => {
    return (<Span key={edge.node.name} mr={1} color={edge.node.color}>{edge.node.name}</Span>)
  })
}

export default (props) => {
  return (
    <Container p={5}>
      <Flex>
        <Box width={[1, 1 / 2]}>
          <Box mb={2}>
            <Text color='#95959c' caps>Congratulations on your project</Text>
            <Subhead>{props.repository.name}</Subhead>
          </Box>
          <Box mb={2}>
            <Text color='#95959c' caps>We noticed you use </Text>
            <Text>{props.repository.language}</Text>
          </Box>
          <Box mb={2}>
            <Text color='#95959c' caps>Sounds like a cool project 👇</Text>
            <Text>{props.repository.description}</Text>
          </Box>
        </Box>
        <Box width={[1, 1 / 2]}>
          <Subhead mb={2}>Here is everything we found</Subhead>
          {
            CHECKLIST.map(item => {
              const found = includes(Object.keys(props.repository), item)
              return (<Text key={item} color={!found && '#95959c'}><CheckIcon /> {item}</Text>)
            })
          }
        </Box>
      </Flex>
    </Container>
  )
}
