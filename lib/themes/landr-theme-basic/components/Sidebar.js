import React from 'react'
import Link from 'components/Link'

export default ({ items }) => {
  {
    links.map(doc => {
      return (
        <Box>
          <Link style={{ width: '100%' }} color={'white'} p={2} to={link.to}>
            {link.text}
          </Link>
        </Box>
      )
    })
  }
}
