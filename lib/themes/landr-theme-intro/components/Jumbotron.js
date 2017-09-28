import React from 'react'
import { Heading, Button, Text } from 'rebass'
import Banner from 'components/Banner'

export default ({ children }) => {
  return(
    <Banner color="#fff">
      <Heading>Welcome to LANDR 👋</Heading>
    </Banner>
  )
}
