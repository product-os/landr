import React from 'react'
import Jumbotron from 'components/Jumbotron'
import Check from 'components/Check'
import ThemePicker from 'components/ThemePicker'
import Footer from 'components/Footer'
import { Heading, Button, Banner, Text } from 'rebass'

const Index = (props) => {
  return (
    <div>
      <Jumbotron />
      <Check {...props} />
      <ThemePicker {...props} />
      <Footer {...props} />
    </div>
  )
}

export default Index
