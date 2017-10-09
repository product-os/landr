const data = require('../data')
const bootstrap = async () => {
  const { locals, pages, config } = await data(`/Users/gaudi/work/etcher`)

  try {
    await copyStaticDir(`${config.dir}/www/static`, `${config.distDir}/static`)
  } catch (err) {
    console.log('no static dir')
  }
}

init()
