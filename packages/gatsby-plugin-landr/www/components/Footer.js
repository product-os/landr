import React from 'react';
import { Box, Text } from 'rebass';
import Link from 'www/components/Link';
import HeartIcon from 'react-icons/lib/go/heart';
import styled, { withTheme } from 'styled-components';

const Footer = ({ repo, theme }) => {
  return (
    <Box py={50} bg={theme.bg()} color={theme.text()}>
      <Text center>
        Made with <HeartIcon />{' '}
        <Link to={repo.owner.html_url} blank>
          {repo.owner.login}
        </Link>
      </Text>
    </Box>
  );
};

export default withTheme(Footer);
