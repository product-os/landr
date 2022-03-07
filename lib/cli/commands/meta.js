const {
  Command, flags
} = require('@oclif/command')
const fs = require('fs')
const path = require('path')

const {
  log
} = require('../../utils/log')

const {
  getMetaData
} = require('../../meta-generator/getMetaData')

const {
  getCurrentGitReference
} = require('../../meta-generator/getCurrentGitReference')

class MetaCommand extends Command {
  async run () {
    const {
      // eslint-disable-next-line no-shadow
      flags
    } = this.parse(MetaCommand)

    const {
      branch
    } = await getCurrentGitReference()

    const contract = await getMetaData('./', branch)

    let outputPath = path.resolve(process.cwd(), 'meta.json')

    if (flags.output) {
      outputPath = path.isAbsolute(flags.output)
        ? flags.output
        : path.resolve(process.cwd(), flags.output)
    }

    await fs.writeFileSync(outputPath, JSON.stringify(contract))

    log(`data written to ${outputPath}`)
  }
}

MetaCommand.description = `Generate a meta file
Generate a meta file that contains all the information landr needs to generate a site.
`

MetaCommand.flags = {
  output: flags.string({
    char: 'o',
    description: 'The output path where the metadata should be written'
  })
}

module.exports = MetaCommand
