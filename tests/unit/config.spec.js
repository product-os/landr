require('babel-polyfill')
const m = require('mochainon')
const _ = require('lodash')
const getConfig = require('../../dist/core/utils/config')
const path = require('path')
const ROOT = path.resolve('./tests/DUMMY')
const resolvePath = relativePath => path.resolve(path.join(ROOT, relativePath))

// point to a fake git dir
const DUMMY_OPTS = {
  gitDir: `${ROOT}/dummy_git`
}

describe('.getConfig()', () => {
  it('should throw if dir parameter is not passed', async () => {
    try {
      await getConfig()
    } catch (err) {
      m.chai.expect(err.message).to.equal('No directory was provided')
    }
  })

  it('should return valid config when CWD does NOT contain valid landr.conf.js', async () => {
    const config = await getConfig(ROOT, DUMMY_OPTS)
    m.chai.expect(config).to.include({
      theme: 'landr-theme-intro',
      dev: true,
      dir: ROOT,
      distDir: resolvePath('.landr/dist'),
      remoteUrl: 'git@github.com:foo/bar.git'
    })
  })

  it('should allow CLI options to be passed', async () => {
    const config = await getConfig(ROOT, {
      ...DUMMY_OPTS,
      prefixPaths: true
    })
    m.chai.expect(config.prefixPaths).to.equal(true)
  })

  it('dev should false if NODE_ENV === "production"', async () => {
    process.env.NODE_ENV = 'production'
    const config = await getConfig(ROOT, DUMMY_OPTS)
    process.env.NODE_ENV = 'test'
    m.chai.expect(config.dev).to.equal(false)
  })

  it('prefixPath should be repoName when prefixPaths flag is passed', async () => {
    const config = await getConfig(ROOT, {
      ...DUMMY_OPTS,
      prefixPaths: true
    })
    m.chai.expect(config.pathPrefix).to.equal('/bar')
  })
})
