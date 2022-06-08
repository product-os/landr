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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Flex, Heading, Box, Container, Card, Txt } from "rendition";
import { Markdown } from "rendition/dist/extra/Markdown";
import styled from "styled-components";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";

const HtmlOverridesComponent = styled(Card)`
  th,
  td {
    border: 1px solid black;
    padding: 5px 10px;
  }
  ul {
    margin-left: 20px;
    list-style: disc;
    margin-bottom: 20px;
  }
`;

const LegalDocs = (props) => {
  return (
    <Box
      style={{
        lineHeight: 1.4,
      }}
      pb={100}
    >
      <Heading.h1 pt={200} fontSize={[30, 40, 50, 68]} align="center">
        {props.title}
      </Heading.h1>
      <Container px={[3, 3, 3, 0]}>
        <Flex
          py={120}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box width={[1, 1, 3 / 4, 3 / 4]}>
            <HtmlOverridesComponent padding="48px 36px">
              <Box mb={4} fontSize={14}>
                <Txt color="primary.main">
                  <FontAwesomeIcon icon={faClock} size="lg" />
                </Txt>
                <Txt.span ml={2}>{props.updated}</Txt.span>
              </Box>
              <Markdown
                componentOverrides={{
                  h1: (componentProps) => {
                    return (
                      <Heading.h1 fontSize="26px" margin="40px 0 24px">
                        {componentProps.children}
                      </Heading.h1>
                    );
                  },
                  h2: (componentProps) => {
                    return (
                      <Heading.h2 fontSize="24px" margin="40px 0 24px">
                        {componentProps.children}
                      </Heading.h2>
                    );
                  },
                  h3: (componentProps) => {
                    return (
                      <Heading.h2 fontSize="20px" margin="24px 0 16px">
                        {componentProps.children}
                      </Heading.h2>
                    );
                  },
                  // eslint-disable-next-line id-length
                  p: (componentProps) => {
                    return <Txt.p mb="16px">{componentProps.children}</Txt.p>;
                  },
                }}
                sanitizerOptions={null}
              >
                {props.doc}
              </Markdown>
            </HtmlOverridesComponent>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default LegalDocs;
