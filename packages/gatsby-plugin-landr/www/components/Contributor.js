import React from 'react';
import { Media } from 'reactstrap';

export default ({ contributor }) => {
  return (
    <Media>
      <Media className="pr-2 py-2" left href={contributor.html_url}>
        <Media object style={{width: '50px'}} src={contributor.avatar_url} alt={`${contributor.login} avatar`} />
      </Media>
      <Media body>
        <Media heading>
          {contributor.login}
        </Media>
        Contributions: {contributor.contributions}
      </Media>
    </Media>
  );
};
