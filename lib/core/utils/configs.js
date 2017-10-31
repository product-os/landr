const GitInfo = require('gitinfo')
const deepMerge = require('deepmerge')
const get = require('lodash/get')
const compact = require('lodash/compact')
const path = require('path')
const findUp = require('find-up')

const LANDR_DIR = path.resolve(`${__dirname}/../../`)
const distDir = (owner, name) => `${process.env.HOME}/landr/${owner}/${name}`

const getUserConfig = dir => {
  try {
    return require(`${dir}/landr.conf.js`)
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return {
        theme: 'landr-theme-intro'
      }
    } else {
      throw err
    }
  }
}

const getThemeConfig = (theme) => {
  try {
    return require(`${LANDR_DIR}/themes/${theme}/landr.conf.js`)
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return {}
    } else {
      throw err
    }
  }
}

const getProperty = configs => property => {
  return compact(configs.map(config => get(config, property)))
}

const getRootDir = async cwd => {
  const gitDir = await findUp('.git', { cwd })
  return path.resolve(`${gitDir}/..`)
}

/**
 * returns master config
 * @param {string} dir - The directory of the site (usually CWD)
 * @param {Object} options - Options passed from the cli
 * @returns {Object} - Configuration Object
 */
const getConfig = (dir, options) => {
  const gitInfo = GitInfo({
    gitPath: `${dir}/.git`,
    defaultBranchName: 'master'
  })

  const userConfig = getUserConfig(dir)
  const themeConfig = getThemeConfig(userConfig.theme)
  const configs = [ themeConfig, userConfig ]
  const configParser = getProperty(configs)
  const settings = configParser('settings')

  return {
    theme: userConfig.theme,
    dev: process.env.NODE_ENV !== 'production',
    dir: dir,
    distDir: distDir(gitInfo.getUsername(), gitInfo.getName()),
    owner: gitInfo.getUsername(),
    repo: gitInfo.getName(),
    remoteUrl: gitInfo.getRemoteUrl(),
    hooks: {
      preBuild: configParser('hooks.preBuild'),
      postBuild: configParser('hooks.postBuild')
    },
    middlewares: configParser('middleware'),
    settings: settings.length > 1 ? deepMerge.all(settings) : settings[0],
    pathPrefix: get(options, 'prefixPaths') && `/${gitInfo.getName()}`,
    ...options
  }
}

module.exports = {
  getConfig,
  getRootDir
}
