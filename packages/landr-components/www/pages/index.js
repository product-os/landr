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
    const { readme, repo } = this.props.data;
    return (
      <div>
        <Jumbotron
          repo={repo}
        />
        <div>
          <p className="text-center">We have {repo.forks_count} forks, {repo.stargazers_count} stars. </p>
        </div>
        <Section className="bg-inverse text-white" {...readme.installation} />
        <Section {...readme.features} />
      </div>
    );
  }
}

export default Index;

export const pageQuery = graphql`
query index {
  repo {
    name
    description
  }
  readme {
    badges
    installation {
      title
      content
    }
  }
}
`;
