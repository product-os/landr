// landr util components
import Link from './core/components/Link'
import Tracker from './core/components/Tracker'

// app routes
import Routes, { paths } from 'react-static-routes'

// user assets as object
// found in /www/assets
// object is created in /core/assets
import assets from './core/assets'

// landr-static exports
import {
  Router,
  getSiteProps,
  Head,
} from '@resin.io/react-static'

/**
  * @namespace landr
  * @description
  * Welcome to landr's api documentation.
  *
  * This document aims to describe all the functions supported by landr in a webpack environment, as well as showing examples of their expected usage.
  *
  * It's important to remember that this api is only accessible when in the build process and cannot be accessed outside.
  * If you feel something is missing, not clear or could be improved, please don't hesitate to open an [issue in GitHub](https://github.com/resin-io/landr/issues/new), we'll be happy to help.
  *
  * @returns {Object}
  * @example
  * import landr from 'landr'
*/
export {
  /**
    * @summary exports all images from <repo-dir>/www/static/*
    * @name assets
    * @public
    * @memberof landr
    * @example
    * import { assets } from 'landr'
    * console.log(assets.favicon)
    **/
  assets,
  /**
    * @summary Link component automatically uses push state * api for internal links and regular <a> for external.
    * @name Link
    * @public
    * @memberof landr
    * @example
    * import { Link } from 'landr'
    * () => <Link to="google.com" target children="click me" />
    **/
  Link,
  /**
    * @summary Tracker component for analytics, subscribes to Router to track pageviews,
    * as well as exposeing
    * [resin-event-log](https://github.com/resin-io-modules/resin-analytics/tree/master/packages/resin-event-log)
    * tracker as a context.
    * @param {Object} analytics - The employee who is responsible for the project.
    * @param {String} analytics.gosquaredId - gosquared Id
    * @param {string} analytics.gaSite - google Analytics site eg balena.io
    * @param {string} analytics.gaId - google Analytics ID
    * @param {string} analytics.mixpanelToken - mixpanel token
    * @param {string} prefix - prefix all events with <name> eg. balena
    * @name Tracker
    * @public
    * @memberof landr
    * @example
    * import { Tracker } from 'landr'
    * () => <Tracker analytics={{ google.gosquaredId = '12345' }} prefix="landr" children={...} />
    **/
  Tracker,
  /**
    * @summary Routes component which holds all <Routes> created in get config.getRoutes(). Used to automantically generate routes for Router.
    * @name Routes
    * @public
    * @memberof landr
    * @example
    * import { Router, Routes } from 'landr'
    *
    * // For standard component routing:
    * export default () => (
    *   <Router>
    *     <Routes />
    *   </Router>
    * )
    **/
  Routes,
  /**
    * @summary Paths config that is used to make up Routes component.
    * @name paths
    * @public
    * @memberof landr
    * @example
    * import { paths } from 'landr'
    *
    * console.log(paths) // [ { path: '/', component: '/pages/home' }]
    **/
  paths,
  /**
    * @summary react-router component.
    * @name Router
    * @public
    * @memberof landr
    * @example
    * import { Router } from 'landr'
    *
    * Router.subscribe(loading => {
    *  if (loading) {
    *    console.log('A page is loading!')
    *  } else {
    *    console.log('A page is done loading!')
    *  }
    * })
    **/
  Router,
  /**
    * @summary higher order component used to get site props
    * @name getSiteProps
    * @public
    * @memberof landr
    * @example
    * import { getSiteProps } from 'landr'
    *
    * export default getSiteProps((props) =>
    *   <div>{props.repository.name}</div>
    * })
    **/
  getSiteProps,
  /**
    * @summary Head is a react component for managing tags in the document's head. Use it to update meta tags, title tags, etc.
    * @name Head
    * @public
    * @memberof landr
    * @example
    * import { Head } from 'landr'
    * export () => (
    *  <div>
    *    <Head>
    *      <meta charSet="UTF-8" />
    *      <title>This is my page title!</title>
    *    </Head>
    *    <div>
    *      My page content...
    *    </div>
    *  </div>
    * )
    **/
  Head
}
