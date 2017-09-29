import React from 'react'
import Jumbotron from 'components/Jumbotron'
import Downloads from 'components/Downloads'
import Features from 'components/Features'
import styled, { withTheme } from 'styled-components'

const Index = withTheme((props) => {
  return (
    <div>
      <Jumbotron {...props} />
      <Features {...props} />
      <Downloads {...props} />
    </div>
  )
})

export default Index
