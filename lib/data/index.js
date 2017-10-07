const path = require('path')
const findUp = require('find-up')

const LANDR_DIR = path.resolve(`${__dirname}/..`)
const Promise = require('bluebird')
const store = require('./store')
const actions = require('./store/actions')
// Middleware
const { getUserConfig, getThemeConfig } = require('./source/configs')

const getRootDir = async (cwd) => {
  const gitDir = await findUp('.git', { cwd })
  return path.resolve(`${gitDir}/..`)
}

const apiRunner = (store, actions) => {
  return Promise.mapSeries(store.getState().middleware, (fn) => {
    return fn({ store, actions })
  })
}

module.exports = async (cwd) => {
  // 1. get git dir
  // 2. get config + add middleware functions
  // 3. run middleware functions
  // 4. run create pages
  // 5. return locals

  try {
    const dir = await getRootDir(cwd)
    actions.addConfig({ dir })

    const userConfig = getUserConfig(dir)
    actions.addConfig({
      theme: userConfig.theme,
      settings: userConfig.settings
    })

    const themeConfig = getThemeConfig(LANDR_DIR, userConfig.theme)

    Array(
      themeConfig.middleware,
      userConfig.middleware,
      themeConfig.createPages,
      userConfig.createPages
    ).map(actions.addMiddlware)

    await apiRunner(store, actions)

    return store.getState()
  } catch (error) {
    throw error
  }
}
