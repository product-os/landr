import React from 'react'
import GithubIcon from 'react-icons/lib/go/mark-github'
import { withTheme } from 'styled-components'
import Link from 'components/Link'
import { Navbar, Image, Text, Box, Flex, Container } from 'resin-components'
import images from 'images'
import isEmpty from 'lodash/isEmpty'
import resinLogo from '../images/resin.svg'

const Nav = withTheme(({ repository, ...props }) => {
  const Brand = (
    <Box>
      <Link to="/">
        { images[`${repository.name}`] ?
          <Image
            style={{ height: '40px' }}
            src={images[`${repository.name}`]}
          /> :
          <Text color='white'>{repository.name}</Text>
        }
      </Link>
    </Box>
  )

  return (
    <div>
    <Box
      bg="gray.dark"
      color="white"
    >
      <Container align="left">
        <Box p={2}>
          <Flex align="center">
            <Text.span>An open source project by</Text.span>
            <Link target to="https://resin.io">
              <Image
                ml={2}
                style={{ height: '25px' }}
                src={resinLogo}
              />
            </Link>
          </Flex>
        </Box>
      </Container>
    </Box>
    <Navbar
      align="center"
      brand={Brand}
      color="white"
      bg={props.theme.colors.gray.dark}
    >
      {!isEmpty(props.changelog) && (
        <Link color={'white'} to="/changelog/">
          Changelog
        </Link>
      )}
      {!isEmpty(props.docs) && (
        <Link color={'white'} to={`/docs/${props.docs[0].slug}`}>
          Docs
        </Link>
      )}
      <Link color={'white'} to={repository.html_url}>
        <GithubIcon />
      </Link>
    </Navbar>
    </div>
  )
})

export default Nav
