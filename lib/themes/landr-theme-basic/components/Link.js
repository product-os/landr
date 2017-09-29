import React from 'react';
import { Link as RLink } from 'resin-components';
import { Link as RouterLink } from 'react-router-dom';

export const isURLExternal = url => {
  return url && url.indexOf('http') !== -1;
};

const Link = ({ to, children, theme, color, blank, ...props }) => {

  const isExternal = isURLExternal(to);
  return (
    <RLink
      color={color}
      {...props}
      to={!isExternal && to}
      href={isExternal && to}
      is={!isExternal && RouterLink}
    >
      {children}
    </RLink>
  );
};

export default Link;
