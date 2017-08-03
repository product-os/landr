import React from 'react';
import Hero from 'www/components/Hero';
import Contributors from 'www/components/Contributors';
import Section from 'www/components/Section';
import ReleaseNote from 'www/components/ReleaseNote';
import Issues from 'www/components/Issues';
import 'prismjs/themes/prism-solarizedlight.css';

class Index extends React.Component {
  render() {
    const { allReadmeSection, repo, issues } = this.props.data;
    return (
      <div>
        <Hero repo={repo} />
        <ReleaseNote repo={repo} />
        {allReadmeSection &&
          allReadmeSection.edges.map(edge => {
            const node = edge.node;
            return (
              <Section
                py={4}
                html={node.childMarkdownRemark.html}
                title={node.title}
              />
            );
          })}
        <Issues repo={repo} />
        <Contributors py={4} contributors={repo.contributors} />
      </div>
    );
  }
}

export default Index;

export const pageQuery = graphql`
  query index {
    repo {
      name
      full_name
      description
      forks_count
      stargazers_count
      html_url
      releases {
        id
        tag_name
        html_url
      }
      issues {
        id
        title
        labels {
          id
          name
        }
      }
      contributors {
        avatar_url
        login
        contributions
        html_url
      }
    }
    allReadmeSection(
      filter: { title: { regex: "/(start)|(How it works)|(Why)/" } }
    ) {
      edges {
        node {
          title
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`;
