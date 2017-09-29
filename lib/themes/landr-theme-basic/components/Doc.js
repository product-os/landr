import React from 'react'

function createMarkup(html) {
  return {__html: html};
}

export default ({ match, ...props }) => {
  return (<div dangerouslySetInnerHTML={createMarkup(props.docs[match.params.id])} />);
}
