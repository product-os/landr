import React from 'react'
import { Flex, Box, Text, Link, Image } from 'rebass'
import HeartIcon from 'react-icons/lib/go/heart'
import Banner from 'components/Banner'

const Footer = ({ repository }) => {
  return (
    <Banner maxHeight={'50px'} py={50} bg="gray6" color="white">
      <Text center>
        Made with <HeartIcon />{' '}
        <Link color={'white'} href={'http://github.com/resin-io'}>
          resin.io
        </Link>
      </Text>
      <Flex my={2} justify="center">
        <Box>
          <Image
            width={50}
            src={'https://avatars2.githubusercontent.com/u/6157842?v=4&s=200'}
          />
        </Box>
      </Flex>
    </Banner>
  )
}

export default Footer
