import React from 'react'
import { Flex, Box, Heading, Text, Container } from 'resin-components'
import Link from 'components/Link'
import styled from 'styled-components'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import map from 'lodash/map'

const TableHead = Box.extend`
  border-bottom: ${props => `2px solid ${props.theme.colors.gray.light}`};
`

const TableRow = Flex.extend`
  border-top: ${props => `1px solid ${props.theme.colors.gray.light}`};
`

const Table = ({ assets, title }, { tracker }) => {
  return (
    <div>
      {title && (
        <Heading.h5 align="center" mt={5}>
          {title}
        </Heading.h5>
      )}
      <Flex wrap>
        <TableHead py={2} px={1} width={2 / 3}>
          <Text bold>Asset</Text>
        </TableHead>
        <TableHead py={2} px={1} width={1 / 6}>
          <Text bold>OS</Text>
        </TableHead>
        <TableHead py={2} px={1} width={1 / 6}>
          <Text bold>Arch</Text>
        </TableHead>
      </Flex>
      {assets.map((asset, i) => {
        return (
          <TableRow wrap py={2} key={i}>
            <Box py={2} px={1} width={[2 / 3]}>
              <Link
                to={asset.browser_download_url}
                onClick={() => {
                  tracker.create('download', asset);
                }}
              >{asset.name}</Link>
            </Box>
            <Box py={2} px={1} width={1 / 6}>
              <Text>{asset.os}</Text>
            </Box>
            <Box py={2} px={1} width={1 / 6}>
              <Text>{asset.arch}</Text>
            </Box>
          </TableRow>
        )
      })}
    </div>
  )
}

Table.contextTypes = {
  tracker: React.PropTypes.object
};

export default ({ release }) => {
  const releaseTypes = groupBy(release.assets, 'type')
  return (
    <Container py={5}>
      <Heading.h2 align="center" mb={5}>
        Downloads
      </Heading.h2>
      {
        map(releaseTypes, (val, key) => {
          return <Table assets={val} title={key !== 'undefined' && key} />
        })
      }
    </Container>
  )
}
