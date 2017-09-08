import React from 'react';
import Helmet from 'react-helmet';
import lowerCase from 'lodash/lowerCase';
import { Provider } from 'rebass';
import theme, { globalStyles } from 'www/theme';
import Nav from 'www/components/Nav';
import { injectGlobal } from 'styled-components';
import Footer from 'www/components/Footer';

injectGlobal`${globalStyles}`;

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  pageTitle(repoName, path) {
    if (path === '/') {
      return repoName;
    }
    return `${repoName} - ${lowerCase(path)}`;
  }

  render() {
    const { data, location } = this.props;
    return (
      <Provider theme={theme}>
        <Helmet
          defaultTitle={this.pageTitle(
            data.repo.name,
            this.props.location.pathname
          )}
          titleTemplate={`%s | ${data.repo.name}`}
          link={[
            {
              rel: 'shortcut icon',
              href: '/static/favicon.ico',
              type: 'image/x-icon'
            }
          ]}
          meta={[
            {
              name: 'og:type',
              content: 'website'
            },
            {
              name: 'og:site_name',
              content: data.repo.name
            }
          ]}
        />
        <Nav repo={data.repo} activePath={this.props.location.pathname} />
        {this.props.children}
        <Footer repo={data.repo} />
      </Provider>
    );
  }
}

export default Layout;
