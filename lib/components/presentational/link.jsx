import React from 'react'
import {
  Link as InternalRoute
} from 'react-router-dom'
import {
  Link as BaseRoute, useTheme
} from 'rendition'

const Link = (props) => {
  const theme = useTheme()
  const isExternal = props.url ? props.url.startsWith('http') : false
  const baseProps = isExternal
    ? {
      href: props.url,
      blank: true
    }
    : {
      is: InternalRoute,
      to: props.url
    }
  return (
    <BaseRoute
      {...props}
      color={theme.colors.text.main}
      style={{
        fontSize: '14px',
        fontWeight: 600
      }}
      {...baseProps}
    >
      {props.children || props.text}
    </BaseRoute>
  )
}

export default Link
