import React from 'react';
import ChangelogEntry, { ChangelogQuery } from 'www/components/ChangelogEntry';

class Changelog extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapseId: null };
  }

  toggle(key) {
    if (key === this.state.collapseId) {
      this.setState({ collapseId: null });
    } else {
      this.setState({ collapseId: key });
    }
  }

  render() {
    const entries = this.props.data.allChangelog.edges;
    return (
      <div className="container pt-5">
        {entries.map((entry, i) => {
          return (
            <ChangelogEntry
              {...entry.node}
              key={i}
              collapse={this.state.collapseId == i}
              toggle={this.toggle}
              id={i}
            />
          );
        })}
      </div>
    );
  }
}

export default Changelog;

export const pageQuery = graphql`
query changelog {
  allChangelog {
    edges {
      node {
        ...Changelog_query
      }
    }
  }
}
`;
