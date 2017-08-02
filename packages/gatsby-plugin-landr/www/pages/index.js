import React from 'react';
import Hero from 'www/components/Hero';
import Contributors from 'www/components/Contributors';
import Section from 'www/components/Section';
import ReleaseNote from 'www/components/ReleaseNote';

class Index extends React.Component {
  render() {
    const { readme, repo } = this.props.data;
    return (
      <div>
        <Hero repo={repo} />
        <ReleaseNote repo={repo} />
        <Section
          className="bg-inverse text-white py-5"
          {...readme.sections.find((s) => s.title === 'Quick start guide')}
        />
        <Section
          className="bg-inverse text-white py-5"
          {...readme.sections.find((s) => s.title === 'How it works')}
        />
        <Section
          className="bg-inverse text-white py-5"
          {...readme.sections.find((s) => s.title === 'Why landr')}
        />
        <Section {...readme.features} />
        <Contributors contributors={repo.contributors} />
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
    sections {
      title
      content
    }
  }
}
`;
