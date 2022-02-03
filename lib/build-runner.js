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
const crypto = require('crypto')
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

const replaceBase64Images = async (contract, directory) => {
  for (const key in contract) {
    if (
      typeof contract[key] === 'string' &&
      contract[key].startsWith('data:image/')
    ) {
      const fileType = contract[key].match(
        /data:image\/([a-zA-Z0-9]+);base64/
      )[1]

      const fileContent = Buffer.from(
        contract[key].replace(/^data:image\/[a-zA-Z0-9]+;base64,/, ''),
        'base64'
      )

      const hash = crypto
        .createHash('sha256')
        .update(fileContent)
        .digest('hex')
      const fileName = `${hash}-${key}.${fileType}`
      const filePath = path.resolve(directory, fileName)

      await fs.promises.writeFile(filePath, fileContent, {
        encoding: 'binary'
      })
      contract[key] = `/images/${fileName}`
    } else if (typeof contract[key] === 'object') {
      await replaceBase64Images(contract[key], directory)
    }
  }
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
  let siteName = `landr-${owner}-repo-${name}-preview-${pullNumber || branch}`

  if (branch === 'master') {
    siteName = `landr-${owner}-repo-${name}`

    // Check if we are building site for a team member and if so,
    // check if the team member's site name matches the org's site name
    // and if so, use the org's site name
    if (contract.data.teamMembers && contract.data.links.homepage) {
      const currentMember = contract.data.teamMembers.find((member) => {
        return member.slug === name
      })
      if (
        currentMember &&
        currentMember.data.links.homepage &&
        currentMember.data.links.homepage.startsWith(
          contract.data.links.homepage
        )
      ) {
        siteName = `landr-${owner}-repo-${owner}`
      }
    }
  }

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

  const imageDirectory = path.resolve(skeletonDirectory, 'images')

  await fs.promises.mkdir(imageDirectory, {
    recursive: true
  })

  log(`Replacing base64 images to paths in site skeleton at ${imageDirectory}`)

  await replaceBase64Images(contract, imageDirectory)

  // Replace base64 into image file into skeleton and update the contract
  const TMP_CONTRACT_FOLDER = path.resolve(projectRoot, '.tmp', uuid.v4())
  await fs.promises.mkdir(TMP_CONTRACT_FOLDER, {
    recursive: true
  })
  log(`Creating temporary contract at ${TMP_CONTRACT_FOLDER}`)
  const tmpContractPath = path.resolve(TMP_CONTRACT_FOLDER, 'contract.json')
  await fs.promises.writeFile(
    tmpContractPath,
    JSON.stringify(contract, null, 2)
  )

  log('Building site')

  // TODO: Don't output react-static log information,
  // as it has details that are non Landr related, such
  // as instructions to deploy to Netlify directly.
  const childProcess = shell.exec(command, {
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
      LANDR_CONTRACT_PATH: tmpContractPath,
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
    }),
    async: true
  })

  return new Promise((resolve) => {
    childProcess.on('exit', async (code) => {
      if (code !== 0) {
        throw new Error(`Command failed with code ${code}: ${command}`)
      }

      log('Site generated successfully', {})

      // TODO: Get react-static to clean up after itself
      // Clean up tmp directory, as apparently react-static won't do it itself
      rimraf.sync(TMP_DIRECTORY)

      rimraf.sync(TMP_CONTRACT_FOLDER)
      rimraf.sync(`${projectRoot}/lib/*.renderer.js`)

      if (deploy) {
        log(`Deploying site to ${siteOptions.url}`)

        if (_.get(contract, [ 'netlifyConfig' ])) {
          const netlifyToml = json2toml(_.get(contract, [ 'netlifyConfig' ]))
          await fs.promises.writeFile(
            path.join(outputDir, 'netlify.toml'),
            netlifyToml
          )
        }

        const result = await netlify.deploy(
          netlifyToken,
          siteOptions.id,
          outputDir
        )
        log(result.message)

        resolve({
          url: result.url,
          adminUrl: siteOptions.adminUrl
        })
      }
      resolve({})
    })
  })

  // Return {};
}
