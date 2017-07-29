import React from 'react';
import Link from 'gatsby-link';
import { getGithubFilePath } from 'www/utils';
import { UncontrolledTooltip } from 'reactstrap';
import { Row, Col, Badge } from 'reactstrap';
import GithubIcon from 'react-icons/lib/go/pencil';

class Index extends React.Component {
  render() {
    const { markdownRemark, repo } = this.props.data;
    return (
      <div>
        <Row>
          <Col sm="6">
            <small className="font-italic pl-2">
              {markdownRemark.timeToRead} minute read
            </small>
          </Col>
          <Col sm="6" className="d-flex flex-row-reverse">
            <a
              href={getGithubFilePath(repo.html_url)(
                markdownRemark.fileAbsolutePath
              )}
              target="_blank"
              rel="noopener"
              id="UncontrolledTooltipExample"
            >
              <GithubIcon />
            </a>
            <UncontrolledTooltip
              placement="right"
              target="UncontrolledTooltipExample"
            >
              Edit on github
            </UncontrolledTooltip>
          </Col>
        </Row>
        <div
          dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
          className="post pl-2"
        />
      </div>
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
