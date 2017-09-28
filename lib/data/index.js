const Git = require('./source/git')
const github = require('./github')

module.exports = async (token) => {
  const git = await Git()

  try {
    const data = await github({
      owner: git.getUsername(),
      name: git.getName(),
      token: process.env.GH_TOKEN
    })

    if (!data) {
      throw Error('No data found on github api :(')
    }

    return Object.assign({}, {
      gitDir: git.getGitPath()
    }, data)
  } catch (error) {
    throw error
  }
}
