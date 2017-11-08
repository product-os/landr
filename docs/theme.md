<a name="landr"></a>

## landr ⇒ <code>Object</code>
Welcome to landr's api documentation.

This document aims to describe all the functions supported by landr in a webpack environment, as well as showing examples of their expected usage.

It's important to remember that this api is only accessible when in the build process and cannot be accessed outside.
If you feel something is missing, not clear or could be improved, please don't hesitate to open an [issue in GitHub](https://github.com/resin-io/landr/issues/new), we'll be happy to help.

**Kind**: global namespace  
**Example**  
```js
import landr from 'landr'
```

* [landr](#landr) ⇒ <code>Object</code>
    * [.assets](#landr.assets)
    * [.Link](#landr.Link)
    * [.Tracker](#landr.Tracker)
    * [.Routes](#landr.Routes)
    * [.paths](#landr.paths)
    * [.Router](#landr.Router)
    * [.getSiteProps](#landr.getSiteProps)
    * [.Head](#landr.Head)

<a name="landr.assets"></a>

### landr.assets
**Kind**: static property of [<code>landr</code>](#landr)  
**Summary**: exports all images from <repo-dir>/www/static/*  
**Access**: public  
**Example**  
```js
import { assets } from 'landr'
console.log(assets.favicon)
```
<a name="landr.Link"></a>

### landr.Link
**Kind**: static property of [<code>landr</code>](#landr)  
**Summary**: Link component automatically uses push state * api for internal links and regular <a> for external.  
**Access**: public  
**Example**  
```js
import { Link } from 'landr'
() => <Link to="google.com" target children="click me" />
```
<a name="landr.Tracker"></a>

### landr.Tracker
**Kind**: static property of [<code>landr</code>](#landr)  
**Summary**: Tracker component for analytics, subscribes to Router to track pageviews,
as well as exposeing
[resin-event-log](https://github.com/resin-io-modules/resin-analytics/tree/master/packages/resin-event-log)
tracker as a context.  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| analytics | <code>Object</code> | The employee who is responsible for the project. |
| analytics.gosquaredId | <code>String</code> | gosquared Id |
| analytics.gaSite | <code>string</code> | google Analytics site eg balena.io |
| analytics.gaId | <code>string</code> | google Analytics ID |
| analytics.mixpanelToken | <code>string</code> | mixpanel token |
| prefix | <code>string</code> | prefix all events with <name> eg. balena |

**Example**  
```js
import { Tracker } from 'landr'
() => <Tracker analytics={{ google.gosquaredId = '12345' }} prefix="landr" children={...} />
```
<a name="landr.Routes"></a>

### landr.Routes
**Kind**: static property of [<code>landr</code>](#landr)  
**Summary**: Routes component which holds all <Routes> created in get config.getRoutes(). Used to automantically generate routes for Router.  
**Access**: public  
**Example**  
```js
import { Router, Routes } from 'landr'

// For standard component routing:
export default () => (
  <Router>
    <Routes />
  </Router>
)
```
<a name="landr.paths"></a>

### landr.paths
**Kind**: static property of [<code>landr</code>](#landr)  
**Summary**: Paths config that is used to make up Routes component.  
**Access**: public  
**Example**  
```js
import { paths } from 'landr'

console.log(paths) // [ { path: '/', component: '/pages/home' }]
```
<a name="landr.Router"></a>

### landr.Router
**Kind**: static property of [<code>landr</code>](#landr)  
**Summary**: react-router component.  
**Access**: public  
**Example**  
```js
import { Router } from 'landr'

Router.subscribe(loading => {
 if (loading) {
   console.log('A page is loading!')
 } else {
   console.log('A page is done loading!')
 }
})
```
<a name="landr.getSiteProps"></a>

### landr.getSiteProps
**Kind**: static property of [<code>landr</code>](#landr)  
**Summary**: higher order component used to get site props  
**Access**: public  
**Example**  
```js
import { getSiteProps } from 'landr'

export default getSiteProps((props) =>
  <div>{props.repository.name}</div>
})
```
<a name="landr.Head"></a>

### landr.Head
**Kind**: static property of [<code>landr</code>](#landr)  
**Summary**: Head is a react component for managing tags in the document's head. Use it to update meta tags, title tags, etc.  
**Access**: public  
**Example**  
```js
import { Head } from 'landr'
export () => (
 <div>
   <Head>
     <meta charSet="UTF-8" />
     <title>This is my page title!</title>
   </Head>
   <div>
     My page content...
   </div>
 </div>
)
```
