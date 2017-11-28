import React from 'react'
import Doc from '../components/Doc'
import { getSiteProps } from '@resin.io/react-static'

export default getSiteProps(({ docs, location }) => {
  const key = location.pathname.replace('/docs/', '')
  return <Doc {...docs.find(({ slug }) => (slug === key))} />
})
