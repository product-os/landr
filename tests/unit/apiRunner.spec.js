require('babel-polyfill')
const m = require('mochainon')
const _ = require('lodash')
const apiRunner = require('../../dist/core/utils/apiRunner')

const HOOK = _.noop
const ASYNC_HOOK = data => Promise.resolve()

const runner = apiRunner({
  config: {
    hooks: {
      preBuild: ASYNC_HOOK,
      postBuild: HOOK
    }
  }
})

describe('apiRunner', () => {
  it('should run config.hooks[key] when called with key', async () => {
    await runner('preBuild')
  })

  it('should always return promise', async () => {
    await runner('postBuild')
  })

  it('should throw if hook key is not a function', async () => {
    try {
      await runner('xyz')
    } catch (err) {
      m.chai.expect(err.message).to.equal('Hook xyz is not a function')
    }
  })
})
