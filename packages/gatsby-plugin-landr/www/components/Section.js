import React from 'react';
import { Container, Subhead, Text, Box } from 'rebass';

export default ({ title, content, html, children, ...props }) => {
  return (
    <Box {...props}>
      <Container py={2}>
        <Subhead center>
          {title}
        </Subhead>
        <div
          style={{ textAlign: 'center' }}
          dangerouslySetInnerHTML={{ __html: html || content }}
        />
        {children}
      </Container>
    </Box>
  );
};
