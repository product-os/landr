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
  Box, Divider, Container, Heading, Accordion
} from 'rendition'
import {
  Markdown
} from 'rendition/dist/extra/Markdown'

export const name = 'Faq'

export const variants = (metadata) => {
  const combinations = []

  if (metadata.data.faq) {
    combinations.push({
      faq: metadata.data.faq
    })
  }

  return combinations
}

export const render = (props) => {
  const items = props.faq.map((faq) => {
    return {
      label: faq.title,
      panel: (
        <div>
          <Markdown>{faq.content}</Markdown>
        </div>
      )
    }
  })

  return (
    <Box my={100}>
      <Container maxWidth={998}>
        <Box>
          <Heading.h2 mb={4}>Frequently asked questions</Heading.h2>
          <Divider m={0} />
          <Accordion items={items} />
        </Box>
      </Container>
    </Box>
  )
}

export default {
  name,
  render,
  variants
}
