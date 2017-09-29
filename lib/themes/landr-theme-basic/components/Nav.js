import React from 'react'
import GithubIcon from 'react-icons/lib/go/mark-github'
import { withTheme } from 'styled-components'
import Link from 'components/Link'
import { Toolbar, Navlink, NavLink, Image } from 'rebass'

const Nav = withTheme(({ repository, ...props }) => {
  return (
    <Toolbar
      color='white'
      bg={props.theme.colors.gray.dark}
      style={{ borderBottom: '1px solid rgba(0,0,0,.07)' }}
    >
      <Link to='/'>
        <Image src={`/static/${repository.name}.svg`} />
      </Link>
      <Link
        to='/changelog/'
      >
        Changelog
      </Link>
      <Link
        to='/docs/cli/'
      >
        docs
      </Link>
      <Link to={repository.html_url}>
        <GithubIcon />
      </Link>
    </Toolbar>
  )
})

export default Nav
