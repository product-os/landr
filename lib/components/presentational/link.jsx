import React from 'react'
import {
  Link as InternalRoute
} from 'react-router-dom'
import {
  useBasepath
} from 'react-static'
import {
  Link as BaseRoute, useTheme
} from 'rendition'

const Link = (props) => {
  const theme = useTheme()

  const basepath = useBasepath()

  const internalUrl = `${basepath}${props.url}`

  return (
    <BaseRoute
      {...props}
      color={theme.colors.text.main}
      is={InternalRoute}
      style={{
        fontSize: '14px',
        fontWeight: 600
      }}
      to={internalUrl}
    >
      {props.children || props.text}
    </BaseRoute>
  )
}

export default Link
