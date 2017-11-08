import React from 'react'
import { Link as RLink } from 'resin-components'
import { Link as RouterLink } from '@resin.io/react-static'

export const isURLExternal = url => {
  return url && url.indexOf('http') !== -1
}

const Link = ({ to, children, ...props }) => {
  const isExternal = isURLExternal(to)
  return (
    <RLink {...props} to={to} href={to} is={!isExternal ? RouterLink : 'a'}>
      {children}
    </RLink>
  )
}

export default Link
