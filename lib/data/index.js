const Git = require('./source/git')
const github = require('./github')
const getDocs = require('./source/docs')
const path = require('path')

module.exports = async (token) => {
  const git = await Git()
  const gitDir = path.resolve(`${git.getGitPath()}/..`)

  try {
    const data = await github({
      owner: git.getUsername(),
      name: git.getName(),
      token: process.env.GH_TOKEN
    })

    const docs = await getDocs(gitDir)

    if (!data) {
      throw Error('No data found on github api :(')
    }

    return Object.assign(data, {
      gitDir,
      docs
    },
    )
  } catch (error) {
    throw error
  }
}
