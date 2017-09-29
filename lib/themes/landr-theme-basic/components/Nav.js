import React from 'react'
import GithubIcon from 'react-icons/lib/go/mark-github'
import { withTheme } from 'styled-components'
import { Heading, Button, Toolbar, Navlink, NavLink, Link } from 'rebass'

const Nav = withTheme(({ repository, ...props }) => {
  return (
    <Toolbar
      color='white'
      bg={props.theme.colors.gray.dark}
      style={{ borderBottom: '1px solid rgba(0,0,0,.07)' }}
    >
      <NavLink href='/' is={Link}>
        {repository.name}
      </NavLink>
      <NavLink
        ml='auto'
        href='/changelog/'
        is={Link}
      >
        Changelog
      </NavLink>
      <NavLink
        href='/docs'
        is={Link}
      >
        docs
      </NavLink>
      <NavLink href={repository.html_url} target='_blank'>
        <GithubIcon />
      </NavLink>
    </Toolbar>
  )
})

export default Nav
