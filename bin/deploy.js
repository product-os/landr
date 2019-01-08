const Promise = require('bluebird')
const ghpages = Promise.promisifyAll(require('gh-pages'))

export default async (distDir, remoteUrl) => {
  return ghpages.publishAsync(distDir, {
    message: 'Deployed by landr 🏠',
    branch: 'gh-pages',
    repo: remoteUrl,
    add: true
  })
}
