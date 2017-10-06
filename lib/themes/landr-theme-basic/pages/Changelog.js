import React from 'react'
import Doc from 'components/Doc'

function createMarkup(html) {
  return {__html: html};
}

export default ({ changelog }) => {
  return (
    <Doc markup={changelog} />
  )
}
