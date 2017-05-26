import React from 'react'

import '../styles/index.scss'

class Layout extends React.Component {
  render() {
    return (
      <div>
        {this.props.children()}
      </div>
    )
  }
}

export default Layout
