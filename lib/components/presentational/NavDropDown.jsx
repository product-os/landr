/* eslint-disable react/jsx-no-bind */
import React from 'react'
import styled from 'styled-components'
import {
  Link
} from 'react-router-dom'
import {
  Box, Divider, Link as RenditionLink, Txt
} from 'rendition'

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'
export const invertBreakpoint = (breakpoint) => {
  return breakpoint - 0.01
}

const Panel = styled(Box) `
  min-width: 169px;
  border-radius: 2px;
  box-shadow: -10px 9px 21px 0 rgba(152, 173, 227, 0.08);
  border: solid 1px #e8ebf2;
  background-color: #ffffff;
  margin-top: 12px;
`

const PanelWrapper = styled(Box) `
  transform: translateX(-20px);
  position: absolute;
  z-index: 2;

  @media (max-width: ${(props) => {
    return invertBreakpoint(props.theme.breakpoints[1])
  }}px) {
    transform: none;
    position: relative;

    > div {
      margin: 0;
      width: 100%;
      border: none;
      box-shadow: none;
      padding: 0;
    }
  }
`

const Item = styled(Box) `
  &:hover {
    background: white;
  }

  > div {
    margin: 0;
  }

  a {
    width: 100%;
  }

  @media (max-width: ${(props) => {
    return invertBreakpoint(props.theme.breakpoints[1])
  }}px) {
    padding: 0;

    a {
      padding-left: 16px;
    }
  }
`

export const NavDropDown = (props) => {
  const [ dropDownOpen, setDropDownOpen ] = React.useState(false)

  const showDropdown = (event) => {
    event.preventDefault()
    setDropDownOpen(true)
  }

  const hideDropdown = (event) => {
    event.preventDefault()
    setDropDownOpen(false)
  }

  const toggle = (event) => {
    event.preventDefault()
    setDropDownOpen((open) => {
      return !open
    })
  }

  return (
    <Box onMouseLeave={hideDropdown}>
      <RenditionLink
        is={Link}
        fontSize={0}
        to="#"
        color="text.main"
        onClick={toggle}
        onMouseOver={showDropdown}
        py={2}
        {...props}
      >
        <Txt.span
          bold
          mr={3}
          style={{
            textDecoration: 'underline'
          }}
        >
          {props.title}
        </Txt.span>
        <FontAwesomeIcon
          icon={dropDownOpen ? [ 'fas', 'chevron-up' ] : [ 'fas', 'chevron-down' ]}
          size="xs"
        />
      </RenditionLink>

      {dropDownOpen && (
        <PanelWrapper>
          <Panel px={2} py={2}>
            {React.Children.map(props.children, (child, index) => {
              return (
                <Box key={index}>
                  {props.showDividers && index !== 0 && (
                    <Divider my={0} mx={3} color="text.main" />
                  )}
                  <Item px={3} py={props.showDividers ? 2 : 1}>
                    {child}
                  </Item>
                </Box>
              )
            })}
          </Panel>
        </PanelWrapper>
      )}
    </Box>
  )
}

export default NavDropDown
