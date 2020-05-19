import React from 'react'
import _ from 'lodash'
import {
  Box, Heading, Link
} from 'rendition'
import {
  Link as RouterLink
} from 'react-router-dom'
import {
  HashLink
} from 'react-router-hash-link'

const normalizeTitle = (str) => {
  let title = str

  // The header contains some extra formatting like inline code
  if (_.isArray(title)) {
    title = _.last(title)
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
            path: `#${_.kebabCase(title)}`
          }
        })
      : []

    return (
      <Box key={index} mb={3}>
        <Heading.h4 fontSize={2}>
          <Link is={RouterLink} to={url}>
            {page.title}
          </Link>
        </Heading.h4>

        {sections.map((section) => {
          return (
            <Box key={section.path}>
              <Link
                fontSize={1}
                pl={2}
                color="#555"
                is={HashLink}
                to={`${url}${section.path}`}
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
