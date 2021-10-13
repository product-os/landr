/*
 * Copyright 2020 balena.io
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

// TODO: Refactor scrutinizer to be able to use the probot context instead of
// creating its own octokit instance. Then this file will be unnecessary.
const Bluebird = require('bluebird')
const _ = require('lodash')
const githubBackend = require('./backend')

const BUILTIN_PLUGINS = [
  require('scrutinizer/build/lib/plugins/license').default,
  require('scrutinizer/build/lib/plugins/blog').default,
  require('scrutinizer/build/lib/plugins/changelog').default,
  require('scrutinizer/build/lib/plugins/contributing').default,
  require('scrutinizer/build/lib/plugins/contributors').default,
  require('scrutinizer/build/lib/plugins/docs').default,
  require('scrutinizer/build/lib/plugins/security').default,
  require('scrutinizer/build/lib/plugins/faq').default,
  require('scrutinizer/build/lib/plugins/code-of-conduct').default,
  require('scrutinizer/build/lib/plugins/architecture').default,
  require('scrutinizer/build/lib/plugins/maintainers').default,
  require('scrutinizer/build/lib/plugins/readme').default,
  require('scrutinizer/build/lib/plugins/readme-sections').default,
  require('scrutinizer/build/lib/plugins/github-metadata').default,
  require('scrutinizer/build/lib/plugins/dependencies').default,
  require('scrutinizer/build/lib/plugins/last-commit-date').default,
  require('scrutinizer/build/lib/plugins/latest-release').default,
  require('scrutinizer/build/lib/plugins/latest-prerelease').default,
  require('scrutinizer/build/lib/plugins/open-issues').default,
  require('scrutinizer/build/lib/plugins/version').default,
  require('scrutinizer/build/lib/plugins/screenshot').default,
  require('scrutinizer/build/lib/plugins/logo').default,
  require('scrutinizer/build/lib/plugins/logo-brandmark').default,
  require('scrutinizer/build/lib/plugins/deployButtons').default,
  require('scrutinizer/build/lib/plugins/org-logos').default,
  require('scrutinizer/build/lib/plugins/balena').default,
  require('scrutinizer/build/lib/plugins/netlifyConfig').default
]

const examineGitRepository = (context, options) => {
  return Bluebird.reduce(options.plugins, (accumulator, plugin, index) => {
    if (options.progress) {
      options.progress({
        percentage: Math.floor(index * 100 / options.plugins.length)
      })
    }

    // eslint-disable-next-line new-cap
    const backend = new options.backend(context, options.repository, options.reference)
    return backend.init().then(() => {
      return plugin(backend).then((result) => {
        return _.merge(accumulator, result)
      })
    })
  }, options.accumulator)
}

exports.remote = (context, gitRepository, options = {}) => {
  return examineGitRepository(context, {
    repository: gitRepository,
    backend: githubBackend,
    plugins: BUILTIN_PLUGINS,
    accumulator: {},
    progress: options.progress,
    reference: options.reference
  })
}
