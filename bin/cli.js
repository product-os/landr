#!/usr/bin/env node

/*
 * Copyright 2019 balena.io
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

const path = require('path')
const Bluebird = require('bluebird')
const chalk = require('chalk')
const gitBranch = require('git-branch')

const runner = require('./runner')
const packageJSON = require('../package.json')

const ENV_VAR_NETLIFY_TOKEN = 'NETLIFY_AUTH_TOKEN'
const TOKEN_NETLIFY = process.env[ENV_VAR_NETLIFY_TOKEN]
const OPTION_COMMAND = process.argv[2] || 'deploy'
const OPTION_DEPLOY = OPTION_COMMAND === 'deploy' && TOKEN_NETLIFY
const OPTION_CONTRACT_PATH = process.argv[3]
const OPTIONS_OUTPUT_DIRECTORY = path.resolve(process.cwd(), 'dist')

// Get a list of paths were the contract file might live
// in. The choice is just one if the user passes it as
// a command line argument.
const contractPaths = OPTION_CONTRACT_PATH
  ? [ path.resolve(process.cwd(), OPTION_CONTRACT_PATH) ]
  : [ path.resolve(process.cwd(), 'meta.json') ]

const printHeader = () => {
  console.error(`
  / /  __ _ _ __   __| |_ __
 / /  / _\` | '_ \\ / _\` | '__|
/ /__| (_| | | | | (_| | |
\\____/\\__,_|_| |_|\\__,_|_|
`)
  console.error(packageJSON.description)
  console.error(`Version v${packageJSON.version}`)
  console.error()
}

const log = (message) => {
  console.log(chalk.blue('[landr]'), message)
}

const abort = (message) => {
  console.error(chalk.red('[error]'), message)
  process.exit(1)
}

const loadContract = async (paths) => {
  for (const contractPath of paths) {
    log(`Trying to load repository contract from ${contractPath}`)
    try {
      require(contractPath)
      return contractPath
    } catch (error) {
      continue
    }
  }

  return null
}

Bluebird.try(async () => {
  printHeader()

  if (OPTION_COMMAND !== 'deploy' && OPTION_COMMAND !== 'build') {
    abort(`Unknown command: ${OPTION_COMMAND}`)
  }

  // TODO: Add option to generate contract, instead of loading it from FS
  const contractPath = await loadContract(contractPaths)
  if (!contractPath) {
    abort('Could not load contract file')
  }

  if (OPTION_COMMAND === 'deploy' && !OPTION_DEPLOY) {
    abort(`Omitting deployment. Please set ${ENV_VAR_NETLIFY_TOKEN}`)
  }

  const branch = await gitBranch(process.cwd())
  log(`Current branch is ${branch}`)

  const results = await runner.run({
    contractPath,
    branch,
    outputDir: OPTIONS_OUTPUT_DIRECTORY,
    deploy: Boolean(OPTION_DEPLOY),
    netlifyToken: TOKEN_NETLIFY,
    logger: log
  })

  if (OPTION_DEPLOY && TOKEN_NETLIFY) {
    const domainSetupUrl = `${results.adminUrl}/settings/domain/setup`

    log(`Visit ${results.url}`)
    log(`Head over to ${domainSetupUrl} to setup a different domain`)
  }
}).catch((error) => {
  console.error(error)
  process.exit(1)
})
