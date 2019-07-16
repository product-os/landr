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
import _ from 'lodash'
import Stringify from 'jsonml-stringify/stringify'
import fragment from 'jsonml-stringify/plugins/fragment'
import loose from 'jsonml-stringify/plugins/loose'
import {
  Box, Flex, Link, Container, DropDownButton
} from 'rendition'
import Toc from './presentational/toc'
import Sidebar from './presentational/sidebar'

export const name = 'DocViewer'

const jsonml2html = Stringify([loose])

const JsonML = ({
  data
}) => {
  const html = jsonml2html([ 'article' ].concat(data))
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html
      }}
    />
  )
}

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
      versions: context.versions || [],
      link: `${metadata.data.links.repository}/edit/master/${
        context.article.content.filename
      }`,
      jsonml: context.article.content.data,
      latest: context.latest,
      version: context.version
    })
  }

  return combinations
}

export const render = (props) => {
  const versions = _.get(props, 'versions', []).map((version, index) => {
    const basePath = [ ...props.current ]

    // If the current path includes a version at the end, trim it
    if (props.versions.includes(_.last(basePath))) {
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
          <Box>
            <Link href={props.link}>Edit on GitHub</Link>
            {props.date && props.author && (
              <p>
                Published on {props.date} by @{props.author}
              </p>
            )}
            <JsonML data={props.jsonml} />
          </Box>
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
        </Flex>
      </Container>
    </Box>
  )
}
