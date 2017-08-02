import React from 'react';
import { Container, Subhead, Text } from 'rebass';

export default ({ title, content, children, ...props }) => {
  return (
    <div {...props}>
      <Container py={2}>
        <Subhead dangerouslySetInnerHTML={{ __html: title }} center></Subhead>
        <Text center dangerouslySetInnerHTML={{ __html: content }} />
        {children}
      </Container>
    </div>
  );
};
