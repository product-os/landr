import React from 'react'
import {
  Link as InternalRoute
} from 'react-router-dom'
import {
  Link as BaseRoute, useTheme
} from 'rendition'

const Link = (props) => {
  const theme = useTheme()
  const isExternal = props.url.startsWith('http')
  const baseComponent = isExternal ? 'a' : InternalRoute
  return (
    <BaseRoute
      {...props}
      color={theme.colors.text.main}
      is={baseComponent}
      blank={isExternal}
      style={{
        fontSize: '14px',
        fontWeight: 600
      }}
      to={props.url}
    >
      {props.children || props.text}
    </BaseRoute>
  )
}

export default Link
