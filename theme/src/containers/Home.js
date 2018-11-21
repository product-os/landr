import React, { memo } from 'react';
import { Box } from 'rendition';
import _ from 'lodash';
import { withTheme } from 'styled-components';
import { withSiteData } from 'react-static';

import Hero from '../components/Hero'
import Readme from '../components/Readme';
import Releases from '../components/Releases'


const Home = memo(props => {
  return (
    <Box mb={5}>
      <Hero {...props} />
      <Releases mt={5} assets={props.latestRelease.asssets} />
      <Readme mt={5} markdown={props.readme} />
    </Box>
  );
});

export default withSiteData(withTheme(Home));
