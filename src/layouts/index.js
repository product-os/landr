import React from "react"
import Link from "gatsby-link"

import "../styles/index.scss"

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
