require('babel-polyfill')
const m = require('mochainon')
const _ = require('lodash')
const collector = require('../../dist/data')
const path = require('path')
const GIT_PATH = path.resolve('./tests/DUMMY/dummy_git')

const customPlugin = {
  init: ({ dir, actions }) => {
    actions.addFoo('dummy foo data')
    actions.addBar('dummy bar data')
  },
  reducers: {
    foo: (state = '', action) => {
      switch (action.type) {
        case `ADD_FOO`: {
          return action.payload
        }
        default:
          return state
      }
    },
    bar: (state = '', action) => {
      switch (action.type) {
        case `ADD_BAR`: {
          return action.payload
        }
        default:
          return state
      }
    }
  },
  actions: {
    addFoo: (payload) => {
      return {
        type: 'ADD_FOO',
        payload
      }
    },
    addBar: (payload) => {
      return {
        type: 'ADD_BAR',
        payload
      }
    }
  }
}

const upperCasePlugin = {
  middleware: (store, action, next) => {
    if (typeof action.payload === 'string') {
      // intercept all releases and add pretty labels to assets
      action.payload = action.payload.toUpperCase()
    }
    return next(action)
  }
}

describe('collector', () => {
  it('Should run with a standard internal plugins', async () => {
    const data = await collector(GIT_PATH)
    m.chai.expect(data.repository).to.be.an('object')
    m.chai.expect(data.releases).to.be.an('array')
    m.chai.expect(data.contributors).to.be.an('array')
    m.chai.expect(data.contributors).to.be.an('array')
    m.chai.expect(data.faqs).to.be.an('array')
    m.chai.expect(data.changelog).to.be.an('object')
  })

  it('Should accept and run custom plugins', async () => {
    const data = await collector(GIT_PATH, [ customPlugin ])
    m.chai.expect(data.foo).to.equal('dummy foo data')
    m.chai.expect(data.bar).to.equal('dummy bar data')
  })

  it('Should accept plugins with middleware', async () => {
    const data = await collector(GIT_PATH, [ customPlugin, upperCasePlugin ])
    m.chai.expect(data.foo).to.equal('DUMMY FOO DATA')
    m.chai.expect(data.bar).to.equal('DUMMY BAR DATA')
  })
}).timeout(5000);
