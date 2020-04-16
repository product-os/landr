const chalk = require('chalk')

module.exports = async function (options) {
  if (!options.id || options.id === 'help') {
    console.error(chalk.blue(`
  / /  __ _ _ __   __| |_ __
 / /  / _\` | '_ \\ / _\` | '__|
/ /__| (_| | | | | (_| | |
\\____/\\__,_|_| |_|\\__,_|_|
  `))
  }
}
