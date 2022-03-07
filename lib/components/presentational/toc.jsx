import React from 'react'
import {
  Box, Heading, Link
} from 'rendition'
import {
  Link as RouterLink
} from 'react-router-dom'
import {
  HashLink
} from 'react-router-hash-link'

const Toc = (props) => {
  if (!props.toc) return null
  return props.toc.map((page, index) => {
    const url = `/${page.path.join('/')}`

    const headings = page.tableOfContent
      ? page.tableOfContent.filter((heading) => {
        return heading.depth === 2
      })
      : []

    return (
      <Box key={index} mb={3}>
        <Heading.h4 fontSize={2}>
          <Link is={RouterLink} to={url}>
            {page.title}
          </Link>
        </Heading.h4>

        {headings.map((heading) => {
          return (
            <Box key={heading.id}>
              <Link
                fontSize={1}
                pl={2}
                color="text.main"
                is={HashLink}
                to={`${url}#${heading.id}`}
              >
                {heading.title}
              </Link>
            </Box>
          )
        })}
      </Box>
    )
  })
}

export default Toc
