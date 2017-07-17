import React from 'react';
import Jumbotron from 'www/components/Jumbotron';
import Contributors from 'www/components/Contributors';
import Section from 'www/components/Section';
import Stats from 'www/components/Stats';

class Index extends React.Component {
  render() {
    const { readme, repo } = this.props.data;
    return (
      <div>
        <Jumbotron
          repo={repo}
        />
        <Stats repo={repo} />
        <Section className="bg-inverse text-white py-5" {...readme.installation} />
        <Section {...readme.features} />
        <Contributors contributors={repo.contributors}/>
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
    forks_count
    stargazers_count
    releases {
      id
      tag_name
      html_url
    }
    contributors {
      avatar_url
      login
      contributions
      html_url
    }
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
