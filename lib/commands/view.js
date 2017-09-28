const express = require('express')
const app = express()

module.exports = (locals) => {
  app.use(express.static(locals.landrConfig.distDir))
  app.listen(3000, _ => console.log('listening on 3000'))
}
