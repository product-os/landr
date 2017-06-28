import React from 'react';
import Section from 'www/components/Section'
import Contributor from 'www/components/Contributor'

export default ({ contributors }) => {
  return (
    <Section title="Contributors">
      {
        contributors && contributors.map((contributor) => {
          return (
            <Contributor key={contributor.login} contributor={contributor} />
          )
        })
      }
    </Section>
  );
};
