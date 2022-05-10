import React from 'react'
import styled from 'styled-components'
import * as color from 'color'
import {
  Box, Txt, useTheme
} from 'rendition'

const StyledBlockQuote = styled(Box) `
  border-left: none !important;
  margin-top: -16px !important;
  font-size: 24px;
  font-stretch: normal;
  font-style: italic;
  line-height: 1.25;
  letter-spacing: normal;
  color: ${(props) => {
    return color(props.theme.colors.primary.main).darken(0.1).hex()
  }} !important;
`

const Quote = styled(Txt.span) `
  line-height: 1;
  display: inline-block;
  vertical-align: baseline;
  padding-right: 8px;
  font-weight: 600;
  font-style: normal;
  transform: translateY(34px);
`

export const BlockQuote = ({
  children, ...props
}) => {
  const theme = useTheme()
  const darkColor = color(theme.colors.primary.main).darken(0.1).hex()
  return (
    <StyledBlockQuote {...props}>
      <Quote
        color={darkColor}
        fontSize="80px"
      >
        &#8221;
      </Quote>
      {children}
    </StyledBlockQuote>
  )
}
