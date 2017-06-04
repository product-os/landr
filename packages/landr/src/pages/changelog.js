import React from 'react';
import { Collapse } from 'reactstrap';

const Entry = ({title, content, collapse, toggle, ...props}) => {
  return(
    <div {...props}>
      <div className="py-2">
        <h2 onClick={() => { toggle(props.id) }}>{ title }</h2>
        <Collapse isOpen={collapse}>
          <p
            className="py-2"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Collapse>
        <hr/>
      </div>
    </div>
  )
}

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
        {
          entries.map((entry, i) => {
            return (
              <Entry
                {...entry.node}
                key={i}
                collapse={this.state.collapseId == i}
                toggle={this.toggle}
                id={i}
              />
            )
          })
        }
      </div>
    )
  }
}

export default Changelog

export const pageQuery = graphql`
query changelog {
  allChangelog {
    edges {
      node {
        title
        content
      }
    }
  }
}
`
