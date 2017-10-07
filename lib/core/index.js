const data = require('../data')
const init = async () => {
  // const {
  //   data,
  //   pages,
  //   config {
  //     theme,
  //     themeSettings,
  //     distDir
  //   }
  // }
  try {
    const store = await data(`/Users/gaudi/work/etcher`)
    console.log(store.pages)
  } catch (err) {
    console.log(err)
  }
}

init()
