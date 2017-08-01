import React from 'react';
import Section from 'www/components/Section';
import Contributor from 'www/components/Contributor';
import { Flex, Box } from 'rebass';

export default ({ contributors }) => {
  return (
    <Section title="Contributors">
      <Flex justify='center'>
        <Box>
          {contributors &&
            contributors.map(contributor => {
              return (
                <Contributor key={contributor.login} contributor={contributor} />
              );
            })}
        </Box>
      </Flex>
    </Section>
  );
};
