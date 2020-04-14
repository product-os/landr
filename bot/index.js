/*
 * Copyright 2020 balena.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const {
  serializeError
} = require('serialize-error')

const metaGenerator = require('./lib/generate-landr-meta')
const runner = require('../bin/runner')
const scrutinizer = require('./lib/scrutinizer')

// TODO: Infer this login information automatically
// This is the identifier GitHub uses for the bot
const LANDR_BOT_LOGIN = 'landrbot[bot]'

const upsertPRComment = async (app, context, owner, repo, pullNumber, message) => {
  // Don't post a comment on the PR if landr-bot has already posted one.

  // In the GitHub API, comments directly on the pull request are considered
  // to be issue comments, whereas comments on the code are pull request
  // comments. Here we want to retrieve all comments directly on the PR, so we
  // need to use the issues API.
  const comments = await context.github.issues.listComments({
    owner,
    repo,
    issue_number: pullNumber
  })

  const existingComment = _.find(comments.data, [ 'user.login', LANDR_BOT_LOGIN ])

  if (existingComment) {
    app.log('updating existing comment on PR')

    await context.github.issues.updateComment({
      owner,
      repo,
      comment_id: existingComment.id,
      body: message
    })
  } else {
    const issueComment = context.issue({
      issue_number: pullNumber,
      body: message
    })
    await context.github.issues.createComment(issueComment)
  }
}

const build = async (app, context, branch, logger) => {
  const repository = context.payload.repository.full_name
  const [ owner, repo ] = repository.split('/')

  const scrutinizerData = await scrutinizer.remote(context, repository, {
    reference: branch
  })
  const contract = metaGenerator.run(scrutinizerData)

  const outputBase = path.resolve(process.cwd(), '.landr-store', owner, repo, branch)
  const outputDir = path.resolve(outputBase, 'dist')
  const contractPath = path.resolve(outputBase, 'contract.json')

  // Wipe out output directory so that we start fresh everytime.
  rimraf.sync(outputDir)

  // Create the output directory
  await fs.promises.mkdir(outputDir, {
    recursive: true
  })

  // TODO: pass the contract data directly to the builder
  // Write the contract to a JSON file next to the output directory
  await fs.writeFileSync(contractPath, JSON.stringify(contract))

  const results = await runner.run({
    contractPath,
    outputDir,
    branch,
    deploy: true,
    netlifyToken: process.env.NETLIFY_AUTH_TOKEN,
    quiet: true,
    logger
  })

  // After deployment, cleanup the build files
  rimraf.sync(outputBase)

  return results.url
}

// This is the main entrypoint to your Probot app
module.exports = (app) => {
  const makeLogFn = (repository) => {
    const logFn = (message) => {
      return app.log(`[${repository}]: ${message}`)
    }

    logFn.error = (message) => {
      return app.log.error(`[${repository}]: ${message}`)
    }

    return logFn
  }

  app.on([ 'pull_request.opened', 'pull_request.synchronize' ], async (context) => {
    const {
      url
    } = context.payload.pull_request
    const repository = context.payload.repository.full_name
    const [ owner, repo ] = repository.split('/')
    const pullNumber = context.payload.number

    const log = makeLogFn(repository)

    if (context.payload.repository.private) {
      log('Repository is private, skipping landr build')
      return
    }

    log(`Triggering build for PR: ${url}`)

    const branch = _.get(context, [ 'payload', 'pull_request', 'head', 'ref' ])

    try {
      const siteUrl = await build(app, context, branch, log)
      const message = `Your landr site preview has been successfully deployed to ${siteUrl}

        *Deployed with Landr v5.30.4*`

      log(`posting site preview link in comment to PR: ${url}`)

      await upsertPRComment(app, context, owner, repo, pullNumber, message)
    } catch (error) {
      log.error('An error occurred', error)
      log(`Posting error message to PR: ${url}`)

      // On error, post the error as a GitHub comment
      const message = `An error occurred whilst building your landr site preview:
\`\`\`
        ${JSON.stringify(serializeError(error), null, 2)}
\`\`\``

      await upsertPRComment(app, context, owner, repo, pullNumber, message)
    }
  })

  app.on('push', async (context) => {
    const log = makeLogFn(context.payload.repository.full_name)

    if (context.payload.ref === 'refs/heads/master') {
      if (context.payload.repository.private) {
        log('Repository is private, skipping landr build')
        return
      }

      log(`Triggering build for master branch: ${context.payload.repository.html_url}`)
      const siteUrl = await build(app, context, 'master', log)
      log(`Built master branch at ${siteUrl}`)
    }
  })
}
