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

const url = require('url')
const path = require('path')
const generator = require('./generator')

const ROOT = path.resolve(__dirname, '..')
const DIRECTORY = __dirname
const DIST_DIRECTORY = process.env.LANDR_OUTPUT_DIRECTORY
const TMP_DIRECTORY = path.resolve(ROOT, '.tmp')
const DEPLOY_URL = process.env.LANDR_DEPLOY_URL
const SKELETON_DIRECTORY = process.env.LANDR_SKELETON_DIRECTORY

const analyticsOptions = process.env.LANDR_MIXPANEL_TOKEN ? {
  type: 'mixpanel',
  proxy: process.env.LANDR_MIXPANEL_PROXY,
  token: process.env.LANDR_MIXPANEL_TOKEN
} : null

// Parse the contract from the string
// that the Landr CLI passed to us.
const DATA = JSON.parse(process.env.LANDR_CONTRACT)

/*
 * Calculate the site root and base path
 * if possible, in order to generate sitemap.xml.
 */
const siteUrl = DEPLOY_URL || DATA.links.homepage
const basePath = siteUrl
  ? new url.URL(siteUrl).pathname
  : null

const site = generator(DATA, JSON.parse(process.env.LANDR_THEME), {
  siteUrl
})

for (const routePath of Object.keys(site)) {
  console.log(`Generating route: ${routePath}`)
}

// Make it look like a valid ES6 module from outside,
// as this is required by React Static directly.
// eslint-disable-next-line no-underscore-dangle
exports.__esModule = {
  valid: true
}

console.log('SITE', site)

const paths = {
  root: ROOT,
  src: DIRECTORY,
  temp: TMP_DIRECTORY,
  dist: DIST_DIRECTORY,
  devDist: path.join(TMP_DIRECTORY, 'dev-server'),
  public: path.resolve(ROOT, 'skeleton'),
  buildArtifacts: path.join(TMP_DIRECTORY, 'artifacts')
}

console.log(paths)

exports.default = {
  siteRoot: siteUrl,
  basePath,
  paths,
  maxThreads: 1,

  /*
  GetRoutes: async () => {
    const routes = []

    for (const [ uri, combination ] of Object.entries(site)) {
      routes.push({
        path: uri,
        template: path.join(DIRECTORY, 'renderer'),
        getData: () => {
          return {
            analytics: analyticsOptions,
            site: siteUrl,
            combination
          }
        }
      })
    }

    return routes
  },
  */

  plugins: [
    /*
    Require.resolve('react-static-plugin-styled-components'),
    require.resolve('react-static-plugin-reach-router')
    */

    /*
     * Generate a sitemap.xml file.
     */
    // require.resolve('react-static-plugin-sitemap')

  ]
}
