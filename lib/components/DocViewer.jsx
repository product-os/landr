/*
 * Copyright 2019 balena.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react'
import {
  format, parseISO
} from 'date-fns'
import last from 'lodash/last'
import {
  Box, Flex, Link, Container, DropDownButton
} from 'rendition'
import Toc from './presentational/toc'
import Sidebar from './presentational/sidebar'
import {
  Markdown
} from 'rendition/dist/extra/Markdown'

export const name = 'DocViewer'

export const variants = (metadata, context, route) => {
  const combinations = []

  if (context.article) {
    combinations.push({
      title: context.article.content.title,
      date: context.article.content.published_at,
      author:
        context.article.content.author && context.article.content.author.handle,
      current: route.path,
      toc: context.toc,
      docsTableOfContent: context.docsTableOfContent,
      versions: context.versions || [],
      link: `${metadata.data.links.repository.replace(
        '.git',
        ''
      )}/edit/master/${context.article.content.filename}`,
      content: context.article.content.data,
      latest: context.latest,
      version: context.version
    })
  }

  return combinations
}

export const render = (props) => {
  const versions = props.versions.map((version, index) => {
    const basePath = [ ...props.current ]

    // If the current path includes a version at the end, trim it
    if (props.versions.includes(last(basePath))) {
      basePath.pop()
    }
    const url = `/${basePath.join('/')}/${version}`

    return (
      <Box key={index}>
        <Link href={url}>{version}</Link>
      </Box>
    )
  })

  return (
    <Box px={3} py={4}>
      <Container>
        <Flex flexWrap={[ 'wrap', 'nowrap' ]}>
          <Sidebar>
            {versions.length > 0 && (
              <Box mb={3}>
                <DropDownButton
                  joined
                  label={`Version: ${props.version}`}
                  primary
                >
                  {versions}
                </DropDownButton>
              </Box>
            )}
            <Box mt={3}>
              <Toc toc={props.toc} />
            </Box>
          </Sidebar>
          <Box
            style={{
              maxWidth: 900,
              width: '100%'
            }}
          >
            <Link href={props.link}>Edit on GitHub</Link>
            {props.date && props.author && (
              <p>
                Published on{' '}
                {format(parseISO(props.date), 'EEEE, MMMM do yyyy')} by @
                {props.author}
              </p>
            )}
            <Markdown sanitizerOptions={null}>{props.content.markdown}</Markdown>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default {
  name,
  render,
  variants
}
