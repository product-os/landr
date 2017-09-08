import React from 'react';
import { Banner, Heading, Text, Lead } from 'rebass';
import { withTheme } from 'styled-components';

const Hero = ({ repo, theme, dark }) => {
  return (
    <Banner color={theme.text(dark)} bg={theme.bg(dark)}>
      <Heading f={[4, 5, 6, 7]}>
        {repo.name}
      </Heading>
      <Lead>
        {repo.description}
      </Lead>
    </Banner>
  );
};

export default withTheme(Hero);
