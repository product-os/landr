import React from 'react'
import { Flex, Box, Heading, Text, Container } from 'resin-components'
import Link from 'components/Link'
import styled from 'styled-components'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import map from 'lodash/map'
import StarIcon from 'react-icons/lib/go/star'
import TweetIcon from 'react-icons/lib/ti/social-twitter-circular'

const TableCell = Box.extend`
  border-bottom: ${props => `1px solid ${props.theme.colors.gray2}`};
`

const TableHead = Box.extend`
  border-bottom: ${props => `2px solid ${props.theme.colors.gray2}`};
`

const Table = ({ assets, title }) => {
  return (
    <div>
      {title && (
        <Heading.h5 align="center" mb={3}>
          {title}
        </Heading.h5>
      )}
      <Flex wrap>
        <TableHead mb={2} px={1} width={2 / 3}>
          <Text bold>Asset</Text>
        </TableHead>
        <TableHead mb={2} px={1} width={1 / 6}>
          <Text bold>OS</Text>
        </TableHead>
        <TableHead mb={2} px={1} width={1 / 6}>
          <Text bold>Arch</Text>
        </TableHead>
      </Flex>
      {assets.map((asset, i) => {
        return (
          <Flex wrap mb={2} key={i}>
            <TableCell py={2} px={1} width={[2 / 3]}>
              <Link to={asset.browser_download_url}>{asset.name}</Link>
            </TableCell>
            <TableCell py={2} px={1} width={1 / 6}>
              <Text>{asset.os}</Text>
            </TableCell>
            <TableCell py={2} px={1} width={1 / 6}>
              <Text>{asset.arch}</Text>
            </TableCell>
          </Flex>
        )
      })}
    </div>
  )
}

export default ({ release }) => {
  const releaseTypes = groupBy(release.assets, 'type')
  return (
    <Container py={5}>
      <Heading align="center" mb={3}>
        Downloads
      </Heading>
      {map(releaseTypes, (val, key) => {
        return <Table assets={val} title={key} />
      })}
    </Container>
  )
}
