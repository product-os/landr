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
import get from 'lodash/get';
import { Box, Divider, Container, Flex, Link, Heading, Txt } from 'rendition';
import Accordian from './presentational/accordian';

export const name = 'Faq';

export const variants = metadata => {
  const combinations = [];

  const latestVersion = metadata.version;
  if (
    get(metadata, ['data', 'docs', 'tags', latestVersion, 'users', 'faq'], null)
  ) {
    combinations.push({
      faq: metadata.data.docs.tags[latestVersion].users.faq,
    });
  }

  return combinations;
};

export const render = props => {
  const items = props.faq.map(faq => ({
    title: faq.title,
    content: faq.content[1],
  }));

  return (
    <Box p={3} my={3}>
      <Container>
        <Box>
          <Heading.h2 align="center" mb={4}>
            Frequently asked questions
          </Heading.h2>
          <Divider m={0} height={1} color={'#c1c7dd'} />
          <Accordian items={items} />
        </Box>
      </Container>
    </Box>
  );
};
