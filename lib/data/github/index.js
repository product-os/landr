const GitHubApi = require('github')
const Promise = require('bluebird')
const fs = require('fs-jetpack')

const github = new GitHubApi()

module.exports = async ({
  token,
  owner,
  name
}) => {
  if (token) {
    github.authenticate({
      type: 'token',
      token: token
    })
  }

  let data

  try {
    data = await Promise.all([
      github.repos.get({ owner, repo: name }),
      github.repos.getReleases({ owner, repo: name }),
      github.repos.getContributors({ owner, repo: name })
    ])
    .spread((repository, releases, contributors) => {
      return {
        repository: repository.data,
        releases: releases.data,
        contributors: contributors.data
      }
    })
  } catch (err) {
    // if request failed try read from cache
    data = await fs.readAsync(`${process.env.HOME}/landr/cache/${owner}/${name}.json`)
    return data
  }

  // if request went well write it to cache
  await fs.writeAsync(`${process.env.HOME}/landr/cache/${owner}/${name}.json`, JSON.stringify(data))
  return data
}
