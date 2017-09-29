import React from 'react'
import {
  Route,
  Link
} from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Heading, Button, Banner, Text, Flex, Box } from 'resin-components'

const Index = ({ match, ...props }) => {
  return (
    <Flex>
      <Box
        width={[ 1, 1/4 ]}
        >
        {
          Object.keys(props.docs).map(doc => {
            return (
              <Text>
                <Link to={`/docs/${doc}`}>{doc}</Link>
              </Text>
            )
          })
        }
      </Box>
      <Box
        width={[1, 3/4]}
        >
        {renderRoutes(props.route.routes, props)}
      </Box>
    </Flex>
  )
}

export default Index
