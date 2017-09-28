import React from 'react'

export default ({ children, styleTags, scriptTags, ...props }) => {
  let initialProps = {
    __html: safeStringify(props)
  }

  return (
    <html>
      <head>
        <title>{props.repository.name}</title>
        {styleTags}
      </head>
      <body>
        <div id='mount' dangerouslySetInnerHTML={{
          __html: children
        }} />
        <script
          id='initial-props'
          type='application/json'
          dangerouslySetInnerHTML={initialProps} />
        {scriptTags.map(tag => {
          return (<script src={tag} />)
        })}
      </body>
    </html>
  )
}

// Copy all properties except webpackStats (added in by Webpack), which is huge,
// has circular references and will not be used by the React components anyways.
// Make regex replacements to not break the HTML as well.
function safeStringify (obj) {
  let objNoStats = {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && key != 'webpackStats') {
      objNoStats[key] = obj[key]
    }
  }
  return JSON.stringify(objNoStats).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}
