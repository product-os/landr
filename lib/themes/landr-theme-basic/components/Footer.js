import React from 'react'
import { Flex, Box, Text, Image } from 'resin-components'
import Link from 'components/Link'
import HeartIcon from 'react-icons/lib/go/heart'
import styled, { withTheme } from 'styled-components'

const Footer = ({ repository, ...props }) => {
  return (
    <Box py={50} bg={props.theme.colors.gray.dark} color='white'>
      <Text align='center'>
        Made with <HeartIcon />{' '}
        <Link to={repository.owner.html_url} target={'blank'}>
          {repository.owner.login}
        </Link>
      </Text>
      <Flex my={2} justify='center'>
        <Box>
          <Image width={50} src={repository.owner.avatar_url} />
        </Box>
      </Flex>
      <Text align='center'>{repository.license.name}</Text>
    </Box>
  )
}

export default withTheme(Footer)
