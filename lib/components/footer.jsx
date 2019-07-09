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
import _ from 'lodash';
import { Box, Img, Container, Flex, Link, Heading, Txt } from 'rendition';

export const name = 'Footer';

export const variants = (metadata, context, _route, routes) => {
  const combinations = [];

  const toplevelRoutes = routes
    .filter(definition => {
      return definition.path.length === 1;
    })
    .map(definition => {
      return {
        name: _.capitalize(definition.path[0]),
        url: `/${definition.path[0]}`,
      };
    });

  if (metadata.data.links.repository) {
    toplevelRoutes.push({
      name: 'GitHub',
      url: metadata.data.links.repository,
    });
  }

  if (metadata.data.github.owner && metadata.data.images.banner) {
    combinations.push({
      owner: metadata.data.github.owner,
      logo: metadata.data.images.banner,
      routes: toplevelRoutes,
      toc: context.toc,
    });
  }

  if (metadata.data.images.banner) {
    combinations.push({
      logo: metadata.data.images.banner,
      routes: toplevelRoutes,
      toc: context.toc,
    });
  }

  return combinations;
};

export const render = props => {
  const toc = props.toc.map((page, index) => {
    const url = `/${page.path.join('/')}`;
    return (
      <Box key={index} mb={1}>
        <Link href={url}>{page.title}</Link>
      </Box>
    );
  });

  const links = props.routes.map((route, index) => {
    return (
      <Box key={index} mb={1}>
        <Link href={route.url} aria-labelledby={route.name}>
          {route.name}
        </Link>
      </Box>
    );
  });

  const brand = (
    <Img
      style={{
        height: '50px',
      }}
      src={props.logo}
    />
  );

  const owner = !_.isEmpty(props.owner) ? (
    <Flex alignItems="center" mt={3}>
      <Txt fontSize={2}>Brought to you by</Txt>{' '}
      <Link href={props.owner.url} tooltip={props.owner.name}>
        <Img
          src={props.owner.avatar}
          alt={props.owner.name}
          ml={2}
          style={{ height: 26 }}
        />
      </Link>
    </Flex>
  ) : null;

  return (
    <Box px={3} py={5} mt={5} bg={'#eee'}>
      <Container>
        <Flex
          mx={-16}
          justifyContent={['flex-start', 'flex-start', 'space-between']}
          flexWrap="wrap"
        >
          <Box px={16} width={[1, 1, 1 / 2]} mb={3}>
            {brand}
            {owner}
          </Box>
          <Box px={16} pt={14}>
            <Heading.h4 mb={2} fontSize={2}>
              Navigation
            </Heading.h4>
            {links}
          </Box>
          {!_.isEmpty(toc) && (
            <Box px={16} pt={14}>
              <Heading.h4 mb={2} fontSize={2}>
                Docs
              </Heading.h4>
              {toc}
            </Box>
          )}
        </Flex>
      </Container>
    </Box>
  );
};
