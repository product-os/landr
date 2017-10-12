import React from 'react'
import Jumbotron from 'components/Jumbotron'
import Downloads from 'components/Downloads'
import Features from 'components/Features'
import Motivation from 'components/Motivation'
import FAQ from 'components/FAQ'
import styled, { withTheme } from 'styled-components'

const Index = withTheme(props => {
  return (
    <div>
      <Jumbotron {...props} />
      {props.config.settings.features && <Features {...props} />}
      {props.releases[0] && <Downloads release={props.releases[0]} />}
      {props.config.settings.features && <Motivation {...props} />}
      {props.faqs.length > 0 && <FAQ faqs={props.faqs} />}
    </div>
  )
})

export default Index
