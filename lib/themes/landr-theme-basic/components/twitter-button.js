import React from 'react'
import ReactDOM from 'react-dom'

let ghButtons = {
  render: function() {}
}
export default class GitHubButton extends React.Component {
  render () {
    return React.createElement('span', null, React.createElement('a', this.props, this.props.children))
  }
  componentDidMount () {
    ghButtons = require('github-buttons')
    try {
      ghButtons.render(this._ = ReactDOM.findDOMNode(this).firstChild)
    } catch (err) {
    }
  }
}
