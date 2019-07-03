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

const puppeteer = require('puppeteer')
const handler = require('serve-handler')
const http = require('http')

exports.handleError = (error) => {
  console.error(error)
  process.exit(1)
}

exports.run = async (directory, port, options, fn) => {
  const browser = await puppeteer.launch({
    headless: options.headless,
    args: [
      '--window-size=1366,768',

      // Set extra flags so puppeteer runs on docker
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  })

  const close = await exports.serve(directory, port)

  try {
    const page = await browser.newPage()
    await page.goto(`http://localhost:${port}`)
    await fn(browser, page)
    await browser.close()
    await close()
  } catch (error) {
    await browser.close()
    await close()
    exports.handleError(error)
  }
}

exports.serve = async (directory, port) => {
  const server = http.createServer((request, response) => {
    return handler(request, response, {
      public: directory
    })
  })

  await new Promise((resolve, reject) => {
    server.listen(port, (error) => {
      if (error) {
        return reject(error)
      }

      return resolve()
    })
  })

  return async () => {
    return new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          return reject(error)
        }

        return resolve()
      })
    })
  }
}
