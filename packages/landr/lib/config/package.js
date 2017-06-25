module.exports = (buildDir, cwd, gitInfo) => {
  return `
  {
    "name": "${gitInfo.getName()}",
    "version": "0.0.0",
    "homepage": "${getRemoteUrl.getName()}"
  }
  `
}
