import React from 'react'
import styled from 'styled-components'
import {
  Box, Flex, Txt
} from 'rendition'
import Typist from 'react-typist'

const TerminalView = styled(Flex) `
  font-family: Consolas, 'Andale Mono WT', 'Andale Mono', 'Lucida Console',
    'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono',
    'Liberation Mono', 'Nimbus Mono L', Monaco, 'Courier New', Courier,
    monospace;
  max-width: 600px;
  height: 280px;
  background: black;
  border-radius: 4px;
  margin: 24px auto 16px;
  flex-direction: column;
  font-size: 16px;
  box-shadow: 0px 2px 13px #140e0e;
`

const Bullet = styled(Box) `
  display: inline-box;
  border-radius: 12px;
  height: 12px;
  width: 12px;
  margin: 0 4px;
`

const Body = styled(Box) `
  padding: 16px 24px;
  flex: 1;
`

const codeStyles = {
  color: '#c1c1c1',
  fontWeight: 600,
  letterSpacing: '-0.3px',
  lineHeight: 2
}

const commentStyles = {
  color: 'gray',
  fontWeight: 600,
  letterSpacing: '-0.3px',
  lineHeight: 2
}

const TerminalArrow = () => {
  return (
    <Txt.span mr={2} color="#28cd41">
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
          accumulator.push(<Txt.span
            key={accumulator.length}
            style={commentStyles}># {definition.command}</Txt.span>)
        } else {
          accumulator.push(<Txt.span key={accumulator.length} style={codeStyles}>
            <TerminalArrow />
            {definition.command}
          </Txt.span>)
        }

        return accumulator
      }, [])
    }
  }

  render () {
    const {
      commands
    } = this.state

    // The colors are taken from here https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color/
    // Trying to replicate the macOS terminal look and feel
    return (
      <TerminalView>
        <Box px={3} mt={3}>
          <Bullet bg="#ff3b30" />
          <Bullet bg="#ff9501" />
          <Bullet bg="#28cd41" />
        </Box>
        <Body>
          <Typist>{commands}</Typist>
        </Body>
      </TerminalView>
    )
  }
}

export default Terminal
