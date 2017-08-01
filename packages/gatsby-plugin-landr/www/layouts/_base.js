import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import lowerCase from 'lodash/lowerCase';
import GithubIcon from 'react-icons/lib/go/mark-github';
import { Provider, Heading, Button, Toolbar, Navlink, NavLink } from 'rebass';
import theme from 'www/theme';
import { injectGlobal } from 'styled-components';
import 'prismjs/themes/prism-solarizedlight.css';

injectGlobal`
* { box-sizing: border-box; }
body { margin: 0; }
ul { list-style: none; }
`;

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
        <Toolbar>
        	<NavLink to="/" is={Link}>
            {data.repo.name}
        	</NavLink>
          <NavLink ml="auto" to="/changelog" is={Link}>
        		Changelog
          </NavLink>
        	<NavLink to="/docs" is={Link}>
            Docs
          </NavLink>
          <NavLink
            href={data.repo.html_url}
            target="_blank"
          >
            <GithubIcon />
          </NavLink>
        </Toolbar>
        {this.props.children}
      </Provider>
    );
  }
}

export default Layout;
