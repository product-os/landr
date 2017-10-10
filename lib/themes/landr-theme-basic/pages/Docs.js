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
  return (
    <Flex wrap>
      <Box
        p={3}
        color={'white'}
        bg={props.theme.colors.gray.dark}
        width={[1, 1 / 5]}
      >
        {props.docs.map(doc => {
          return (
            <Box>
              <Link
                style={{ width: '100%' }}
                color={'white'}
                p={2}
                to={`/docs/${doc.slug}`}
              >
                {doc.title}
              </Link>
            </Box>
          )
        })}
      </Box>
      <Box width={[1, 3 / 4]} p={5}>
        {doc ? <Doc {...doc} /> : <div>Not found</div>}
      </Box>
    </Flex>
  )
}

export default withRouter(withTheme(Index))
