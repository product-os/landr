import React from 'react';
import { Jumbotron } from 'reactstrap';

function Section(props) {
  if (props) {
    return(
      <div className="container">
        <h2>{ props.title }</h2>
        <p
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
    )
  }
}

class Index extends React.Component {

  render() {
    const readme = this.props.data.readme;
    return (
      <div>
        <Jumbotron>
          <h1 className="display-3">{readme.title}</h1>
          <p className="lead" dangerouslySetInnerHTML={{ __html: readme.lead }} />
          <hr className="my-2" />
          { readme.images.logo &&
            <img
              style={{ maxWidth: '400px' }}
              src={readme.images.logo}
            />
          }
          <p>Check out all my badges</p>
          <p
            dangerouslySetInnerHTML={{ __html: readme.badges }}
          />
        </Jumbotron>
        { Section(readme.installation) }
        { Section(readme.features) }
      </div>
    )
  }
}

export default Index

export const pageQuery = graphql`
query index {
  readme {
    title
    lead
    badges
    installation {
      title
      content
    }
    images {
      logo
    }
    features {
      title
      content
    }
  }
}
`
