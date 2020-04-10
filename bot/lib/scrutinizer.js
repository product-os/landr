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
  require('scrutinizer/lib/plugins/license'),
  require('scrutinizer/lib/plugins/blog'),
  require('scrutinizer/lib/plugins/changelog'),
  require('scrutinizer/lib/plugins/contributing'),
  require('scrutinizer/lib/plugins/contributors'),
  require('scrutinizer/lib/plugins/docs'),
  require('scrutinizer/lib/plugins/security'),
  require('scrutinizer/lib/plugins/faq'),
  require('scrutinizer/lib/plugins/code-of-conduct'),
  require('scrutinizer/lib/plugins/architecture'),
  require('scrutinizer/lib/plugins/maintainers'),
  require('scrutinizer/lib/plugins/readme'),
  require('scrutinizer/lib/plugins/readme-sections'),
  require('scrutinizer/lib/plugins/github-metadata'),
  require('scrutinizer/lib/plugins/dependencies'),
  require('scrutinizer/lib/plugins/last-commit-date'),
  require('scrutinizer/lib/plugins/latest-release'),
  require('scrutinizer/lib/plugins/latest-prerelease'),
  require('scrutinizer/lib/plugins/open-issues'),
  require('scrutinizer/lib/plugins/version'),
  require('scrutinizer/lib/plugins/screenshot'),
  require('scrutinizer/lib/plugins/logo')
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
