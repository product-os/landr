import React from 'react';
import { withTheme } from 'styled-components';
import get from 'lodash/get';

import { Heading, Text, Banner, Image, Box, Flex } from 'resin-components';
import DownloadButton from 'components/DownloadButton';
import Code from 'components/Code';
import Star from 'components/github-button';
import { Share } from 'react-twitter-widgets';
import { Link, assets } from 'landr';
import _ from 'lodash'

export default withTheme(props => {
  const getter = key => get(props, key);
  const latestRelease = getter('releases[0]');
  const latestAssets = get(latestRelease, 'assets');
  const version = get(latestRelease, 'tag_name');

  return (
    <Banner bg={getter('theme.colors.primary.light')} minHeight='30vh'>
      <Image
        align="center"
        style={{ height: '100px' }}
        mb={3}
        src={assets[`${props.repository.name}`]}
      />
      <Heading.h1 align="center">{_.capitalize(getter('repository.name'))}</Heading.h1>
      <Heading.h3 align="center" mb={3}>
        {getter('settings.lead') ||
          getter('repository.description')}
      </Heading.h3>
      <Flex mb={3}>
        <Box mx={1}>
          <Star
            href={get('repository.html_url')}
            data-size="small"
            data-show-count="true"
          >
            Star
          </Star>
        </Box>
        <Box mx={1}>
          <Share
            options={{
              text: `${getter('repository.name')} - ${getter('settings.lead') ||
                getter('repository.description')}`,
            }}
            url={''}
          >
            Tweet
          </Share>
        </Box>
      </Flex>
      <Text mb={3}>
        {version && `${version} - `}
        <Link to="/changelog/">See whats new</Link>
      </Text>
    </Banner>
  );
});
