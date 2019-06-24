import React from 'react';
import { Container, Heading, Card, Link, Txt } from 'rendition';
import ReactMarkdown from 'react-markdown';

import { CodeBlock, InlineCodeBlock } from './CodeBlock';

const headingLevelsToComponent = {
  1: Heading.h1,
  2: Heading.h2,
  3: Heading.h3,
  4: Heading.h4,
  4: Heading.h4,
  5: Heading.h5,
  6: Heading.h6,
};

const headingsFontSizesByLevel = {
  1: 26,
  2: 24,
  3: 22,
  4: 20,
  4: 18,
  5: 17,
  6: 16,
};

// https://github.com/rexxars/react-markdown#node-types
const renderers = {
  paragraph: props => <Txt my={2}>{props.children}</Txt>,
  link: props => <Link {...props} blank />,
  code: CodeBlock,
  inlineCode: InlineCodeBlock,
  heading: ({ level, ...rest }) =>
    React.createElement(headingLevelsToComponent[level], {
      fontSize: headingsFontSizesByLevel[level],
      ...rest,
      ...{ mt: 24, mb: 16 },
    }),
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
