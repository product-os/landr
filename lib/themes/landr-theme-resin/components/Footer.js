import React from 'react'
import { Flex, Box, Text, Image } from 'resin-components'
import { Link } from 'landr'
import { withTheme } from 'styled-components'
import get from 'lodash/get'
import resinLogo from '../images/resin.svg'
import images from 'images'

const Footer = ({ repository, ...props }) => {
  return (
    <Box py={50} bg={props.theme.colors.gray.dark} color="white">
      <Flex mb={3} align="center" justify="center" wrap>
        <Link target to="/">
          <Image
            mr={3}
            style={{ height: '35px' }}
            src={images[repository.name]}
          />
        </Link>
        <Text.span>is an open source project by</Text.span>
        <Link target to="https://resin.io">
          <Image ml={3} style={{ height: '30px' }} src={resinLogo} />
        </Link>
      </Flex>
      <Box>
        <Text fontSize={'14px'} color="gray.main" align="center">
          {repository.name} is released under {get(repository, 'license.name')}
        </Text>
      </Box>
    </Box>
  )
}

export default withTheme(Footer)
