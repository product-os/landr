
import React from 'react'

import {
  Txt, Link, Heading
} from 'rendition'
import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeReact from 'rehype-react'

/* eslint-disable id-length */
export const getProcessor = (componentOverrides) => {
  return unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeReact, {
      createElement: React.createElement,
      components: {
        p: Txt.p,
        a: Link,
        h1: Heading.h1,
        h2: Heading.h2,
        h3: Heading.h3,
        h4: Heading.h4,
        h5: Heading.h5,
        h6: Heading.h6,
        ...componentOverrides
      }
    })
}

/* eslint-enable */
