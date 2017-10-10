import React from 'react'
import { renderRoutes } from 'react-router-config'
import { withTheme } from 'styled-components'
import { Heading, Button, Banner, Text, Flex, Box } from 'resin-components'
import Link from 'components/Link'
import Sidebar from 'components/Sidebar'
import Doc from 'components/Doc'

const Index = ({ match, ...props }) => {
  // TODO find a better way to render child routes
  console.log(props.docs)
  console.log(props.route.path.replace('/docs/', '').replace('/', ''))
  const html = props.docs.find(
    doc => doc.slug === props.route.path.replace('/docs/', '').replace('/', '')
  )
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
        {html ? <Doc {...html} /> : <div>Not found</div>}
      </Box>
    </Flex>
  )
}

export default withTheme(Index)
