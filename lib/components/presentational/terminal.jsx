import React from 'react'
import styled from 'styled-components'
import {
  Flex, Txt
} from 'rendition'
import Typist from 'react-typist'

const TerminalView = styled(Flex) `
  font-family: Consolas, 'Andale Mono WT', 'Andale Mono', 'Lucida Console',
    'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono',
    'Liberation Mono', 'Nimbus Mono L', Monaco, 'Courier New', Courier,
    monospace;
  max-width: 460px;
  height: 280px;
  background: #2a506f;
  border-radius: 5px;
  margin: 24px auto 16px;
  font-size: 16px;
  padding: 35px;
`

const codeStyles = {
  color: '#fff',
  fontWeight: 600,
  letterSpacing: '-0.3px',
  lineHeight: 2
}

const commentStyles = {
  color: '#7f96a8',
  fontWeight: 600,
  letterSpacing: '-0.3px',
  lineHeight: 2
}

const TerminalArrow = () => {
  return (
    <Txt.span mr={2} color="#29dd46">
      ~
    </Txt.span>
  )
}

class Terminal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      commands: props.commands.reduce((accumulator, definition, index) => {
        if (index !== 0) {
          accumulator.push(<br key={accumulator.length} />)
        }

        if (definition.comment) {
          accumulator.push(
            <Txt.span key={accumulator.length} style={commentStyles}>
              # {definition.command}
            </Txt.span>
          )
        } else {
          accumulator.push(
            <Txt.span key={accumulator.length} style={codeStyles}>
              <TerminalArrow />
              {definition.command}
            </Txt.span>
          )
        }

        return accumulator
      }, [])
    }
  }

  render () {
    const {
      commands
    } = this.state

    return (
      <TerminalView>
        <Typist>{commands}</Typist>
      </TerminalView>
    )
  }
}

export default Terminal
