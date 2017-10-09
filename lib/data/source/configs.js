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

module.exports = {
  getThemeConfig,
  getUserConfig
}
