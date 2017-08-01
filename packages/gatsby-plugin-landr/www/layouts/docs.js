import React from 'react';
import Link from 'gatsby-link';
import { Flex, Box, Container, Row, Column, NavLink } from 'rebass';
import startCase from 'lodash/startCase';
import kebabCase from 'lodash/kebabCase';
import Base from 'www/layouts/_base';

const DocsLayout = ({ children, ...props }) => {
  return (
    <Base {...props}>
      <Flex wrap>
        <Box width={[ 1, 1/4 ]} bg='gray9' color='white'>
          <nav>
            <Flex wrap py={0}>
            {props.data.allMarkdownRemark.edges.map(({ node }) => {
              const path = node.fields.slug;
              return (
              <Box
                w={1}
                key={path}>
                <NavLink
                  w={1}
                  is={Link}
                  active={props.location.pathname + props.location.hash === path}
                  to={path}
                  >
                  {path.slice(5) === '/'
                    ? 'Introduction'
                    : startCase(path.slice(5))}
                </NavLink>
                <nav>
                  {node.headings &&
                    node.headings.map((h, i) => {
                      if (h.depth !== 2) {
                        return;
                      }
                      const hashPath = path + '#' + kebabCase(h.value);
                      return (
                        <NavLink
                          w={1}
                          pl={4}
                          key={hashPath}
                          is={Link}
                          key={hashPath}
                          // active={(props.location.pathname + props.location.hash) === hashPath}
                          to={hashPath}
                          >
                            {h.value}
                        </NavLink>
                      );
                    })}
                  </nav>
                </Box>
              );
            })}
            </Flex>
          </nav>
        </Box>
        <Box width={
          [
            1,
            3/4
          ]
        }>
          {children()}
        </Box>
      </Flex>
    </Base>
  );
};

export default DocsLayout;

export const DocsLayoutQuery = graphql`
query DocsLayoutQuery {
  repo {
    name
    description
    html_url
  }
  allMarkdownRemark(
    filter: {
      fields: { slug: { regex: "/docs/" } }
    }
  ) {
    edges {
      node {
        headings {
          value
          depth
        }
        fields {
          slug
        }
      }
    }
  }
}`;
