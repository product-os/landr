const Git = require('./source/git')
const github = require('./github')
const getDocs = require('./source/docs')
const getChangelog = require('./source/changelog')
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
    const changelog = await getChangelog(gitDir)

    if (!data) {
      throw Error('No data found on github api :(')
    }

    return Object.assign(data, {
      gitDir,
      docs,
      changelog
    }
    )
  } catch (error) {
    throw error
  }
}
