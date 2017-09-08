import React, { Component } from 'react';
import {
  Absolute,
  Relative,
  Tooltip,
  Column,
  Text,
  Flex,
  Box,
  NavLink
} from 'rebass';
import startCase from 'lodash/startCase';
import kebabCase from 'lodash/kebabCase';
import styled, { withTheme } from 'styled-components';
import Section from 'www/components/Section';
import Link from 'www/components/Link';

const StyledNavLink = styled(NavLink)`
  line-height: 1.5;
  white-space: inherit;
  font-weight: 200;
`;

const StyledLink = styled(Link)`
  &:hover {
    box-shadow:none;
  }
`;

const activate = currentHashPath => hashPath => hashPath === currentHashPath;

const SideBar = ({ edges, pathname, hash, theme }) => {
  const isActive = activate(`${pathname}${hash}`);
  return (
    <Flex wrap>
      {edges.map(({ node }) => {
        const { slug, title } = node.fields;
        return (
          <Box w={1} mb={2} key={slug}>
            <StyledNavLink
              w={1}
              is={StyledLink}
              active={isActive(slug)}
              to={slug}
            >
              {slug.slice(5) === '/' ? 'Readme' : startCase(title)}
            </StyledNavLink>
            <nav>
              {node.headings &&
                node.headings.map((h, i) => {
                  if (h.depth !== 2) {
                    return;
                  }
                  const hashPath = slug + '#' + kebabCase(h.value);
                  return (
                    <StyledNavLink
                      w={1}
                      pl={4}
                      key={hashPath}
                      is={StyledLink}
                      key={hashPath}
                      to={hashPath}
                      active={isActive(hashPath)}
                    >
                      {h.value}
                    </StyledNavLink>
                  );
                })}
            </nav>
          </Box>
        );
      })}
    </Flex>
  );
};

export default withTheme(SideBar);
