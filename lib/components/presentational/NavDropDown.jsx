/* eslint-disable react/jsx-no-bind */
import React from 'react'
import styled from 'styled-components'
import {
  Link
} from 'react-router-dom'
import {
  Box, Divider, Flex, Link as RenditionLink, Txt
} from 'rendition'

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'
import {
  faChevronDown
} from '@fortawesome/free-solid-svg-icons/faChevronDown'
import {
  faChevronUp
} from '@fortawesome/free-solid-svg-icons/faChevronUp'

const windowGlobal = typeof window !== 'undefined' && window

const getWindowWidth = () => {
  if (!windowGlobal) {
    return 0
  }

  return windowGlobal.innerWidth
}

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

const onMobileWidth = () => {
  return getWindowWidth() <= 992
}

export const NavDropDown = (props) => {
  const [ dropDownOpen, setDropDownOpen ] = React.useState(false)

  const showDropdown = (event) => {
    event.preventDefault()
    if (onMobileWidth()) {
      return
    }
    setDropDownOpen(true)
  }

  const hideDropdown = (event) => {
    event.preventDefault()
    if (onMobileWidth()) {
      return
    }
    setDropDownOpen(false)
  }

  const toggle = (event) => {
    event.preventDefault()
    if (onMobileWidth()) {
      setDropDownOpen((open) => {
        return !open
      })
    }
  }

  return (
    <Box onMouseLeave={hideDropdown}>
      <RenditionLink
        is={Link}
        to="#"
        color="text.main"
        onClick={toggle}
        onMouseOver={showDropdown}
        py={2}
        {...props}
      >
        <Flex alignItems={'center'} justifyContent="center">
          <Txt.span fontSize="12px" bold mr={2}>
            {props.title}
          </Txt.span>
          <Txt.span
            fontSize="10px"
            style={{
              transform: 'translateY(-4px)'
            }}
          >
            <FontAwesomeIcon
              icon={dropDownOpen ? faChevronUp : faChevronDown}
            />
          </Txt.span>
        </Flex>
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
