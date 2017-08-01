import React from 'react';
import { Banner, Heading, Text, Lead } from 'rebass';

export default ({ repo }) => {
  return (
    <Banner
    	color='white'
    	bg='gray9'
      >
    	<Heading
    		f={[ 4, 5, 6, 7 ]}>
    		{repo.name}
    	</Heading>
      <Lead>
      	{repo.description}
      </Lead>
    </Banner>
  );
};
