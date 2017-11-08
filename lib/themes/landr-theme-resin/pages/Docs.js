import React from 'react'
import Doc from '../components/Doc'
import { getSiteProps } from '@resin.io/react-static'

export default getSiteProps(({ children, docs }) => {
  return (
    <div>
      {children}
      <Doc {...docs[0]} />
    </div>
  )
})
