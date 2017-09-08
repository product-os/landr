import React, { Component } from 'react';
import RLink from 'gatsby-link';
import { getGithubFilePath } from 'www/utils';
import { Absolute, Relative, Tooltip, Column, Link, Text } from 'rebass';
import GithubIcon from 'react-icons/lib/go/pencil';

class Index extends Component {
  render() {
    const { markdownRemark, repo } = this.props.data;
    return (
      <Text
        className={'doc'}
        dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
      />
    );
  }
}

export default Index;

export const pageQuery = graphql`
  query DocBySlug($slug: String!) {
    repo {
      html_url
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      timeToRead
      html
      fileAbsolutePath
    }
  }
`;
