import React from 'react'
import _ from 'lodash'
import {
  Box, Heading, Link
} from 'rendition'

const Toc = (props) => {
  return props.toc.map((page, index) => {
    const url = `/${page.path.join('/')}`

    const sections = page.sections
      ? page.sections
        .filter((section) => {
          return section[1].level === 2
        })
        .map((entry) => {
          return {
            title: entry[2],
            path: `#${_.kebabCase(entry[2])}`
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
