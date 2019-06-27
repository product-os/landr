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
  Box,
  Img,
  Container,
  Txt
} from 'rendition'

export const name = 'Contributors'

export const variants = (metadata) => {
  const combinations = []

  if (metadata.data.contributors) {
    combinations.push({
      contributors: metadata.data.contributors
    })
  }

  return combinations
}

export const render = (props) => {
  const contributors = props.contributors.map((contributor) => {
    return (
      <div key={contributor.username}>
        <Img style={{
          height: '50px'
        }} src={contributor.avatar} />
        <Txt>{contributor.username}</Txt>
      </div>
    )
  })

  return (
    <Box p={3}>
      <Container>
        {contributors}
      </Container>
    </Box>
  )
}
