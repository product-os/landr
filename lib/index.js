const Bundler = require('parcel-bundler')
const path = require('path')
const _ = require('lodash')
const rimraf = require('rimraf')
const recursiveCopy = require('recursive-copy')
const fs = require('fs')

const theme = require('./utils/theme')
const netlify = require('./utils/netlify')
const skel = require('./utils/skel')

const generator = require('./generator')

/**
 * The build goes through a number of steps
 * 1. Configure a netlify url that the site can be uploaded to at a later point
 * 2. Generate the site theme file
 * 3. Generate the site structure
 * 4. Copy all skeleton files (robots/meta/etc) to the output directory
 * 5. Fill in all templated values in the copied skeleton files
 * 6. Bundle the application code
 * 7. Inject the site configuration data in the bundle
 * 8. Deploy to netlify
 */

exports.build = async ({
  contract,
  outputDir,
  branch,
  deploy,
  netlifyToken
}) => {
  // Deploy to a preview site if running on a branch
  // other than master.
  const name = contract.data.name
  const owner = contract.data.github.owner.handle
  const siteName = (branch === 'master'
    ? `landr-${owner}-repo-${name}`
    : `landr-${owner}-repo-${name}-preview-${branch}`).toLowerCase()

  const siteOptions = deploy
    ? await netlify.setupSite(netlifyToken, siteName)
    : {}

  const siteTheme = await theme(_.get(contract, [ 'data', 'images', 'banner' ]))

  const site = generator(contract, siteTheme, {
    siteUrl: siteOptions.url
  })

  const config = {
    theme: siteTheme,
    site,
    contract
  }

  // Wipe out output directory so that we start fresh everytime.
  rimraf.sync(outputDir)

  // Copy the skeleton directory to the temp destination
  const skeletonDirectory = path.resolve(__dirname, '../skeleton')
  await recursiveCopy(skeletonDirectory, outputDir)

  // Fill in the skeleton templates with contract data
  await skel.create(contract, outputDir, skeletonDirectory)

  const entryFiles = path.join(skeletonDirectory, 'index.html')

  process.env.NODE_ENV = 'production'
  const bundlerOptions = {
    outDir: outputDir,
    outFile: 'index.html',
    publicUrl: siteOptions.url,
    watch: false,
    cache: false
  }

  // TODO: bundling the code on command is actually unnecessary, as it never
  // changes. The only thing that needs to be added is the config.js injected
  // below
  const bundler = new Bundler(entryFiles, bundlerOptions)

  await bundler.bundle()

  // Write the config data to a file that can be loaded by the site at runtime
  fs.writeFileSync(
    path.resolve(outputDir, 'js/config.js'),
    `window.LANDR_CONFIG=${JSON.stringify(config, null, 2)}`
  )

  // Inject a script tag into the build HTML file, so that config is loaded
  const builtIndexPath = path.resolve(outputDir, 'index.html')
  const html = fs.readFileSync(builtIndexPath, 'utf8')
  const transformedHtml = html.replace(
    '<div id="LANDR_CONFIG"></div>',
    `<script src="${siteOptions.url || ''}/js/config.js"></script>`
  )
  fs.writeFileSync(builtIndexPath, transformedHtml)

  if (deploy) {
    await netlify.deploy(netlifyToken, siteOptions.id, outputDir)
  }

  return {
    url: siteOptions.url
  }
}
