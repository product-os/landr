const GitHubApi = require('github')
const Promise = require('bluebird')
const fs = require('fs-jetpack')
const pick = require('lodash')
const GitInfo = require('gitinfo')

const github = new GitHubApi()
const TOKEN = process.env.GH_TOKEN

module.exports = async ({ dir, actions }) => {
  const gitInfo = GitInfo({
    gitPath: `${dir}/.git`,
    defaultBranchName: 'master'
  })

  if (TOKEN) {
    github.authenticate({
      type: 'token',
      token: TOKEN
    })
  }

  const ghConfig = {
    owner: gitInfo.getUsername(),
    repo: gitInfo.getName()
  }

  const runActions = ({ repository, releases, contributors }) => {
    actions.addRepository(repository)
    releases.map(actions.addRelease)
    contributors.map(actions.addContributor)
  }

  let data
  try {
    data = await Promise.all([
      github.repos.get(ghConfig),
      github.repos.getReleases(ghConfig),
      github.repos.getContributors(ghConfig)
    ]).spread((repository, releases, contributors) => {
      return {
        repository: repository.data,
        releases: releases.data,
        contributors: contributors.data
      }
    })
  } catch (err) {
    if (err.code == 403 && err.headers['x-ratelimit-remaining'] == 0) {
      console.log('Github rate limit exceeded - using cache')
    } else {
      throw err
    }
    // if request failed try read from cache
    data = require(`${dir}/.landr/cache/${ghConfig.owner}/${ghConfig.repo}.json`)
    runActions(data)
  }

  // if request went well write it to cache
  await fs.writeAsync(
    `${dir}/.landr/cache/${ghConfig.owner}/${ghConfig.repo}.json`,
    JSON.stringify(data, null, 2)
  )
  runActions(data)
}
