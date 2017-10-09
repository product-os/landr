import React from 'react';
import { Link as RLink } from 'resin-components';
import { Link as RouterLink } from 'react-router-dom';

export const isURLExternal = url => {
  return url && url.indexOf('http') !== -1;
};

let pathPrefix = `/`
if (__PATH_PREFIX__) {
  pathPrefix = __PATH_PREFIX__
}

function normalizePath(path) {
  return path.replace(/^\/\//g, `/`)
}

const Link = ({ to, children, ...props }) => {
  const isExternal = isURLExternal(to);
  return (
    <RLink
      {...props}
      to={to}
      href={to}
      is={!isExternal && RouterLink}
    >
      {children}
    </RLink>
  );
};

export default Link;
