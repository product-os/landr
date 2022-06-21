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

import React from "react";
import { Box, Link, Container } from "rendition";
import { Markdown } from "rendition/dist/extra/Markdown";

const BlogList = (props) => {
  const articles = props.articles.map((article, index) => {
    const url = `/${article.path.join("/")}`;
    return (
      <Container key={index}>
        <Link href={url}>See article</Link>
        <Markdown>{article.content.title}</Markdown>
        <hr />
      </Container>
    );
  });

  return <Box p={3}>{articles}</Box>;
};

export default BlogList;
