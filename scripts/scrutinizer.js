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

const fs = require('fs')
const scrutinizer = require('scrutinizer')
const createGitinfo = require('gitinfo')
const gitBranch = require('git-branch')

const callScrutinizer = async () => {
  try {
    const gitinfo = createGitinfo({
      defaultBranchName: 'master',
      gitPath: process.cwd()
    })

    const owner = gitinfo.getUsername()
    const repo = gitinfo.getName()
    const branch = await gitBranch(process.cwd())

    const results = await scrutinizer.remote(
      `git@github.com:${owner}/${repo}.git`,
      {
        reference: branch,
        progress: (state) => {
          console.log(`Fetching: ${state.percentage}%`)
        }
      }
    )

    return fs.writeFile('meta.json', JSON.stringify(results), (err) => {
      if (err) {
        return console.log(err)
      }
      return null
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }

  return null
}

callScrutinizer()
