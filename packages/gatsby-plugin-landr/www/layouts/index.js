import React from 'react';
import Base from 'www/layouts/_base';

const IndexLayout = ({ children, ...props }) => {
  return (
    <Base {...props}>
      {children()}
    </Base>
  );
};

export default IndexLayout;

export const IndexLayoutQuery = graphql`
query IndexLayout {
  repo {
    name
    description
    html_url
  }
}`;
