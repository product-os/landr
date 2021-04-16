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
const packageJSON = require('../package.json')

// Netlify doesn't provide a nice interface for pagination, we will have to
// check until we have fetched all the pages
const listSites = async (client, slug) => {
  let currentPage = 1
  let results = []
  let response = []
  while (response.length > 0 || currentPage === 1) {
    response = await client.listSites({
      page: currentPage, name: slug
    })
    results = [ ...results, ...response ]
    currentPage += 1
  }
  return results
}

exports.setupSite = async (token, slug) => {
  // Slugs should be normalized to lower case, as netlify will do this
  // internally, so we need to match the correct slug value ahead of time.
  // Additionally, non-hyphen punctuation should be replaced, and multiple
  // hyphens should be converted to a single hyphen.
  const normalizedSlug = slug.replace(/[.,/#!$%^&*;:{}=_-`~()]+/g, '-')
    .toLowerCase()
  const client = new Netlify(token)
  const sites = await listSites(client, normalizedSlug)

  const site = _.find(sites, {
    name: normalizedSlug
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
      name: normalizedSlug
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
