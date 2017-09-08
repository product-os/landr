import React from 'react';
import { Link as RLink } from 'rebass';
import GLink from 'gatsby-link';

export const isURLExternal = url => {
  return url && url.indexOf('http') !== -1;
};

const Link = ({ to, children, theme, color, blank, ...props }) => {
  const isExternal = isURLExternal(to);
  return (
    <RLink
      color={color || null}
      {...props}
      to={!isExternal && to}
      href={isExternal && to}
      is={!isExternal && GLink}
      rel={blank && 'noopener'}
      target={blank && '_blank'}
    >
      {children}
    </RLink>
  );
};

export default Link;
