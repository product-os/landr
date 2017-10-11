import React, { Component } from 'react'
import { Box } from 'resin-components'
import styled from 'styled-components'

const Collapse = Box.extend`
  overflow: hidden;
  max-height: ${props => props.isOpen ? '100vh' : '0'};
  transition: max-height 0.4s ease-in-out;
`

const Wrapper = Box.extend`
  cursor: pointer;
`

class Accordian extends Component {
  constructor() {
    super()
    this.state = {
      openIndex: null
    }
  }

  toggle(key) {
    if (this.state.openIndex === key) {
      key = null
    }
    this.setState({
      openIndex: key
    })
  }

  render({ items }) {
    return (
      <Box>
      {
        items.map((item, i) => {
          const isOpen = this.state.openIndex === i
          return(
            <Wrapper key={i} onClick={() => { this.toggle(i) }}>
              <Box>{item.title}</Box>
              <Collapse isOpen={isOpen}>{item.body}</Collapse>
            </Wrapper>
          )
        })
      }
      </Box>
    )
  }
}

export default Accordian
