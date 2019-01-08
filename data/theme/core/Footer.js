const React = require('react');

class Footer extends React.Component {
  render() {
    return (
      <div className="nav-footer" id="footer">
        <footer className="nav-footer-content">
          <ul>
            {this.props.config.headerLinks.map((x, i) =>
              x.label ? <li key={i}>{x.label}</li> : undefined
            )}
          </ul>
          <h2>{this.props.config.title}</h2>
          <small>{this.props.config.copyright}</small>
        </footer>
      </div>
    );
  }
}

module.exports = Footer;
