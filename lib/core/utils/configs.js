const GitInfo = require('gitinfo')

const distDir = (owner, name) => `${process.env.HOME}/landr/${owner}/${name}`

const getUserConfig = dir => {
  try {
    return require(`${dir}/landr.conf.js`)
  } catch (err) {
    console.error(err)
    return {
      theme: 'landr-theme-intro'
    }
  }
}

const getThemeConfig = (landrDir, theme) => {
  try {
    return require(`${landrDir}/themes/${theme}/landr.conf.js`)
  } catch (err) {
    return {}
  }
}

const getMasterConfig = ({ dir, themeConfig, userConfig, options }) => {
  const gitInfo = GitInfo({
    gitPath: `${dir}/.git`,
    defaultBranchName: 'master'
  })

  return {
    dev: process.env.NODE_ENV !== 'production',
    dir: dir,
    distDir: distDir(gitInfo.getUsername(), gitInfo.getName()),
    owner: gitInfo.getUsername(),
    repo: gitInfo.getName(),
    remoteUrl: gitInfo.getRemoteUrl(),
    theme: userConfig.theme,
    settings: {
      ...userConfig.settings,
      ...themeConfig.settings
    },
    ...options
  }
}

module.exports = {
  getThemeConfig,
  getUserConfig,
  getMasterConfig
}
