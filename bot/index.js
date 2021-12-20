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
const runner = require('../lib/build-runner')
const scrutinizer = require('scrutinizer')

// TODO: Infer this login information automatically
// This is the identifier GitHub uses for the bot
const LANDR_BOT_LOGIN = 'landrbot[bot]'

const upsertPRComment = async ({
  context, owner, repo, pullNumber, message, log
}) => {
  // Don't post a comment on the PR if landr-bot has already posted one.

  // In the GitHub API, comments directly on the pull request are considered
  // to be issue comments, whereas comments on the code are pull request
  // comments. Here we want to retrieve all comments directly on the PR, so we
  // need to use the issues API.
  const comments = await context.octokit.issues.listComments({
    owner,
    repo,
    issue_number: pullNumber
  })

  const existingComment = _.find(comments.data, [ 'user.login', LANDR_BOT_LOGIN ])

  if (existingComment) {
    log('updating existing comment on PR')

    await context.octokit.issues.updateComment({
      owner,
      repo,
      comment_id: existingComment.id,
      body: message
    })
  } else {
    await context.octokit.issues.createComment({
      owner,
      repo,
      issue_number: pullNumber,
      body: message
    })
  }
}

const build = async ({
  app,
  context,
  branch,
  log,
  pullNumber
}) => {
  // If the payload is from a pull request, extract the repo name from the head
  // reference, as this will contain the correct repo name if the PR is a fork.
  // Otherwise the payload is from a push to the master branch.
  const repository = context.payload.pull_request
    ? context.payload.pull_request.head.repo.full_name
    : context.payload.repository.full_name
  const [ owner, repo ] = repository.split('/')

  const scrutinizerData = await scrutinizer.remote(repository, {
    reference: branch,
    context
  })
  const contract = await metaGenerator.run(scrutinizerData)

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
  await fs.promises.writeFile(contractPath, JSON.stringify(contract))

  const results = await runner.run({
    contractPath,
    outputDir,
    branch,
    deploy: true,
    netlifyToken: process.env.NETLIFY_AUTH_TOKEN,
    // eslint-disable-next-line no-eq-null
    quiet: process.env.QUIET_BUILDS == null ? true : process.env.QUIET_BUILDS === 'true',
    pullNumber,
    logger: log
  })

  // After deployment, cleanup the build files
  rimraf.sync(outputBase)

  return results.url
}

// This is the main entrypoint to your Probot app
module.exports = (app) => {
  app.on([ 'pull_request.opened', 'pull_request.synchronize' ], async (context) => {
    const {
      url
    } = context.payload.pull_request
    const repository = context.payload.repository.full_name
    const [ owner, repo ] = repository.split('/')
    const pullNumber = context.payload.number

    // If (context.payload.repository.private) {
    //   log('Repository is private, skipping landr build')
    //   return
    // }

    context.log(`Triggering build for PR: ${url}`)

    const branch = _.get(context, [ 'payload', 'pull_request', 'head', 'ref' ])

    try {
      const siteUrl = await build({
        app,
        context,
        branch,
        log: context.log,
        pullNumber
      })
      const message = `Your landr site preview has been successfully deployed to ${siteUrl}

*Deployed with Landr ${process.env.npm_package_version}*`

      context.log(`posting site preview link in comment to PR: ${url}`)

      await upsertPRComment({
        context, owner, repo, pullNumber, message, log: context.log
      })
    } catch (error) {
      context.log.error('An error occurred', error)
      context.log(`Posting error message to PR: ${url}`)

      const reportableError = JSON.stringify(serializeError(error), null, 2)

      // On error, post the error as a GitHub comment
      const message = `An error occurred whilst building your landr site preview:
\`\`\`
${reportableError}
\`\`\``

      await upsertPRComment({
        context, owner, repo, pullNumber, message, log: context.log
      })
    }
  })

  app.on('push', async (context) => {
    // Const log = makeLogFn(context.payload.repository.full_name, 'master')

    if (context.payload.ref === 'refs/heads/master') {
      context.log(`Triggering build for master branch: ${context.payload.repository.html_url}`)
      const siteUrl = await build({
        app,
        context,
        branch: 'master',
        log: context.log
      })
      context.log(`Built master branch at ${siteUrl}`)
    }
  })
}
