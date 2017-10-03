import React from 'react'
import GithubIcon from 'react-icons/lib/go/mark-github'
import { withTheme } from 'styled-components'
import Link from 'components/Link'
import { Navbar, Image } from 'resin-components'
import images from 'images'

const Nav = withTheme(({ repository, ...props }) => {
  const Brand = (
    <Link to='/'>
      <Image  style={{ height: '20px' }} src={images[`./${repository.name}.svg`]} />
    </Link>
  )

  return (
    <Navbar py={2} align='center' brand={Brand} color='white' bg={props.theme.colors.gray.dark}>
      <Link
        color={'white'}
        to='/changelog/'
      >
        Changelog
      </Link>
      <Link
        color={'white'}
        to='/docs/cli/'
      >
        Docs
      </Link>
      <Link
        color={'white'}
        to={repository.html_url}>
        <GithubIcon />
      </Link>
    </Navbar>
  )
})

export default Nav
