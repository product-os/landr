const {
  Command, flags
} = require('@oclif/command')
const path = require('path')
const rimraf = require('rimraf')
const fs = require('fs')

const NETLIFY_TOKEN = process.env.NETLIFY_AUTH_TOKEN

const runner = require('../../build-runner')

const {
  log
} = require('../../utils/log')

const {
  getMetaData
} = require('../../meta-generator/getMetaData')

const {
  getCurrentGitReference
} = require('../../meta-generator/getCurrentGitReference')

class BuildCommand extends Command {
  async run () {
    const {
      // eslint-disable-next-line no-shadow
      flags
    } = this.parse(BuildCommand)

    const {
      branch
    } = await getCurrentGitReference()

    const outputBase = process.cwd()
    let outputDir = path.resolve(outputBase, 'landr-dist')

    if (flags.output) {
      outputDir = path.isAbsolute(flags.output)
        ? flags.output
        : path.resolve(process.cwd(), flags.output)
    }

    // Wipe out output directory so that we start fresh everytime.
    rimraf.sync(outputDir)

    // Create the output directory
    await fs.promises.mkdir(outputDir, {
      recursive: true
    })

    // Default the output site for the meta file to ./meta.json
    let contractPath = path.resolve(outputBase, 'meta.json')

    if (flags.meta) {
      contractPath = path.isAbsolute(flags.meta)
        ? flags.meta
        : path.resolve(process.cwd(), flags.meta)
      log(`Using existing meta data from ${contractPath}`)
    } else {
      // TODO: pass the contract data directly to the builder
      const contract = await getMetaData('./', branch)

      // Write the contract to a JSON file next to the output directory
      await fs.writeFileSync(contractPath, JSON.stringify(contract))
    }

    if (flags.deploy && !NETLIFY_TOKEN) {
      throw new Error(
        'Cannot deploy without a NETLIFY_AUTH_TOKEN. Did you forget to set an env var?'
      )
    }

    const results = await runner.run({
      contractPath,
      outputDir,
      branch,
      deploy: Boolean(flags.deploy),
      netlifyToken: process.env.NETLIFY_AUTH_TOKEN,
      quiet: !flags.verbose,
      logger: log
    })

    log(`Site has been written to ${outputDir}`)

    if (flags.deploy) {
      const domainSetupUrl = `${results.adminUrl}/settings/domain/setup`

      log(`Site successfully deployed to netlify. Visit ${results.url}`)
      log(`Head over to ${domainSetupUrl} to setup a different domain`)
    }
  }
}

BuildCommand.description = `Build a static site using landr
Build a static site using landr into a local directory.
By default this command will look for a meta.json file in the current directory
to use as data for generating the site. The location of the data file can be
specified using the -m flag.
By default the site will be written to a folder named landr-dist in the current
directory. Ther location that the site will be written to can be specified using
the -o flag.
You can also optionally deploy your site to netlfiy using the -d flag. Deploying
to netlify relies on providing the NETLIFY_AUTH_TOKEN env var.
`

BuildCommand.flags = {
  meta: flags.string({
    char: 'm',
    description:
      'The location of the meta file used to generate your landr site'
  }),
  output: flags.string({
    char: 'o',
    description:
      'The output directory where we should generate your landr site'
  }),
  deploy: flags.boolean({
    char: 'd',
    description: 'Deploy the site to netlify after generating it',
    default: false
  }),
  verbose: flags.boolean({
    char: 'v',
    description: 'Run in verbose mode',
    default: false
  })
}

module.exports = BuildCommand
