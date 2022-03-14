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
  Box, Container, Heading, Txt
} from 'rendition'
import {
  Markdown
} from 'rendition/dist/extra/Markdown'

export const render = (props) => {
  return (
    <Container my={100} maxWidth={998}>
      <Heading.h2
        mb={18}
        fontSize="38px"
        style={{
          fontWeight: 400,
          lineHeight: 1.18
        }}
      >
        {props.name}
      </Heading.h2>
      {props.tagline && (
        <Markdown
          componentOverrides={{
            // eslint-disable-next-line id-length
            p: (componentProps) => {
              return (
                <Txt.p
                  mt={1}
                  mb={3}
                  color="text.main"
                  {...componentProps}
                  fontSize="16px"
                  style={{
                    lineHeight: 1.5
                  }}
                />
              )
            },
            strong: 'div'
          }}
          mb={32}
        >
          {props.tagline}
        </Markdown>
      )}
      <Markdown
        componentOverrides={{
          // eslint-disable-next-line id-length
          p: (componentProps) => {
            if (
              componentProps.children &&
              componentProps.children.some((child) => {
                return child.type === 'img'
              })
            ) {
              return <Box my={3} {...componentProps} />
            }
            return (
              <Txt.p
                {...componentProps}
                my={4}
                fontSize="16px"
                style={{
                  lineHeight: 1.63
                }}
              ></Txt.p>
            )
          }
        }}
      >
        {props.motivation}
      </Markdown>
    </Container>
  )
}

export default {
  render
}
