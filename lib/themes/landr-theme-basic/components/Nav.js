import React from 'react'
import GithubIcon from 'react-icons/lib/go/mark-github'
import { withTheme } from 'styled-components'
import Link from 'components/Link'
import { Navbar, Image } from 'resin-components'
import images from 'images'
import isEmpty from 'lodash/isEmpty'

const Nav = withTheme(({ repository, ...props }) => {
  const Brand = (
    <Link to="/">
      <Image
        style={{ height: '20px' }}
        src={images[`./${repository.name}.svg`]}
      />
    </Link>
  )

  return (
    <Navbar
      py={2}
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
  )
})

export default Nav
