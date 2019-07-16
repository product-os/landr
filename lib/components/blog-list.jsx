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
import Stringify from 'jsonml-stringify/stringify'
import loose from 'jsonml-stringify/plugins/loose'
import {
  Box,
  Link,
  Container
} from 'rendition'

export const name = 'BlogList'

const jsonml2html = Stringify([loose])

const JsonML = ({
  data
}) => {
  const html = jsonml2html(data)
  return (<div dangerouslySetInnerHTML={{
    __html: html
  }}/>)
}

export const variants = (metadata, context, route) => {
  const combinations = []

  if (context.articles) {
    combinations.push({
      articles: context.articles
    })
  }

  return combinations
}

export const render = (props) => {
  const articles = props.articles.map((article, index) => {
    const url = `/${article.path.join('/')}`
    return (
      <Container key={index}>
        <Link href={url}>See article</Link>
        <JsonML data={article.content.data} />
        <hr />
      </Container>
    )
  })

  return (
    <Box p={3}>{articles}</Box>
  )
}
