import React from 'react'
import { Flex, Box, Text, Image } from 'resin-components'
import Link from 'components/Link'
import HeartIcon from 'react-icons/lib/go/heart'
import styled, { withTheme } from 'styled-components'
import get from 'lodash/get'
import resinLogo from '../images/resin.svg'
import images from 'images'

const Footer = ({ repository, ...props }) => {
  return (
    <Box py={50} bg={props.theme.colors.gray.dark} color="white">
      <Flex my={2} align="center" justify="center">
        <Link target to="/">
          <Image
            mr={3}
            style={{ height: '35px' }}
            src={images[repository.name]}
          />
        </Link>
        <Text.span>An open source project by</Text.span>
        <Link target to="https://resin.io">
          <Image
            ml={3}
            style={{ height: '30px' }}
            src={resinLogo}
          />
        </Link>
      </Flex>
      <Box>
        <Text color="gray.main" align="center">{get(repository, 'license.name')}</Text>
      </Box>
    </Box>
  )
}

export default withTheme(Footer)
