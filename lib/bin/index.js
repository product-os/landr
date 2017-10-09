#!/usr/bin/env node
const build = require('../core/build')
const serve = require('../core/serve')
const view = require('../core/view')
const deploy = require('../core/deploy')
const capitano = require('capitano')
const getData = require('../data')
const CWD = process.cwd()

const errorHandler = error => {
  console.log(error)
  process.exit(1)
}

capitano.command({
  signature: '*',
  description: 'Run dev server',
  action: async () => {
    try {
      const data = await getData(CWD)
      await serve(data)
    } catch (error) {
      errorHandler(error)
    }
  }
})

capitano.command({
  signature: 'build',
  description: 'Build static site',
  options: [
    {
      signature: 'prefixPaths',
      boolean: true
    }
  ],
  action: async (params, options) => {
    try {
      const data = await getData(CWD)
      // set dev to false
      if (options.prefixPaths) {
        data.config.pathPrefix = `/${data.locals.git.name}`
      }
      data.config.dev = false
      await build(data)
      console.log(`Site built to ${data.config.distDir}`)
      process.exit(0)
    } catch (error) {
      errorHandler(error)
    }
  }
})

capitano.command({
  signature: 'view',
  description: 'View built site',
  action: async () => {
    try {
      const { config } = await getData(CWD)
      view(config.distDir)
    } catch (error) {
      errorHandler(error)
    }
  }
})

capitano.command({
  signature: 'deploy',
  description: 'Deploy built site to gh-pages',
  action: async () => {
    try {
      const { config, locals } = await getData(CWD)
      await deploy(config.distDir, locals.git.remoteUrl)
      console.log(`Site deployed to ${locals.git.remoteUrl}`)
    } catch (error) {
      errorHandler(error)
    }
  }
})

capitano.run(process.argv, error => {
  if (error != null) {
    throw error
  }
})
