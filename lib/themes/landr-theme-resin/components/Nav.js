import React from 'react';
import GithubIcon from 'react-icons/lib/go/mark-github';
import { withTheme } from 'styled-components';
import { Navbar, Image, Text, Box, Flex, Container } from 'resin-components';

import resinLogo from '../images/resin.svg';
import { Link, assets } from 'landr';
import _ from 'lodash';

const Brand = ({ repository }) => (
  <Box>
    <Flex justify="flex-start" align="center">
      <Text.span fontSize={1}>An open source project by</Text.span>
      <Link target to="https://resin.io">
        <Image ml={2} style={{ height: '20px' }} src={resinLogo} />
      </Link>
    </Flex>
    <Link to="/">
      {assets[`${repository.name}`] ? (
        <Image style={{ height: '40px' }} src={assets[`${repository.name}`]} />
      ) : (
        <Text color="#fff" fontSize={5}>
          {_.capitalize(repository.name)}
        </Text>
      )}
    </Link>
  </Box>
);

const Nav = withTheme(({ theme, repository }) => {
  return (
    <Navbar
      bg={theme.colors.primary.light}
      align="center"
      brand={<Brand repository={repository} />}
    >
      <Link color="#fff" to="/docs">
        Docs
      </Link>
      <Link color="#fff" to="/changelog">
        Changelog
      </Link>
      <Link color="#fff" to={repository.html_url}>
        <GithubIcon />
      </Link>
    </Navbar>
  );
});

export default Nav;
