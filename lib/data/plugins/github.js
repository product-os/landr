const GitHubApi = require('github')
const Promise = require('bluebird')
const fs = require('fs-jetpack')

const github = new GitHubApi()
const TOKEN = process.env.GH_TOKEN

const init = async ({ dir, gitInfo, actions }) => {
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
    data = require(`${dir}/www/cache/github.json`)
    runActions(data)
  }

  // if request went well write it to cache
  await fs.writeAsync(
    `${dir}/www/cache/github.json`,
    JSON.stringify(data, null, 2)
  )
  runActions(data)
}

function addRepository(payload) {
  return {
    type: 'ADD_REPOSITORY',
    payload
  }
}

function addRelease(payload) {
  return {
    type: 'ADD_RELEASE',
    payload
  }
}

function addContributor(payload) {
  return {
    type: 'ADD_CONTRIBUTOR',
    payload
  }
}

module.exports = {
  init,
  reducers: {
    repository: (state = {}, action) => {
      switch (action.type) {
        case 'ADD_REPOSITORY': {
          return Object.assign({}, state, action.payload)
        }
        default:
          return state
      }
    },
    releases: (state = [], action) => {
      switch (action.type) {
        case 'ADD_RELEASE': {
          if (action.payload) {
            return [...state, action.payload]
          }
          return state
        }
        default:
          return state
      }
    },
    contributors: (state = [], action) => {
      switch (action.type) {
        case 'ADD_CONTRIBUTOR': {
          if (action.payload) {
            return [...state, action.payload]
          }
          return state
        }
        default:
          return state
      }
    }
  },
  actions: {
    addRepository,
    addRelease,
    addContributor
  }
}
