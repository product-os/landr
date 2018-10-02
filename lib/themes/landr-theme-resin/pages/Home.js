import React from 'react'
import { getSiteProps } from '@resin.io/react-static'
import Jumbotron from '../components/Jumbotron'
import Downloads from '../components/Downloads'
import FAQ from '../components/FAQ'
import Features from '../components/Features'
import Motivation from '../components/Motivation'
import Doc from '../components/Doc'
import get from 'lodash/get'

export default getSiteProps(props => {
  const getter = key => get(props, key)
  console.log(props)
  return (
    <div>
      <Jumbotron {...props} />
      <Doc {...props.changelog} />
      {getter('settings.features') && <Features {...props} />}
      {getter('settings.motivation') && <Motivation {...props} />}
      {getter('releases[0]') && <Downloads release={props.releases[0]} />}
      {getter('faqs[0]') && <FAQ faqs={props.faqs} />}
    </div>
  )
})
