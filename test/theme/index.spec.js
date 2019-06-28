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

const ava = require('ava')
const path = require('path')
const fs = require('fs')
const fileType = require('file-type')
const theme = require('../../bin/theme')

const IMAGES_DIRECTORY = path.join(__dirname, 'images')

ava('no image should match the default palette', async (test) => {
  const palette = await theme()
  const expected = require('../../default-theme.json')
  test.deepEqual(palette, expected)
})

for (const image of fs.readdirSync(IMAGES_DIRECTORY)) {
  if (path.extname(image) === '.json') {
    continue
  }

  ava(`image ${image} should match expected palette`, async (test) => {
    const imagePath = path.join(IMAGES_DIRECTORY, image)
    const buffer = fs.readFileSync(imagePath)
    const base64 = Buffer.from(buffer).toString('base64')
    const palette = await theme(base64)
    const expected = require(`${imagePath}.json`)
    test.deepEqual(palette, expected)
  })

  ava(`image ${image} should match expected palette when using mime prefix`, async (test) => {
    const imagePath = path.join(IMAGES_DIRECTORY, image)
    const buffer = fs.readFileSync(imagePath)
    const base64 = Buffer.from(buffer).toString('base64')
    const palette = await theme(`data:${fileType(buffer).mime};base64,${base64}`)
    const expected = require(`${imagePath}.json`)
    test.deepEqual(palette, expected)
  })
}
