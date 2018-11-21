import React from 'react';
import { Container, Heading, Card, Divider, Txt, Link } from 'rendition';
import ReactMarkdown from 'react-markdown';

import CodeBlock from './CodeBlock';

const headingLevelsToComponent = {
  1: Heading.h1,
  2: Heading.h2,
  3: Heading.h3,
  4: Heading.h4,
  4: Heading.h4,
  5: Heading.h5,
  6: Heading.h6,
};

// https://github.com/rexxars/react-markdown#node-types
const renderers = {
  code: CodeBlock,
  inlineCode: CodeBlock,
  heading: ({ level, ...rest }) =>
    React.createElement(headingLevelsToComponent[level], rest),
  link: props => <Link {...props} blank />,
};

const Readme = ({ markdown, ...rest }) => (
  <Container {...rest}>
    <Card>
      <ReactMarkdown
        escapeHtml={false}
        source={markdown}
        renderers={renderers}
      />
    </Card>
  </Container>
);

export default Readme;
