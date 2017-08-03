import React from 'react';
import { Avatar, Link, Tooltip } from 'rebass';

export default ({ contributor }) => {
  return (
    <Tooltip
      p={2}
      text={`${contributor.login} has made ${contributor.contributions} contributions`}
    >
      <Link target="_blank" href={contributor.html_url}>
        <Avatar size={32} src={contributor.avatar_url} />
      </Link>
    </Tooltip>
  );
};
