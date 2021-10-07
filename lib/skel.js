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

const handlebars = require('handlebars')
const path = require('path')
const fs = require('fs')
const fileType = require('file-type')

require('handlebars-helpers')({
  handlebars
})

const USE_TEMPLATES = [ 'application/xml', 'text/plain' ]

exports.create = async (metadata, templateDirectory, destinationDirectory) => {
  const files = await new Promise((resolve, reject) => {
    fs.readdir(templateDirectory, (error, data) => {
      if (error) {
        return reject(error)
      }

      return resolve(data)
    })
  })

  for (const file of files) {
    if (fs.lstatSync(path.resolve(templateDirectory, file)).isFile()) {
      const buffer = await new Promise((resolve, reject) => {
        fs.readFile(path.resolve(templateDirectory, file), (error, data) => {
          if (error) {
            return reject(error)
          }

          return resolve(data)
        })
      })

      const type = fileType(buffer)
      const mime = (type && type.mime) || 'text/plain'

      const result = USE_TEMPLATES.includes(mime) && !file.endsWith('.html')
        ? handlebars.compile(buffer.toString())({
          metadata
        })
        : buffer

      await new Promise((resolve, reject) => {
        fs.writeFile(
          path.resolve(destinationDirectory, file),
          result,
          (error) => {
            if (error) {
              return reject(error)
            }

            return resolve()
          }
        )
      })
    } else {
      fs.mkdirSync(path.resolve(destinationDirectory, file))
      this.create(
        metadata,
        path.resolve(templateDirectory, file),
        path.resolve(destinationDirectory, file)
      )
    }
  }
}
