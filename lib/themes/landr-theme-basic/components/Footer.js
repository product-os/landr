import React from 'react'
import { Flex, Box, Text, Link, Image } from 'rebass'
import HeartIcon from 'react-icons/lib/go/heart'
import styled, { withTheme } from 'styled-components'

const Footer = ({ repository }) => {
  return (
    <Box py={50} bg='gray6' color='white'>
      <Text center>
        Made with <HeartIcon />{' '}
        <Link href={repository.owner.html_url} target={'blank'}>
          {repository.owner.login}
        </Link>
      </Text>
      <Flex my={2} justify='center'>
        <Box>
          <Image width={50} src={repository.owner.avatar_url} />
        </Box>
      </Flex>
      <Text center>{repository.license.name}</Text>
    </Box>
  )
}

export default withTheme(Footer)
