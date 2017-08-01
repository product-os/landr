import React from 'react';
import RLink from 'gatsby-link';
import { getGithubFilePath } from 'www/utils';
import { Absolute, Relative, Tooltip, Column, Link, Text } from 'rebass';
import GithubIcon from 'react-icons/lib/go/pencil';

class Index extends React.Component {
  render() {
    const { markdownRemark, repo } = this.props.data;
    return (
      <Column px={5}>
        <Relative w={1}>
          <Absolute top right>
            <Tooltip
              text="edit on github"
            >
              <Link
                as={RLink}
                href={getGithubFilePath(repo.html_url)(
                  markdownRemark.fileAbsolutePath
                )}
                target="_blank"
                rel="noopener"
              >
                <GithubIcon />
              </Link>
            </Tooltip>
          </Absolute>
        </Relative>
        <Text
          dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
        />
      </Column>
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
