import React from 'react'
import isArray from 'lodash/isArray'
import last from 'lodash/last'
import kebabCase from 'lodash/kebabCase'
import {
  Box, Heading, Link
} from 'rendition'

const normalizeTitle = (str) => {
  let title = str

  // The header contains some extra formatting like inline code
  if (isArray(title)) {
    title = last(title)
  }

  return title.split('`').join('')
}

const Toc = (props) => {
  return props.toc.map((page, index) => {
    const url = `/${page.path.join('/')}`

    const sections = page.sections
      ? page.sections
        .filter((section) => {
          return section[1].level === 2
        })
        .map((entry) => {
          const title = normalizeTitle(entry[2])
          return {
            title,
            path: `#${kebabCase(title)}`
          }
        })
      : []

    return (
      <Box key={index} mb={3}>
        <Heading.h4 fontSize={2}>
          <Link href={url}>{page.title}</Link>
        </Heading.h4>

        {sections.map((section) => {
          return (
            <Box key={section.path}>
              <Link
                fontSize={1}
                pl={2}
                href={`${url}${section.path}`}
                color="#555"
              >
                {section.title}
              </Link>
            </Box>
          )
        })}
      </Box>
    )
  })
}

export default Toc
