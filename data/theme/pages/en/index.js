const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            content: 'Feature 1',
            image: `${baseUrl}img/docusaurus.svg`,
            imageAlign: 'top',
            title: 'Feature One',
          },
          {
            content: 'Feature 2',
            image: `${baseUrl}img/docusaurus.svg`,
            imageAlign: 'top',
            title: 'Feature Two',
          },
        ]}
      </Block>
    );

    return (
      <div>
        <div className="mainContainer">
          <div>This is a placeholder section</div>
          <Features />
        </div>
      </div>
    );
  }
}

module.exports = Index;
