import React from 'react';
import { withTheme } from 'styled-components';
import { withSiteData } from 'react-static';
import { Box, Flex, Container, Heading, Link } from 'rendition';

const Navigation = withTheme(props => (
  <Box p={3} bg={props.theme.colors.secondary.main} color="#fff">
    <Container>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading.h2>{props.name}</Heading.h2>
        <Flex fontSize={'1.1em'}>
          <Link blank color="#fff" href={props.githubUrl} aria-labelledby='Github'>
            <i className="fab fa-github fa-lg"></i>
          </Link>
          {/* <Link ml={3} blank color="#fff" >
            Changelog
          </Link> */}
        </Flex>
      </Flex>
    </Container>
  </Box>
));

export default withSiteData(withTheme(Navigation));
