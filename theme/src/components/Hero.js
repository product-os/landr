import React from 'react';
import _ from 'lodash';
import { Box, Container, Txt, Button, Flex, Heading } from 'rendition';
import { withTheme } from 'styled-components';

const RELEASES_PATH = '/releases/tag/';

const Hero = (props) => {
  const latestVersion = _.get(props, 'latestRelease.tagName');
  const { name, description } = props

  return (
    <Box bg={props.theme.colors.secondary.main} color="#fff" mb={5} py={6}>
      <Container>
        <Flex flexDirection="column" alignItems="center">
          <Heading.h1>{name}</Heading.h1>
          <Txt fontSize={3}>{description}</Txt>
          {latestVersion && (
            <Button
              mt={3}
              primary
              blank
              href={props.githubUrl + RELEASES_PATH + latestVersion}
            >
              Download {latestVersion}
            </Button>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default withTheme(Hero);
