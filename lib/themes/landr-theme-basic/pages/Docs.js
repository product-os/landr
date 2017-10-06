import React from 'react'
import { renderRoutes } from 'react-router-config'
import { withTheme } from 'styled-components'
import { Heading, Button, Banner, Text, Flex, Box } from 'resin-components'
import Link from 'components/Link'
import upperFirst from 'lodash/upperFirst'
import humanize from 'underscore.string/humanize'
import Sidebar from 'components/Sidebar'
import Doc from 'components/Doc'

const Index = ({ match, ...props }) => {
  // TODO find a better way to render child routes
  const markup = props.docs[props.route.path.replace('/docs/', '').replace('/', '')]
  return (
    <Flex wrap>
      <Box
        p={3}
        color={'white'} bg={props.theme.colors.gray.dark}
        width={[ 1, 1/5 ]}
        >
        {
          Object.keys(props.docs).map(doc => {
            return (
              <Box>
                <Link style={{ width: '100%'}} color={'white'} p={2} to={`/docs/${doc}`}>{upperFirst(humanize(doc))}</Link>
              </Box>
            )
          })
        }
      </Box>
      <Box
        width={[1, 3/4]}
        p={5}
        >
        {
          markup ? <Doc markup={markup} /> : <div>Not found</div>
        }
      </Box>
    </Flex>
  )
}

export default withTheme(Index)
