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
const landr = require('../lib/landr');
const argv = require('./argv');
const webpack = require('webpack');

describe('landr', () => {

  describe('.getCompiler()', () => {

    it('return compiler with basic dev argv', () => {
      m.chai.expect(
        landr.getCompiler(argv.dev)
      ).to.eventually.have.property('compilers');
    });

    it('return compiler with basic deploy argv', () => {
      m.chai.expect(
        landr.getCompiler(argv.deploy)
      ).to.eventually.have.property('compilers');
    });

    it('reject if no argv passed', () => {
      m.chai.expect(
        landr.getCompiler()
      ).to.be.rejected;
    });
  });

  describe('.serve()', () => {

    it('run server with basic a webpack compiler', () => {
      m.chai.expect(
        landr.serve(argv.dev, webpack({
          entry: './argv.js',
          output: {
            path: __dirname,
            filename: 'bundle.js'
          }
        }))
      ).to.be.fulfilled;
    });

    it('throw if compiler is not passed', () => {
      m.chai.expect(() => {
        return landr.serve(argv.dev);
      }).to.throw();
    });
  });
});
