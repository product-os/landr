import React from 'react'
import {
  Box,
} from 'resin-components'
import styled from 'styled-components'
import { darken } from 'resin-components/dist/utils'

const Code = styled.pre`
  max-width: 100%;
  padding: 20px;
  overflow: scroll;
  border-radius: ${props => props.theme.radius}px;
  background: ${props => darken(props.theme.colors.gray.dark)};
`

module.exports = Code
