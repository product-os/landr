import React from 'react'
import { withRouter } from 'react-router'
import { matchPath } from 'react-router'
import { renderRoutes } from 'react-router-config'
import { withTheme } from 'styled-components'
import { Heading, Button, Banner, Text, Flex, Box } from 'resin-components'
import Link from 'components/Link'
import Sidebar from 'components/Sidebar'
import Doc from 'components/Doc'

const findDoc = props => {
  const slug = matchPath(props.route.path, {
    path: '/docs/:slug'
  }).params.slug

  return props.docs.find(doc => doc.slug === slug)
}

const Index = props => {
  const doc = findDoc(props)
  return <Doc {...doc} />
}

export default withRouter(withTheme(Index))
