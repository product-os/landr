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
const handlebars = require('handlebars')
const fs = require('fs')

require('handlebars-helpers')({
  handlebars
})

const ROOT = path.resolve(__dirname, '..')
const DIRECTORY = __dirname
const DIST_DIRECTORY = path.resolve(ROOT, process.env.LANDR_OUTPUT_DIRECTORY)

const TMP_DIRECTORY = process.env.LANDR_TMP_DIRECTORY

const SKELETON_DIRECTORY = process.env.LANDR_SKELETON_DIRECTORY

const analyticsOptions = process.env.LANDR_MIXPANEL_TOKEN
  ? {
    type: 'mixpanel',
    proxy: process.env.LANDR_MIXPANEL_PROXY,
    token: process.env.LANDR_MIXPANEL_TOKEN
  }
  : null

// Dynamically require the contract from the path
// that the Landr CLI passed to us.
const DATA = require(process.env.LANDR_CONTRACT_PATH)

const DEPLOY_URL =
  process.env.LANDR_IS_PREVIEW === 'false'
    ? null
    : process.env.LANDR_DEPLOY_URL

/*
 * Calculate the site root and base path
 * if possible, in order to generate sitemap.xml.
 */
const siteUrl = DEPLOY_URL || DATA.links.homepage
const basePath = siteUrl ? new url.URL(siteUrl).pathname : null

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

exports.default = {
  siteRoot: siteUrl,
  maxThreads: process.env.MAX_LANDR_THREADS || Infinity,
  basePath,
  paths: {
    root: ROOT,
    src: DIRECTORY,
    temp: TMP_DIRECTORY,
    dist: DIST_DIRECTORY,
    devDist: path.join(TMP_DIRECTORY, 'dev-server'),
    public: SKELETON_DIRECTORY,
    buildArtifacts: path.join(TMP_DIRECTORY, 'artifacts')
  },

  getRoutes: async () => {
    const routes = []

    const rendererBuffer = await new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, 'renderer.js.hbs'), (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
    for (const [ uri, combination ] of Object.entries(site)) {
      const result = handlebars.compile(rendererBuffer.toString())({
        uri,
        combination
      })
      const filename = `${combination
        .map((definition) => {
          return definition.component
        })
        .join('-')}.renderer.js`
      try {
        await fs.Promises.access(
          path.resolve(__dirname, filename),
          fs.constants.F_OK
        )
      } catch (err) {
        // File doesn't exist, write it
        // eslint-disable-next-line no-loop-func
        await new Promise((resolve, reject) => {
          fs.writeFile(path.resolve(__dirname, filename), result, (error) => {
            if (error) {
              return reject(error)
            }

            return resolve()
          })
        })
      }
    }

    for (const [ uri, combination ] of Object.entries(site)) {
      routes.push({
        path: uri,
        template: path.join(
          DIRECTORY,
          `${combination
            .map((definition) => {
              return definition.component
            })
            .join('-')}.renderer.js`
        ),
        getData: () => {
          return {
            analytics: analyticsOptions,
            landrConfig: {
              envVars: {
                googleMapsKey: process.env.LANDR_GOOGLE_MAPS_KEY
              }
            },
            site: siteUrl,
            combination
          }
        }
      })
    }

    return routes
  },

  plugins: [
    require.resolve('react-static-plugin-styled-components'),
    require.resolve('react-static-plugin-react-router'),

    /*
     * Generate a sitemap.xml file.
     */
    require.resolve('react-static-plugin-sitemap')
  ]
}
