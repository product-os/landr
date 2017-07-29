import React from 'react';
import Base from 'www/layouts/_base';

const Layout = ({ children, ...props }) => {
  return (
    <Base {...props}>
      {children()}
    </Base>
  );
};

export default Layout;

export const layoutQuery = graphql`
query layoutDefault {
  repo {
    name
    description
    html_url
  }
}`;
