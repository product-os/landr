import path from 'path'
import { getPaths, preferDefault } from './utils'
import webpack from 'webpack'
import interregator from '../data'

const LANDR_ROOT = path.resolve(`${__dirname}/../../`)

/**
 * Gets the user's config
 * @param {String} dir - Git repo directory
 * @returns {Object} - Config Object
 */
export const getUserConfig = dir => {
  try {
    return preferDefault(`${dir}/landr.conf.js`)
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return {
        static: {
          theme: 'landr-theme-intro'
        }
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
export const getThemeConfig = theme => {
  try {
    return preferDefault(`${LANDR_ROOT}/dist/themes/${theme}/landr.conf.js`)
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return {}
    } else {
      throw err
    }
  }
}

export default ({ cwd, theme, settings, getRoutes, plugins }) => {
  const themeDir = `${LANDR_ROOT}/dist/themes/${theme}`
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
          '@theme': `${LANDR_ROOT}/dist/themes/${theme}`
        }
        return config
      }
    ]
  }
}
