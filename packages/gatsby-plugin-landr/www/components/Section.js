import React from 'react';
import { Container, Subhead, Text } from 'rebass';

export default ({ title, content, children, ...props }) => {
  return (
    <div {...props}>
      <Container py={2}>
        <Subhead center>{title}</Subhead>
        <Text center dangerouslySetInnerHTML={{ __html: content }} />
        {children}
      </Container>
    </div>
  );
};
