const GitInfo = require('gitinfo')
const deepMerge = require('deepmerge')
const get = require('lodash/get')
const compact = require('lodash/compact')
const path = require('path')
const findUp = require('find-up')
const flatten = require('lodash/flatten')
const LANDR_DIR = path.resolve(`${__dirname}/../../`)

/**
 * Get site dist dir
 * @returns {String} - Path to dist directory
 */
const distDir = dir => `${dir}/.landr/dist`

/**
 * Gets the user's config
 * @param {String} dir - Git repo directory
 * @returns {Object} - Config Object
 */
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

/**
 * Gets the selected theme's config
 * @param {String} theme - Theme name
 * @returns {Object} - Config Object
 */
const getThemeConfig = theme => {
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

/**
 * A factory for grabbing properties from all configs
 * @param {Array|<Object>} configs - Array of config objects
 * @returns {Promise|<String>} - Path to git repo
 */
const getProperty = configs => property => {
  return compact(configs.map(config => get(config, property)))
}

/**
 * get the master config
 * @param {string} cwd - The directory of the site repo
 * @param {Object} [options] - Options passed from the cli
 * @returns {Promise|<Object>} - Configuration Object
 */
const getConfig = async (dir, options) => {
  if (!dir) {
    throw Error('No directory was provided')
  }

  const gitInfo = GitInfo({
    gitPath: get(options, 'gitDir') || `${dir}/.git`,
    defaultBranchName: 'master'
  })

  const userConfig = getUserConfig(dir)
  const themeConfig = getThemeConfig(userConfig.theme)
  const configs = [themeConfig, userConfig]
  const configParser = getProperty(configs)
  const settings = configParser('settings')

  return {
    theme: userConfig.theme,
    dev: process.env.NODE_ENV !== 'production',
    dir: dir,
    distDir: distDir(dir),
    remoteUrl: gitInfo.getRemoteUrl(),
    hooks: {
      preBuild: configParser('hooks.preBuild'),
      postBuild: configParser('hooks.postBuild')
    },
    plugins: flatten(configParser('plugins')),
    settings: settings.length > 1 ? deepMerge.all(settings) : settings[0],
    pathPrefix: get(options, 'prefixPaths') && `/${gitInfo.getName()}`,
    ...options
  }
}

module.exports = getConfig
