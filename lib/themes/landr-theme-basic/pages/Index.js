import React from 'react'
import Jumbotron from 'components/Jumbotron'
import Downloads from 'components/Downloads'
import { Heading, Button, Banner, Text } from 'rebass'

const Index = (props) => {
  return (
    <div>
      <Jumbotron {...props} />
      <Downloads {...props} />
    </div>
  )
}

export default Index
