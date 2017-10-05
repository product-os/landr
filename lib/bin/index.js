#!/usr/bin/env node
const build = require('../commands/build')
const serve = require('../commands/serve')
const view = require('../commands/view')
const capitano = require('capitano')
const getData = require('../data')
const fs = require('fs-jetpack')

const getUserConfig = (gitDir) => {
  try {
    return require(`${gitDir}/landr.conf.js`)
  } catch (err) {
    console.error(err)
    return {
      theme: 'landr-theme-intro'
    }
  }
}

const getThemeConfig = (theme) => {
  try {
    return require(`../themes/${theme}/landr.conf.js`)
  } catch (err) {
    return {}
  }
}

const copyStaticDir = (from, to) => {
  return fs.copy(from, to, {
    overwrite: (srcInspectData, destInspectData) => {
      return srcInspectData.modifyTime > destInspectData.modifyTime
    }
  })
}

const bootstrap = async () => {
  let data = await getData()
  const userConfig = getUserConfig(data.gitDir)
  const themeConfig = getThemeConfig(userConfig.theme)
  const distDir = `${process.env.HOME}/landr/${data.repository.owner.login}/${data.repository.name}`

  try {
    // clear entire dist dir
    await fs.dirAsync(distDir, { empty: true })
    console.log('copying', `${distDir}/static`)
    await copyStaticDir(`${data.gitDir}/www/static`, `${distDir}/static`)
    console.log('copied')
  } catch (err) {
    console.log('no static dir found')
  }

  console.log(userConfig)
  data = await userConfig.middleware(data)

  console.log(data)
  return {
    data,
    userConfig,
    themeConfig,
    distDir
  }
}

capitano.command({
  signature: '*',
  description: 'Run dev server',
  action: async () => {
    try {
      const {
        data,
        userConfig,
        themeConfig,
        distDir
      } = await bootstrap()

      data.landrConfig = Object.assign({
        env: 'development',
        distDir: distDir
      },
        themeConfig,
        userConfig
      )

      await serve(data)
    } catch (error) {
      throw error
    }
  }
})

capitano.command({
  signature: 'build',
  description: 'Build static site',
  action: async () => {
    try {
      const {
        data,
        userConfig,
        themeConfig,
        distDir
      } = await bootstrap()

      data.landrConfig = Object.assign({
        env: 'production',
        distDir: distDir
      },
        themeConfig,
        userConfig
      )

      const paths = await themeConfig.createPages(data)
      await build(data, paths)
      console.log(`Site built to ${distDir}`)
      process.exit(0)
    } catch (error) {
      console.log(error.message)
      process.exit(1)
    }
  }
})

capitano.command({
  signature: 'view',
  description: 'View built site',
  action: async () => {
    try {
      const {
        data,
        userConfig,
        themeConfig,
        distDir
      } = await bootstrap()

      data.landrConfig = Object.assign({
        env: 'production',
        distDir: distDir
      },
        themeConfig,
        userConfig
      )

      view(data)
    } catch (error) {
      console.log(error.message)
      process.exit(1)
    }
  }
})

capitano.run(process.argv, error => {
  if (error != null) {
    throw error
  }
})
