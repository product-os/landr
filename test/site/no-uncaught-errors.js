/*
 * Copyright 2019 balena.io
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const utils = require('./utils')
const sitePath = process.argv[2]

if (!sitePath) {
  console.error('Pass site directory')
  process.exit(1)
}

console.error(`Checking that ${sitePath} landing page does not throw`)

utils.run(sitePath, 3000, {
  headless: true
}, async (browser, page) => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(resolve, 5000)

    page.on('console', (message) => {
      const type = message.type()

      if (type === 'error' || type === 'warning') {
        clearTimeout(timeout)
        console.error(`Got ${type} message in console`)
        reject(new Error(`${type}: ${message.text()}`))
        return
      }
    })

    page.on('pageerror', (error) => {
      clearTimeout(timeout)
      return reject(error)
    })
  })
}).catch(utils.handleError)
