/*
 * Copyright 2016 Resin.io
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

'use strict';
const m = require('mochainon');
const webpackConfigGenerator = require('../lib/webpack.config.js');
const argv = require('./argv');

const configKeys = [ 'entry', 'output', 'plugins', 'module' ];

describe('webpack.config()', () => {
  it('return a webpack configuration with dev argv', () => {
    m.chai.expect(
      webpackConfigGenerator(argv.dev)[0]
    ).to.contain.keys(configKeys);
  });

  it('return a webpack configuration with deploy argv', () => {
    m.chai.expect(
      webpackConfigGenerator(argv.deploy)[0]
    ).to.contain.keys(configKeys);
  });

  it('throw if argv is not passed', () => {
    m.chai.expect(() => {
      webpackConfigGenerator();
    }).to.throw();
  });
});
