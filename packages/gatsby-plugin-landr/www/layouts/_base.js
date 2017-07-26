import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import 'www/styles/index.scss';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import lowerCase from 'lodash/lowerCase';
import GithubIcon from 'react-icons/lib/go/mark-github';

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
      <div>
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
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <Link className="navbar-brand" to="/">{data.repo.name}</Link>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className="nav-link" to="/docs">Docs</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/changelog">Changelog</Link>
              </NavItem>
              <NavItem>
                <a
                  className="nav-link"
                  href={data.repo.html_url}
                  target="_blank"
                >
                  <GithubIcon />
                </a>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
