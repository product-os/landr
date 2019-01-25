const React = require('react');
const Rendition = require('rendition');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language } = this.props;

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <div className="homeContainer heroBg">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">
            <div className="inner">
              <h1 className="projectTitle">
                {siteConfig.title}
                <small>{siteConfig.tagline}</small>
              </h1>
              <div className="section promoSection">
                <div className="promoRow">
                  <div className="pluginRowBlock">
                    <Button href={siteConfig.releases.html_url}>
                      Download {siteConfig.releases.tag_name}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig } = this.props;

    const Features = () => (
      <Rendition.Flex>
        <Rendition.Box>
          <Rendition.Card>
            This renders a rendition Card component
          </Rendition.Card>
        </Rendition.Box>
        <Rendition.Box>
          <Rendition.Card>
            This renders a rendition Card component
          </Rendition.Card>
        </Rendition.Box>
        <Rendition.Box>
          <Rendition.Card>
            This renders a rendition Card component
          </Rendition.Card>
        </Rendition.Box>
        <Rendition.Box>
          <Rendition.Card>
            This renders a rendition Card component
          </Rendition.Card>
        </Rendition.Box>
      </Rendition.Flex>
    );

    return (
      <Rendition.Provider>
        <HomeSplash siteConfig={siteConfig} />
        <Rendition.Alert>This is an Rendition alert</Rendition.Alert>
        <Features />
      </Rendition.Provider>
    );
  }
}

module.exports = Index;
