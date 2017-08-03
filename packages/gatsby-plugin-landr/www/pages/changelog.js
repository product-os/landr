import React from 'react';
import Section from 'www/components/Section';

class Changelog extends React.Component {
  render() {
    const entries = this.props.data.allChangelog.edges;
    return (
      <div className="container pt-5">
        {entries.map((entry, i) => {
          return <Section {...entry.node} key={i} id={i} />;
        })}
      </div>
    );
  }
}

export default Changelog;

export const pageQuery = graphql`
  query AllEntries {
    allChangelog {
      edges {
        node {
          title
          html
        }
      }
    }
  }
`;
