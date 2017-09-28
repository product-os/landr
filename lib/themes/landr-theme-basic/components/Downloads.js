import React from 'react'
import { Flex, Box, Container, Heading, Text, Link, Label} from 'rebass'
import styled from 'styled-components'
import get from 'lodash/get'
import StarIcon from 'react-icons/lib/go/star'
import TweetIcon from 'react-icons/lib/ti/social-twitter-circular'

const Span = styled(Text)`
  display: inline-block;
`

const TableCell = styled(Box)`
  border-bottom: ${props => `1px solid ${props.theme.colors.gray2}`}
`

const TableHead = styled(Box)`
  border-bottom: ${props => `2px solid ${props.theme.colors.gray2}`}
`

export default (props) => {
  const latestRelease = props.releases[0]
  return (
    <Container py={5}>
      <Heading center mb={3}>Downloads</Heading>
      <Flex>
        <TableHead mb={2} width={2 / 3}>
          <Label>Asset</Label>
        </TableHead>
        <TableHead mb={2} width={1 / 6}>
          <Label>Published</Label>
        </TableHead>
        <TableHead mb={2} width={1 / 6}>
          <Label>Content-Type</Label>
        </TableHead>
      </Flex>
      {
          latestRelease.assets.map((asset, i) => {
            const d = new Date(asset.created_at)
            return (
              <Flex mb={2} key={i}>
                <TableCell py={2} width={2 / 3}>
                  <Link href={asset.browser_download_url}>{asset.name}</Link>
                </TableCell>
                <TableCell py={2} width={1 / 6}>
                  <Text>{`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`}</Text>
                </TableCell>
                <TableCell py={2} width={1 / 6}>
                  <Text>{asset.content_type}</Text>
                </TableCell>
              </Flex>
            )
          })
        }
    </Container>
  )
}
