import React from 'react';
import { Jumbotron } from 'reactstrap';

const Section = ({title, content, ...props}) => {
  return(
    <div {...props}>
      <div className="container py-5">
        <h2>{ title }</h2>
        <p
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  )
}

class Index extends React.Component {

  render() {
    const readme = this.props.data.readme;
    return (
      <div>
        <Jumbotron className="mb-0">
          <div className="container">
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
          </div>
        </Jumbotron>
        <Section className="bg-inverse text-white" {...readme.installation} />
        <Section {...readme.features} />
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
