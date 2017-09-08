import React from 'react';
import GithubIcon from 'react-icons/lib/go/mark-github';
import { Heading, Button, Toolbar, Navlink, NavLink } from 'rebass';
import Link from 'www/components/Link';
import { withTheme } from 'styled-components';

const Nav = ({ repo, theme, dark, activePath }) => {
  return (
    <Toolbar
      color={theme.text(dark)}
      bg={theme.bg(dark)}
      style={{ borderBottom: '1px solid rgba(0,0,0,.07)' }}
    >
      <NavLink to="/" active={activePath === '/'} is={Link}>
        {repo.name}
      </NavLink>
      <NavLink
        ml="auto"
        to="/changelog"
        active={activePath === '/changelog'}
        is={Link}
      >
        Changelog
      </NavLink>
      <NavLink to="/docs" active={activePath === '/docs'} is={Link}>
        Docs
      </NavLink>
      <NavLink href={repo.html_url} target="_blank">
        <GithubIcon />
      </NavLink>
    </Toolbar>
  );
};

export default withTheme(Nav);
