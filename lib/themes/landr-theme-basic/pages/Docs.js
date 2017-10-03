import React from 'react'
import { renderRoutes } from 'react-router-config'
import { withTheme } from 'styled-components'
import { Heading, Button, Banner, Text, Flex, Box } from 'resin-components'
import Link from 'components/Link'
import upperFirst from 'lodash/upperFirst'

const Index = ({ match, ...props }) => {
  return (
    <Flex wrap>
      <Box
        px={3}
        color={'white'} bg={props.theme.colors.gray.dark}
        width={[ 1, 1/5 ]}
        >
        {
          Object.keys(props.docs).map(doc => {
            return (
              <Box>
                <Link style={{ width: '100%'}} color={'white'} p={2} to={`/docs/${doc}`}>{upperFirst(doc)}</Link>
              </Box>
            )
          })
        }
      </Box>
      <Box
        width={[1, 3/4]}
        p={5}
        >
        {renderRoutes(props.route.routes, props)}
      </Box>
    </Flex>
  )
}

export default withTheme(Index)
