#!/usr/bin/env node
import 'babel-polyfill'
import capitano from 'capitano'
import serveHandler from 'serve-handler'
import micro from 'micro'
import GitInfo from 'gitinfo'
import mkdirp from 'mkdirp'
import path from 'path'

import startCmd from '@resin.io/react-static/lib/commands/start'
import buildCmd from '@resin.io/react-static/lib/commands/build'
import deploy from '../core/deploy'

import staticConfig, {
  getUserConfig,
  getThemeConfig
} from '../core/static.config'

const CWD = process.cwd()
const userConfig = getUserConfig(CWD)
const themeConfig = getThemeConfig(userConfig.theme)
const conf = staticConfig({
  cwd: CWD,
  ...themeConfig,
  ...userConfig
})

const errorHandler = error => {
  console.error(error)
  process.exit(1)
}

capitano.command({
  signature: '*',
  description: 'Run dev server',
  action: async () => {
    try {
      // Generate an assets directory
      mkdirp.sync(`${CWD}/www/assets`)
      startCmd(conf)
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
  action: async () => {
    try {
      // Generate an assets directory
      mkdirp.sync(`${CWD}/www/assets`)
      await buildCmd(conf)
      console.log(`Site built to ${conf.paths.dist}`)
      process.exit(0)
    } catch (error) {
      errorHandler(error)
    }
  }
})
capitano.command({
  signature: 'serve',
  description: 'serve built site',
  action: () => {
    try {
      const server = micro((req, res) => {
        return serveHandler(req, res, {
          // serve-handler only works with relative paths, so we create one here
          public: path.relative(CWD, conf.paths.dist)
        })
      })
      server.listen(1337, () => {
        console.log('Site running at http://localhost:1337')
      })
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
      const remoteUrl = GitInfo({
        gitPath: `${CWD}/.git`,
        defaultBranchName: 'master'
      }).getRemoteUrl()

      console.log(`Deploying site to ${remoteUrl}`)
      await deploy(conf.paths.dist, remoteUrl)
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
