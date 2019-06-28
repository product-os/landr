import React, {
  useState,
  useCallback
} from 'react'
import styled from 'styled-components'
import {
  Box, Divider, Flex, Txt, Heading
} from 'rendition'

// TODO: This component doesn't live yet in Rendition.
// Update it when we use the Grommet equivalent

const Collapse = styled(Txt) `
  overflow: hidden;
  max-height: ${(props) => { return (props.isOpen ? '100vh' : '0') }};
  transition: max-height 0.4s ease-in-out;
  max-width: 1000px;
  padding-left: 16px;
  cursor: initial;
`

const Content = styled(Box) `
  margin-top: 10px;
  margin-bottom: 20px;
  max-width: 800px;
  ul {
    margin-top: 8px;
    padding-left: 40px;
    list-style: unset;
  }
`

const Accordian = ({
  items
}) => {
  const [ openIndex, setOpenIndex ] = useState(null)

  const toggle = (key) => {
    setOpenIndex(openIndex === key ? null : key)
  }

  return (
    <Box>
      {items.map((item, index) => {
        const toggleRow = useCallback(
          () => {
            toggle(index)
          },
          [ index ]
        )

        return (
          <Box key={index} style={{
            cursor: 'pointer'
          }}>
            <Flex align="center" justify="space-between">
              <Flex
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                onClick={toggleRow}
              >
                <Heading.h5
                  px={3}
                  my={20}
                  fontSize={16}
                  style={{
                    fontWeight: 500
                  }}
                >
                  {item.title}
                </Heading.h5>
                <Txt pr={3} fontSize={24} align="end" color="#c1c7dd">
                  {openIndex === index ? '−' : '+'}
                </Txt>
              </Flex>
            </Flex>
            <Collapse isOpen={openIndex === index}>
              <Content>{item.content}</Content>
            </Collapse>
            <Divider m={0} height={1} color="#c1c7dd" />
          </Box>
        )
      })}
    </Box>
  )
}

export default Accordian
