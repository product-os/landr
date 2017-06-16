import React from 'react';
import Jumbotron from 'www/components/Jumbotron';

const Section = ({ title, content, ...props }) => {
  return (
    <div {...props}>
      <div className="container py-5">
        <h2>{title}</h2>
        <p dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

class Index extends React.Component {
  render() {
    const readme = this.props.data.readme;
    return (
      <div>
        <Jumbotron
          title={readme.title}
          lead={readme.lead}
          badges={readme.badges}
        />
        <Section className="bg-inverse text-white" {...readme.installation} />
        <Section {...readme.features} />
      </div>
    );
  }
}

export default Index;

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
  }
}
`;
