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
const sortBy = require('lodash/sortBy')
const fs = require('fs')
const path = require('path')
const tmp = require('tmp')
const skel = require('../../bin/skel')
const METADATA = require('../../meta.json')

ava('should build a skeleton directory', async (test) => {
  const destination = tmp.dirSync().name
  await skel.create(METADATA, path.resolve(__dirname, 'skeleton'), destination)
  const expected = path.resolve(__dirname, 'expected')

  test.deepEqual(
    sortBy(fs.readdirSync(expected)),
    sortBy(fs.readdirSync(destination)))

  for (const files of fs.readdirSync(destination)) {
    const buffer = fs.readFileSync(path.resolve(destination, files))
    const expectedBuffer = fs.readFileSync(path.resolve(expected, files))
    test.deepEqual(buffer, expectedBuffer)
  }
})
