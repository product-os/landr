import _ from 'lodash'
import path from 'path'
import fs from 'fs'
import { getPaths, preferDefault } from './utils'
import webpack from 'webpack'
import interregator from '../data'

const LANDR_ROOT = path.resolve(`${__dirname}/../../`)
const LANDR_DEFAULT_THEME = 'landr-theme-resin'

/**
 * Gets the theme directory
 * @param {String} theme - A name of a theme or relative path to a theme
 * @param {String} dir - The current directory
 * @returns {String} - The absolute theme directory
 */
const getThemeDir = (theme, dir) => {
  const themeDir = path.join(dir, theme)
  if (fs.existsSync(themeDir)) {
    return themeDir
  }

  const landrCoreThemeDir = `${LANDR_ROOT}/dist/themes/${theme}`

  if (fs.existsSync(landrCoreThemeDir)) {
    return landrCoreThemeDir
  }

  throw new Error(
    `Cannot find theme '${theme}' at ${themeDir} or ${landrCoreThemeDir}`
  )
}

/**
 * Gets the user's config
 * @param {String} dir - Git repo directory
 * @returns {Object} - Config Object
 */
export const getUserConfig = dir => {
  let config = {}
  try {
    config = preferDefault(`${dir}/landr.conf.js`)
  } catch (err) {
    if (err.code !== 'MODULE_NOT_FOUND') {
      throw err
    }
  }

  if (!config.theme) {
    config.theme = LANDR_DEFAULT_THEME
  }

  return config
}

/**
 * Gets the selected theme's config
 * @param {String} theme - Theme name
 * @param {String} dir - The current directory
 * @returns {Object} - Config Object
 */
export const getThemeConfig = (theme, dir) => {
  try {
    return preferDefault(path.join(getThemeDir(theme, dir), 'landr.conf.js'))
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return {}
    } else {
      throw err
    }
  }
}

export default ({ cwd, theme, settings, getRoutes, plugins, webpackConf }) => {
  const themeDir = getThemeDir(theme, cwd)
  return {
    entry: path.resolve(`${LANDR_ROOT}/dist/core/components/RootComponent`),
    paths: getPaths(cwd, themeDir),
    getSiteProps: async () => {
      const data = await interregator(`${cwd}/.git`, plugins)
      return {
        ...data,
        settings
      }
    },
    // bundleAnalyzer: true,
    getRoutes,
    webpack: [
      (config, args) => {
        args.defaultLoaders.jsLoader = {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                extends: `${LANDR_ROOT}/.babelrc`
              }
            }
          ]
        }
        config.module.rules = [
          {
            oneOf: [
              args.defaultLoaders.jsLoader,
              args.defaultLoaders.cssLoader,
              args.defaultLoaders.fileLoader
            ]
          }
        ]
        return config
      },
      config => {
        config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
        config.resolve.modules.push(`${LANDR_ROOT}/node_modules`, themeDir)

        config.resolve.alias = {
          ...config.resolve.alias,
          landr: `${LANDR_ROOT}/dist`,
          'landr-assets': `${cwd}/www/assets`,
          '@theme': themeDir
        }
        return config
      },
      config => {
        return _.merge({} , config, webpackConf)
      }
    ]
  }
}
