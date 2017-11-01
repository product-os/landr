import React from 'react'
import images from 'images'

export default ({ children, styleTags, scriptTags, pages, ...props }) => {
  let locals = {
    __html: safeStringify(props.locals)
  }

  let routeConfig = {
    __html: safeStringify(pages)
  }

  let pathPrefix = ''
  if (__PATH_PREFIX__) {
    pathPrefix = `${__PATH_PREFIX__}`
  }

  return (
    <html>
      <head>
        <title>{`${props.locals.repository.name} - ${props.locals.config
          .settings.lead || props.locals.repository.description}`}</title>
        <meta name="og:type" content="website" />
        <meta name="og:site_name" content={props.locals.repository.name} />
        <meta name="og:image" content={images[props.locals.repository.name]} />
        <meta
          name="og:description"
          content={
            props.locals.config.settings.lead ||
            props.locals.repository.description
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto|Ubuntu+Mono"
        />
        {styleTags}
      </head>
      <body>
        <div
          id="mount"
          dangerouslySetInnerHTML={{
            __html: children
          }}
        />
        <script
          id="__LANDR__LOCALS"
          type="application/json"
          dangerouslySetInnerHTML={locals}
        />
        <script
          id="__LANDR__ROUTES"
          type="application/json"
          dangerouslySetInnerHTML={routeConfig}
        />
        {scriptTags.map(tag => {
          return <script key={tag} src={pathPrefix + tag} />
        })}
      </body>
    </html>
  )
}

// Copy all properties except webpackStats (added in by Webpack), which is huge,
// has circular references and will not be used by the React components anyways.
// Make regex replacements to not break the HTML as well.
function safeStringify(obj) {
  // let objNoStats = {}
  // for (var key in obj) {
  //   if (obj.hasOwnProperty(key) && key != 'webpackStats') {
  //     objNoStats[key] = obj[key]
  //   }
  // }
  return JSON.stringify(obj)
    .replace(/<\/script/g, '<\\/script')
    .replace(/<!--/g, '<\\!--')
}
