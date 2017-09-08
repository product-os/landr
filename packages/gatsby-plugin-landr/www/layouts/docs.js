import React, { Component } from 'react';
import Link from 'www/components/Link';
import { Flex, Box } from 'rebass';
import styled from 'styled-components';
import Base from 'www/layouts/_base';
import SideBar from 'www/components/SideBar';
import theme from 'www/theme';
import ExpandIcon from 'react-icons/lib/fa/expand';
import MdMenu from 'react-icons/lib/md/menu';

const Body = styled(Box)`
  max-width: 800px;
`;

const StyledContainer = styled(Flex)`
  border-right: 1px solid rgba(0,0,0,.07);
`;

class DocsLayout extends Component {
  constructor() {
    super();
    this.state = {
      drawer: true
    };
  }

  toggle(stateKey) {
    this.setState({
      [stateKey]: !this.state[stateKey]
    });
  }

  render() {
    const { children, dark, ...props } = this.props;
    return (
      <Base {...props}>
        <Flex wrap>
          <Box
            style={{ borderRight: '1px solid rgba(0,0,0,.07)' }}
            width={[1, this.state.drawer ? 1 / 4 : 0]}
            color={theme.text(dark)}
            bg={theme.bg(dark)}
          >
            {this.state.drawer &&
              <SideBar
                edges={props.data.allMarkdownRemark.edges}
                pathname={props.location.pathname}
                hash={props.location.hash}
              />}
          </Box>
          <Flex
            align={this.state.drawer ? 'left' : 'center'}
            column={true}
            p={2}
            width={[1, this.state.drawer ? 3 / 4 : 1]}
            style={{ borderBottom: '1px solid rgba(0,0,0,.07)' }}
          >
            <Box>
              {this.state.drawer
                ? <ExpandIcon size="20" onClick={e => this.toggle('drawer')} />
                : <MdMenu size="20" onClick={e => this.toggle('drawer')} />}
            </Box>
            <Body px={5} py={1}>
              {children()}
            </Body>
          </Flex>
        </Flex>
      </Base>
    );
  }
}

export default DocsLayout;

export const DocsLayoutQuery = graphql`
  query DocsLayoutQuery {
    repo {
      name
      description
      html_url
      owner {
        login
        html_url
      }
    }
    allMarkdownRemark(filter: { fields: { slug: { regex: "/docs/" } } }) {
      edges {
        node {
          headings {
            value
            depth
          }
          fields {
            slug
            title
          }
        }
      }
    }
  }
`;
