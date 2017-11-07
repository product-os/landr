#!/usr/bin/env node
require('babel-polyfill')
const capitano = require('capitano')
const path = require('path')
const compact = require('lodash/compact')
const fs = require('fs-jetpack')

const build = require('../core/build')
const serve = require('../core/serve')
const view = require('../core/view')
const deploy = require('../core/deploy')
const getConfig = require('../core/utils/config')
const getData = require('../data')

const plugins = require('../core/plugins')
const apiRunner = require('../core/utils/apiRunner')

const CWD = process.cwd()

const errorHandler = error => {
  console.error(error)
  process.exit(1)
}

const LANDR_DIR = path.resolve(`${__dirname}/../`)

capitano.command({
  signature: '*',
  description: 'Run dev server',
  action: async () => {
    try {
      const config = await getConfig(CWD)
      const { pages, ...locals } = await getData(`${config.dir}/.git`, [ ...plugins, ...config.plugins ])
      await serve({
        config,
        pages,
        locals
      })
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
      process.env.NODE_ENV = 'production'
      const config = await getConfig(CWD)
      const { pages, ...locals } = await getData(`${config.dir}/.git`, [ ...plugins, ...config.plugins ])

      const runner = apiRunner({
        config,
        pages,
        locals
      })

      await runner('preBuild')
      await build({
        config,
        pages,
        locals
      })
      await runner('postBuild')

      console.log(`Site built to ${config.distDir}`)
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
      process.env.NODE_ENV = 'production'
      const { distDir } = await getConfig(CWD)
      view(distDir)
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
      const { remoteUrl, distDir } = await getConfig(CWD)
      console.log(`Deploying site to ${remoteUrl}`)
      await deploy(distDir, remoteUrl)
      console.log(`Site deployed to ${remoteUrl}`)
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
