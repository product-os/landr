import React from 'react'
import _ from 'lodash'
import {
  Heading, Link, Txt
} from 'rendition'

/*
Import {
  Prism as SyntaxHighlighter
} from 'react-syntax-highlighter'
*/

const headingLevelsToComponent = {
  1: Heading.h1,
  2: Heading.h2,
  3: Heading.h3,
  4: Heading.h4,
  5: Heading.h5,
  6: Heading.h6
}

const headingsFontSizesByLevel = {
  1: 26,
  2: 24,
  3: 22,
  4: 18,
  5: 17,
  6: 16
}

const CodeBlock = ({
  language, value, ...rest
}) => {
  console.log({
    language,
    rest
  })
  return (
    <pre
      language={language}
      {...rest}
    >
      {value}
    </pre>
  )

  /*
  Return (
    <SyntaxHighlighter
      language={language}
      {...rest}
    >
      {value}
    </SyntaxHighlighter>
  )
  */
}

// https://github.com/rexxars/react-markdown#node-types
const renderers = {
  paragraph: (props) => { return <Txt.p my={2}>{props.children}</Txt.p> },
  link: (props) => { return <Link {...props} blank /> },
  code: CodeBlock,
  heading: ({
    level, ...rest
  }) => {
    return React.createElement(headingLevelsToComponent[level], {
      fontSize: headingsFontSizesByLevel[level],
      id: _.kebabCase(rest.children[0].props.value),
      ...rest,
      ...{
        mt: 24, mb: 16
      }
    })
  }
}

export default renderers
