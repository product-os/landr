const GitHubApi = require('github')
const Promise = require('bluebird')
const fs = require('fs-jetpack')
const pick = require('lodash')

const github = new GitHubApi()

module.exports = async ({ store, actions }) => {
  const state = store.getState()
  if (state.config.token) {
    github.authenticate({
      type: 'token',
      token: state.config.token
    })
  }

  const ghConfig = {
    owner: state.locals.git.owner,
    repo: state.locals.git.name
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
    // if request failed try read from cache
    console.log('Github rate limit exceeded - using cache')
    data = require(`${process.env
      .HOME}/landr/cache/${ghConfig.owner}/${ghConfig.repo}.json`)
    actions.addLocals(data)
  }

  // if request went well write it to cache
  await fs.writeAsync(
    `${process.env.HOME}/landr/cache/${ghConfig.owner}/${ghConfig.repo}.json`,
    JSON.stringify(data, null, 2)
  )
  actions.addLocals(data)
}
