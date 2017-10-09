import React from 'react'
import { Flex, Box, Text, Image } from 'resin-components'
import Link from 'components/Link'
import HeartIcon from 'react-icons/lib/go/heart'
import styled, { withTheme } from 'styled-components'
import get from 'lodash/get'

const Footer = ({ repository, ...props }) => {
  return (
    <Box py={50} bg={props.theme.colors.gray.dark} color="white">
      <Text align="center">
        Made with <HeartIcon />{' '}
        <Link to={get(repository, 'owner.html_url')} target={'blank'}>
          {get(repository, 'owner.login')}
        </Link>
      </Text>
      <Flex my={2} justify="center">
        <Link to={get(repository, 'owner.html_url')} target={'blank'}>
          <Box>
            <Image width={50} src={get(repository, 'owner.avatar_url')} />
          </Box>
        </Link>
      </Flex>
      <Text align="center">{get(repository, 'license.name')}</Text>
    </Box>
  )
}

export default withTheme(Footer)
