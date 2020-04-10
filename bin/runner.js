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

const path = require('path')
const _ = require('lodash')
const shell = require('shelljs')
const rimraf = require('rimraf')
const tmp = require('tmp')
const chalk = require('chalk')
const recursiveCopy = require('recursive-copy')

const theme = require('./theme')
const netlify = require('./netlify')
const skel = require('./skel')
const projectRoot = path.resolve(__dirname, '..')

const getCommandString = () => {
  const reactStaticBin = require.resolve('react-static/bin/react-static')
  const reactStaticConfig = path.resolve(
    projectRoot, 'lib', 'static.config.js')

  return `${reactStaticBin} build --config=${reactStaticConfig}`
}

exports.run = async ({
  contractPath,
  outputDir,
  deploy,
  netlifyToken,
  branch,
  quiet
}) => {
  const log = (message) => {
    if (!quiet) {
      console.log(chalk.blue('[landr]'), message)
    }
  }

  const contract = require(contractPath)

  const command = getCommandString()

  log(`Running from ${contractPath} into ${outputDir}`)

  const localDist = path.join(projectRoot, 'dist')

  // Wipe out output directory so that we start fresh everytime.
  rimraf.sync(outputDir)
  rimraf.sync(localDist)

  if (!contract.data.name) {
    throw new Error('The contract does not have a name')
  }

  // Deploy to a preview site if running on a branch
  // other than master.
  const name = contract.data.name
  const owner = contract.data.github.owner.handle
  const siteName = branch === 'master'
    ? `landr-${owner}-repo-${name}`
    : `landr-${owner}-repo-${name}-preview-${branch}`

  log(`Preparing site ${siteName}`)
  const siteOptions = deploy
    ? await netlify.setupSite(netlifyToken, siteName)
    : {}

  log('Parsing banner image')
  const siteTheme = await theme(_.get(contract, [ 'data', 'images', 'banner' ]))
  const skeletonDirectory = tmp.dirSync().name
  log(`Creating site skeleton at ${skeletonDirectory}`)
  await skel.create(contract,
    path.resolve(projectRoot, 'skeleton'),
    skeletonDirectory)

  // TODO: Don't output react-static log information,
  // as it has details that are non Landr related, such
  // as instructions to deploy to Netlify directly.
  const {
    code
  } = shell.exec(command, {
    // The react-static project assumes in many places
    // that the root directory is the current working
    // directory, which may not be the case when Landr
    // is globally installed.
    // Fixing react-static doesn't seem easy, so this
    // is more of a workaround.
    cwd: projectRoot,

    // We need to merge `process.env` as otherwise we
    // completely override the environment, including
    // important variables like `PATH`.
    env: Object.assign({}, process.env, {
      LANDR_CONTRACT_PATH: contractPath,
      LANDR_SKELETON_DIRECTORY: skeletonDirectory,
      LANDR_OUTPUT_DIRECTORY: localDist,
      LANDR_DEPLOY_URL: siteOptions.url,
      LANDR_MIXPANEL_TOKEN: process.env.LANDR_MIXPANEL_TOKEN,
      LANDR_MIXPANEL_PROXY: process.env.LANDR_MIXPANEL_PROXY,
      LANDR_THEME: JSON.stringify(siteTheme)
    })
  })

  if (code !== 0) {
    throw new Error(`Command failed with code ${code}: ${command}`)
  }

  // TODO: Don't use the same dist for generating code, as it won't work with
  // multiple simultaneous builds
  if (localDist !== outputDir) {
    await recursiveCopy(localDist, outputDir)
  }

  log('Site generated successfully')

  if (deploy) {
    log(`Deploying site to ${siteOptions.url}`)

    const result = await netlify.deploy(
      netlifyToken, siteOptions.id, outputDir)
    log(result.message)

    return {
      url: result.url,
      adminUrl: siteOptions.adminUrl
    }
  }

  return {}
}
