import React from 'react'
import Jumbotron from 'components/Jumbotron'
import Downloads from 'components/Downloads'
import Features from 'components/Features'
import Motivation from 'components/Motivation'
import styled, { withTheme } from 'styled-components'

const Index = withTheme((props) => {
  return (
    <div>
      <Jumbotron {...props} />
      {
        props.landrConfig.settings.features && <Features {...props} />
      }
      {
        props.landrConfig.settings.features && <Motivation {...props} />
      }
      {
        props.releases && <Downloads release={props.releases[0]} />
      }
    </div>
  )
})

export default Index
