/*
 * Copyright 2019 balena.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react'
import {
  Head
} from 'react-static'

export const name = 'Head'

export const variants = (metadata, context, route, routes, options) => {
  const combinations = []

  if (metadata.data.name) {
    combinations.push({
      siteUrl: options.siteUrl,
      pageUrl: `${options.siteUrl}/${route.path.join('/')}`,
      title: route.path.length === 0
        ? metadata.data.name
        : route.title
    })
  }

  return combinations
}

export const render = (props) => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="referrer" content="no-referrer" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>{props.title} - Home</title>
      <link rel="canonical" href={props.pageUrl} />
      <meta property="og:url" content={props.pageUrl} />
      <link rel="shortcut icon" sizes="16x16 24x24 32x32 48x48 64x64" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <link type="text/plain" rel="author" href="/humans.txt" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#000000" />

      <meta property="og:locale" content="en_US" />
    </Head>
  )
}
