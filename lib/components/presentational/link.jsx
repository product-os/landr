import React from 'react'
import {
  Link as InternalRoute
} from 'react-router-dom'
import {
  Link as BaseRoute, useTheme
} from 'rendition'

const Link = (props) => {
  const theme = useTheme()
  return (
    <BaseRoute
      {...props}
      color={theme.colors.text.main}
      is={InternalRoute}
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
