import React from 'react'
import GithubIcon from 'react-icons/lib/go/mark-github'
import { withTheme } from 'styled-components'
import { Navbar, Image, Text, Box, Flex, Container } from 'resin-components'

import resinLogo from '../images/resin.svg'
import { Link, assets } from 'landr'

const Brand = ({ repository }) => (
  <Box>
    <Link to="/">
      {assets[`${repository.name}`] ? (
        <Image style={{ height: '40px' }} src={assets[`${repository.name}`]} />
      ) : (
        <Text color="white">{repository.name}</Text>
      )}
    </Link>
  </Box>
)

const Nav = withTheme(({ repository }) => {
  return (
    <div>
      <Box bg="gray.dark" color="white">
        <Container align="left">
          <Box pt={2} pl={2}>
            <Flex align="center">
              <Text.span fontSize={'12px'}>An open source project by</Text.span>
              <Link target to="https://resin.io">
                <Image ml={2} style={{ height: '20px' }} src={resinLogo} />
              </Link>
            </Flex>
          </Box>
        </Container>
      </Box>
      <Navbar
        align="center"
        brand={<Brand repository={repository} />}
        color="white"
        bg="gray.dark"
      >
        <Link color="white" to="/docs">
          Docs
        </Link>
        <Link color="white" to="/changelog">
          Changelog
        </Link>
        <Link color="white" to={repository.html_url}>
          <GithubIcon />
        </Link>
      </Navbar>
    </div>
  )
})

export default Nav
