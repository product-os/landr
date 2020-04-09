const path = require('path')
const landr = require('./src/index')

const contract = require('./meta.json')

landr.build({
  contract,
  outputDir: path.resolve('./output'),
  branch: 'master',
  deploy: false
})
