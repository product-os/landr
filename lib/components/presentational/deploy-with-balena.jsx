import React from 'react'
import {
  Button, Txt
} from 'rendition'
import styled from 'styled-components'
import balenaLogo from '../../images/balena-smaller.svg'

const BalenaButton = styled(Button) `
  background-color: #07adef !important;
  border-color: #07adef !important;
  &:hover {
    background-color: #008bbf !important;
    border-color: #008bbf !important;
    box-shadow: none !important;
  }
  &:focus {
    border-color: #008bbf !important;
    background-color: #008bbf !important;
    box-shadow: none !important;
  }
`

export const DeployWithBalena = (props) => {
  return (
    <BalenaButton mt={3} {...props} primary href={props.deployUrl}>
      <img
        style={{
          marginRight: 4
        }}
        height="16px"
        width="16px"
        src={balenaLogo}
        alt="Balena logo"
      />
      <Txt.span
        style={{
          fontWeight: 600
        }}
      >
        Deploy with balena
      </Txt.span>
    </BalenaButton>
  )
}
