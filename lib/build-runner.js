/* eslint-disable no-unreachable */
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
const uuid = require('uuid')
const fs = require('fs')
const theme = require('./theme')
const netlify = require('./netlify')
const skel = require('./skel')
const json2toml = require('json2toml')
const projectRoot = path.resolve(__dirname, '..')

const getCommandString = () => {
  const reactStaticBin = require.resolve('react-static/bin/react-static')
  const reactStaticConfig = path.resolve(
    projectRoot,
    'lib',
    'static.config.js'
  )

  return `${reactStaticBin} build --config=${reactStaticConfig}`
}

exports.run = async ({
  contractPath,
  outputDir,
  deploy,
  netlifyToken,
  branch,
  quiet,
  logger,
  pullNumber
}) => {
  const log = logger

  const contract = require(contractPath)

  const command = getCommandString()

  log(`Running from ${contractPath} into ${outputDir}`)

  // Wipe out output directory so that we start fresh everytime.
  rimraf.sync(outputDir)

  if (!contract.data.name) {
    throw new Error('The contract does not have a name')
  }

  // Deploy to a preview site if running on a branch
  // other than master.
  const name = contract.data.name
  const owner = contract.data.github.owner.handle

  // Prefer the pull number over the branch name if it is available to avoid hitting
  // Netlify's subdomain length limit
  const siteName =
    branch === 'master'
      ? `landr-${owner}-repo-${name}`
      : `landr-${owner}-repo-${name}-preview-${pullNumber || branch}`

  if (deploy) {
    log(`Preparing site ${siteName}`)
  }

  const siteOptions = deploy
    ? await netlify.setupSite(netlifyToken, siteName)
    : {}

  log('Parsing banner image')
  const siteTheme = await theme(
    _.get(
      contract,
      [ 'data', 'images', 'banner' ],
      _.get(contract, [ 'data', 'github', 'owner', 'logo', 'base64' ])
    )
  )
  const skeletonDirectory = tmp.dirSync().name
  log(`Creating site skeleton at ${skeletonDirectory}`)
  await skel.create(
    contract,
    path.resolve(projectRoot, 'skeleton'),
    skeletonDirectory
  )

  // TODO: Don't use the same .tmp directory for every build
  const TMP_DIRECTORY = path.resolve(projectRoot, '.tmp', uuid.v4())

  log('Building site')

  // TODO: Don't output react-static log information,
  // as it has details that are non Landr related, such
  // as instructions to deploy to Netlify directly.
  const {
    code
  } = shell.exec(command, {
    silent: quiet,

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
      // TODO: Pass the contract directly instead of passing the path to the
      // data
      LANDR_CONTRACT_PATH: contractPath,
      LANDR_SKELETON_DIRECTORY: skeletonDirectory,

      LANDR_OUTPUT_DIRECTORY: outputDir,
      LANDR_DEPLOY_URL: siteOptions.url,
      LANDR_GOOGLE_MAPS_KEY: process.env.LANDR_GOOGLE_MAPS_KEY,
      LANDR_GOOGLE_GEOCODE_KEY: process.env.LANDR_GOOGLE_GEOCODE_KEY,
      LANDR_MIXPANEL_TOKEN: process.env.LANDR_MIXPANEL_TOKEN,
      LANDR_MIXPANEL_PROXY: process.env.LANDR_MIXPANEL_PROXY,
      LANDR_THEME: JSON.stringify(siteTheme),
      LANDR_TMP_DIRECTORY: TMP_DIRECTORY,
      LANDR_IS_PREVIEW: branch !== 'master'
    })
  })

  if (code !== 0) {
    throw new Error(`Command failed with code ${code}: ${command}`)
  }

  log('Site generated successfully', {})

  // TODO: Get react-static to clean up after itself
  // Clean up tmp directory, as apparently react-static won't do it itself
  rimraf.sync(TMP_DIRECTORY)

  if (deploy) {
    log(`Deploying site to ${siteOptions.url}`)

    if (_.get(contract, [ 'netlifyConfig' ])) {
      const netlifyToml = json2toml(_.get(contract, [ 'netlifyConfig' ]))
      await fs.promises.writeFile(path.join(outputDir, 'netlify.toml'), netlifyToml)
    }

    const result = await netlify.deploy(
      netlifyToken,
      siteOptions.id,
      outputDir
    )
    log(result.message)

    return {
      url: result.url,
      adminUrl: siteOptions.adminUrl
    }
  }

  return {}
}
