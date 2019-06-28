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

import React from 'react';
import { Box, Container, Txt, Flex, Heading } from 'rendition';

import Terminal from './presentational/terminal';

export const name = 'Jumbotron';

export const variants = metadata => {
  const combinations = [];

  if (metadata.data.tagline && metadata.data.description) {
    combinations.push({
      title: metadata.data.tagline,
      description: metadata.data.description,
      packageName: metadata.data.name,
      type: metadata.data.type,
    });
  }

  if (metadata.data.tagline) {
    combinations.push({
      title: metadata.data.tagline,
      packageName: metadata.data.name,
      type: metadata.data.type,
    });
  }

  return combinations;
};

export const render = props => {
  return (
    <Box bg={'#2a5070'} color="#fff" mb={5} py={6}>
      <Container>
        <Flex flexDirection="column" alignItems="center">
          <Heading.h1>{props.title}</Heading.h1>
          {props.description && <Txt fontSize={3}>{props.description}</Txt>}
        </Flex>
        {props.type === 'npm' && <Terminal packageName={props.packageName} />}
      </Container>
    </Box>
  );
};
