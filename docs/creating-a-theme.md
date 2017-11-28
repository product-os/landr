### Creating a theme

A themes folder structure should look like this:
```js
- index.js // entry point for your site
- landr.conf.js // configure interregator plugin and default theme settings
- pages // folder with page components
  - Home.js
  - Docs.js
- components // folder with dumb child components
  - Jumbotron.js
  - Footer.js
  - Doc.js
```

A basic entry point would then be:
```js
import React from 'react'
import { Router, Routes, Link, paths, getSiteProps, Tracker, Head } from 'landr'
import Theme from './theme'
export default getSiteProps((props) => {
  return (
    <Router>
      <Tracker
        prefix={getProp('repository.name')}
        analytics={getProp('settings.analytics')}>
        <Provider
          theme={Theme}>
          <Head>
            <title>{getProp('repository.name')</title>
          </Head>
          <nav>
            {
              path.map(p => {
                return(<Link to={p.path}>{p.name}</Link>)
              })
            }
          </nav>
          <Routes />
          <Footer title={getProp('repository.name')}/>
        </Provider>
      </Tracker>
    </Router>
  )
})
```
