import React from 'react';
import Link from 'gatsby-link';
import { Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';
import startCase from 'lodash/startCase';
import kebabCase from 'lodash/kebabCase';
import Base from 'www/layouts/_base';
import 'prismjs/themes/prism-solarizedlight.css';

const DocsLayout = ({ children, ...props }) => {
  return (
    <Base {...props}>
      <Row>
        <Col xs="3" className="py-3 bg-faded">
          <Nav vertical>
            {props.data.allMarkdownRemark.edges.map(({ node }) => {
              const path = node.fields.slug;
              return (
                <NavItem key={path}>
                  <Link
                    className={`nav-link ${props.location.pathname === path
                      ? 'active'
                      : ''}`}
                    to={path}
                  >
                    {path.slice(5) === '/'
                      ? 'Introduction'
                      : startCase(path.slice(5))}
                  </Link>
                  <Nav vertical className="px-2">
                    {node.headings &&
                      node.headings.map((h, i) => {
                        if (h.depth !== 2) {
                          return;
                        }
                        const hashPath = path + '#' + kebabCase(h.value);
                        return (
                          <NavItem key={i}>
                            <Link
                              className={`nav-link ${props.location.pathname ===
                                hashPath
                                ? 'active'
                                : ''}`}
                              to={`${hashPath}`}
                            >
                              {h.value}
                            </Link>
                          </NavItem>
                        );
                      })}
                  </Nav>
                </NavItem>
              );
            })}
          </Nav>
        </Col>
        <Col xs="7" className="py-3">
          {children()}
        </Col>
      </Row>
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
