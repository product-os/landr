import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/styles/prism';

const inlineCodeStyles = {
  display: 'inline',
  padding: '0.5em',
};

export const CodeBlock = ({ language, value, ...rest }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={base16AteliersulphurpoolLight}
      {...rest}
    >
      {value}
    </SyntaxHighlighter>
  );
};

export const InlineCodeBlock = props => (
  <CodeBlock customStyle={inlineCodeStyles} {...props} />
);
