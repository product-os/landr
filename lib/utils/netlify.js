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

const _ = require('lodash')
const Netlify = require('netlify')
const packageJSON = require('../../package.json')

exports.setupSite = async (token, slug) => {
  const client = new Netlify(token)
  const sites = await client.listSites()

  const site = _.find(sites, {
    name: slug
  })

  if (site) {
    return {
      id: site.id,
      url: site.ssl_url || site.url,
      adminUrl: site.admin_url
    }
  }

  const result = await client.createSite({
    body: {
      name: slug
    }
  })

  return {
    id: result.id,
    url: result.ssl_url || result.url,
    adminUrl: result.admin_url
  }
}

exports.deploy = async (token, siteId, directory) => {
  const client = new Netlify(token)
  const result = await client.deploy(siteId, directory, {
    message: `Deployed with Landr v${packageJSON.version}`
  })

  return {
    url: result.deploy.ssl_url || result.deploy.url,
    message: result.deploy.title
  }
}
